import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';

import './DoctorSchedule.scss';
import { getScheduleByDateService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSelectDays: [],
            availableTime: [],
            isOpenModal: false,
            dataScheduleModal: {},
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let arrDate = this.getArrSelectDays(language);

        if (this.props.doctorIdProps) {
            let res = await getScheduleByDateService(this.props.doctorIdProps, arrDate[0].value)
            this.setState({
                availableTime: res.data ? res.data : []
            })
        }
        this.setState({
            arrSelectDays: arrDate,
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let arrDate = this.getArrSelectDays(this.props.language);
            this.setState({
                arrSelectDays: arrDate
            })
        }
        if (this.props.doctorIdProps !== prevProps.doctorIdProps) {
            let arrDate = this.getArrSelectDays(this.props.language);
            let res = await getScheduleByDateService(this.props.doctorIdProps, arrDate[0].value)
            this.setState({
                availableTime: res.data ? res.data : []
            })
        }
    }

    //hàm language's selectDay
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrSelectDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {};

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    obj.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(obj)

        }
        return arrDate;
    }

    //onchange
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdProps && this.props.doctorIdProps !== -1) {
            let doctorId = this.props.doctorIdProps;
            let date = event.target.value
            let res = await getScheduleByDateService(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    availableTime: res.data ? res.data : []
                })
            }
        }
    }

    //onclick schedule
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleModal: time
        })
    }

    handleClickCloseBookingModal = async () => {
        this.setState({
            isOpenModal: false
        })
        //get schedule again
        let doctorId = this.props.doctorIdProps
        let date = this.state.dataScheduleModal.date;
        let convertDate = moment(new Date(date)).add(date, 'days').startOf('day').valueOf()
        let res = await getScheduleByDateService(doctorId, convertDate);

        if (res && res.errCode === 0) {
            this.setState({
                availableTime: res.data ? res.data : []
            })
        }
    }

    render() {
        let { arrSelectDays, availableTime, isOpenModal, dataScheduleModal } = this.state
        let { language } = this.props

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {arrSelectDays && arrSelectDays.length > 0 &&
                                arrSelectDays.map((item, index) => {
                                    return <option value={item.value} key={index}>{item.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt '><span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span></i>
                        </div>

                        <div className='time-content'>
                            {

                                availableTime && availableTime.length > 0 ?
                                    <>
                                        <div className='time-content-btn'>
                                            {availableTime.map((item, index) => {
                                                return (
                                                    <button className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                        key={index}
                                                        onClick={() => this.handleClickScheduleTime(item)}>
                                                        {language === LANGUAGES.VI ?
                                                            item.timeTypeData.valueVi
                                                            :
                                                            item.timeTypeData.valueEn}
                                                    </button>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className='booking'>
                                            <span>  <FormattedMessage id="patient.detail-doctor.choose" />
                                                <i className='far fa-hand-point-up'></i>
                                                <FormattedMessage id="patient.detail-doctor.booking" />
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <div className='schedule-info'><FormattedMessage id="patient.detail-doctor.schedule-none" /></div>

                            }

                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={isOpenModal}
                    closeBookingModal={this.handleClickCloseBookingModal}
                    dataScheduleModal={dataScheduleModal}
                />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
