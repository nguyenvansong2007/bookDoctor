import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl'
import './ProfileDoctor.scss';
import { getProfileDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }

            return result
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInfoDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }
    }

    //hàm render time schedule
    renderTimeBooking = (dataTime) => {
        let { language } = this.props

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment(dataTime.date).format('dddd - DD/MM/YYYY')
                :
                moment(dataTime.date).locale('en').format('ddd - MM/DD/YYYY')


            return (
                <>
                    <div>{time} ~ {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceTitle" /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        console.log('check props doctorprofile', this.props);
        let { dataProfile } = this.state
        let { language, isShowDescription, dataTime, isShowPrice, isShowLinkDetail, doctorId } = this.props

        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='left-content'
                            style={{ backgroundImage: `url(${dataProfile ? dataProfile.image : ''})` }}>
                        </div>
                        <div className='right-content'>
                            <div className='up-content'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>

                            <div className='down-content'>
                                {isShowDescription === true ?
                                    <>
                                        {
                                            dataProfile.Markdown && dataProfile.Markdown.description &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {isShowLinkDetail === true && <div className='show-more-detail'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>

                    </div>}
                    {isShowPrice &&
                        <div className='price'>
                            <span><FormattedMessage id='patient.booking-modal.price' /></span>
                            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currency'
                                    value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix=' VND'
                                />
                            }

                            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currency'
                                    value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix=' $'
                                />
                            }
                        </div>
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
