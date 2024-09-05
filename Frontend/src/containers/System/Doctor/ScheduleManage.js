import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ScheduleManage.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { CRUD_Actions, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ScheduleManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }

    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTimes();

        let userInfo = this.props.userInfo;
        if (userInfo.roleId !== 'R1') {
            let doctorName = this.buildNameDoctorSelect()
            this.setState({ selectedDoctor: doctorName });
        }

    }

    buildNameDoctorSelect = () => {
        let userInfo = this.props.userInfo
        let result = {};
        let { language } = this.props;
        if (userInfo) {
            let labelVi = `${userInfo.firstName} ${userInfo.lastName}`;
            let labelEn = `${userInfo.lastName} ${userInfo.firstName}`;

            result.label = language === LANGUAGES.VI ? labelVi : labelEn;
            result.value = userInfo.id;
        }
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTimes != this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {

                let obj = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj)
            })

        }
        return result
    }

    //onchange select
    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    }

    //datepicker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    //
    handleOnClickBtnTime = (time) => {

        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;

                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleOnClickSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = []

        if (!currentDate) {
            toast.error('Invalid date!')
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!')
        }

        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formattedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formattedDate;
                    obj.timeType = time.keyMap;
                    result.push(obj)
                })

            } else {
                toast.error('Invalid selected time!')
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            toast.success('Save Bulk Schedule Doctor Success!')
        } else {
            toast.error('Save Bulk Schedule Doctor Error!')
        }
    }



    render() {
        let { rangeTime } = this.state;
        let { language, userInfo } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (

            <div className='schedule-manage-container'>

                <div className='schedule-manage-title title'>
                    <FormattedMessage id="schedule-manage.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="schedule-manage.select-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={userInfo.roleId === 'R1' ? this.state.listDoctors : ''}
                            />
                        </div>

                        <div className='col-3'>
                            <label><FormattedMessage id="schedule-manage.select-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected === true ? 'btn-schedule active' : 'btn-schedule'}
                                        key={index}
                                        onClick={() => this.handleOnClickBtnTime(item)}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <button className='btn-primary btn-save-schedule'
                            onClick={() => this.handleOnClickSaveSchedule()}
                        ><FormattedMessage id="schedule-manage.save" /></button>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allScheduleTimes,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
