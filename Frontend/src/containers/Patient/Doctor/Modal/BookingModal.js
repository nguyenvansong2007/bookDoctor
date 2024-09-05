import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointmentService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            genders: '',
            reason: '',
            birthDay: '',

            selectedGenders: '',
            timeType: '',
            doctorId: ''
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj)
            })
            return result;
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language)
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleModal !== prevProps.dataScheduleModal) {
            if (this.props.dataScheduleModal && !_.isEmpty(this.props.dataScheduleModal)) {
                let doctorId = this.props.dataScheduleModal.doctorId
                let timeType = this.props.dataScheduleModal.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }

    //handle
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGenders: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        //validate
        let date = new Date(this.props.dataScheduleModal.date).toLocaleDateString().slice(0, 19).replace('T', ' ');
        let timeString = this.buildTimeBooking(this.props.dataScheduleModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleModal)
        // let dataSchedule
        let res = await postPatientBookAppointmentService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            timeType: this.state.timeType,
            doctorId: this.state.doctorId,
            selectedGenders: this.state.selectedGenders.value,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed')
            //lưu local storage
            let scheduleBookingList = localStorage.getItem("scheduleBooking") ?
                JSON.parse(localStorage.getItem("scheduleBooking"))
                :
                []
            scheduleBookingList.push(res.data)
            localStorage.setItem("scheduleBooking", JSON.stringify(scheduleBookingList))

            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error')
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment(dataTime.date).format('dddd - DD/MM/YYYY')
                :
                moment(dataTime.date).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} ~ ${date}`
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                :
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

            return name
        }
        return <></>
    }

    clearDataModal = () => {
        // this.setState({
        //     fullName: '',
        // })
    }

    render() {
        let { isOpenModal, closeBookingModal, dataScheduleModal } = this.props;
        let doctorId = '';
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            doctorId = dataScheduleModal.doctorId
        }

        return (
            <>
                <Modal isOpen={isOpenModal} className='booking-modal-container'
                    size='lg'
                    backdrop={true}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className='right'
                                onClick={() => { closeBookingModal(); this.clearDataModal() }}>
                                <i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataScheduleModal)} */}
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataScheduleModal}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.date" /></label>
                                    <input className='form-control'
                                        value={moment(this.props.dataScheduleModal.date).format('DD/MM/YYYY')}
                                        disabled='true'
                                    />
                                    {/* <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthDay[0]}
                                    /> */}
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGenders}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className='form-control'
                                        style={{ height: '60px' }}
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            ><FormattedMessage id="patient.booking-modal.confirm" /></button>
                            <button className='btn-booking-cancel'
                                onClick={() => { closeBookingModal(); this.clearDataModal() }}
                            ><FormattedMessage id="patient.booking-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
