import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorByIdService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailPrice: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
        let res = await getExtraInfoDoctorByIdService(this.props.doctorIdProps);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfo: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdProps !== prevProps.doctorIdProps) {
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdProps);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data ? res.data : []
                })
            }
        }
    }

    //handle show hide
    showHideDetailPrice = (status) => {
        this.setState({
            isShowDetailPrice: status
        })
    }

    render() {
        let { isShowDetailPrice, extraInfo } = this.state;
        let { language } = this.props
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='up-content'>
                        <div className='title-content'>
                            <FormattedMessage id='patient.extra-info-doctor.clinic-address' />
                        </div>
                        <div className='name-content'>{extraInfo && extraInfo.clinicName ? extraInfo.clinicName : ''}</div>
                        <div className='address-content'>{extraInfo && extraInfo.clinicAddress ? extraInfo.clinicAddress : ''}</div>
                    </div>

                    <div className='down-content'>
                        {isShowDetailPrice === false ?
                            <>
                                <div className='title-content'>
                                    <FormattedMessage id='patient.extra-info-doctor.price' />
                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueVi}
                                            displayType='text'
                                            thousandSeparator={true}
                                            suffix=' VND'
                                        />
                                    }

                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfo.priceTypeData.valueEn}
                                            displayType='text'
                                            thousandSeparator={true}
                                            suffix=' $'
                                        />
                                    }
                                </div>
                                <div className='show-hide-content'>
                                    <span onClick={() => this.showHideDetailPrice(true)}>
                                        <FormattedMessage id='patient.extra-info-doctor.detail-btn' />
                                    </span>
                                </div>

                            </>
                            :
                            <>
                                <div className='title-content'>
                                    <FormattedMessage id='patient.extra-info-doctor.price' />
                                </div>
                                <div className='detail-content'>
                                    <div className='price-content'>
                                        <span className='left'><FormattedMessage id='patient.extra-info-doctor.price' /></span>
                                        <span className='right'>
                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfo.priceTypeData.valueVi}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    suffix=' VND'
                                                />
                                            }

                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfo.priceTypeData.valueEn}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    suffix=' $'
                                                />
                                            }
                                        </span>
                                    </div>
                                    <div className='note-content'>
                                        {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                    </div>
                                </div>
                                <div className='payment-content'><FormattedMessage id='patient.extra-info-doctor.payment' />
                                    {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI ?
                                        extraInfo.paymentTypeData.valueVi : ''}

                                    {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN ?
                                        extraInfo.paymentTypeData.valueEn : ''}
                                </div>
                                <div className='show-hide-content'>
                                    <span onClick={() => this.showHideDetailPrice(false)}>
                                        <FormattedMessage id='patient.extra-info-doctor.hide-btn' />
                                    </span>
                                </div>

                            </>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
