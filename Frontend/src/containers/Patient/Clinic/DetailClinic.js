import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService } from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicByIdService({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            return arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let language = this.props.language
        console.log('check state', this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />

                <div className='specialty-description'>
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                        &&
                        <>
                            <div className='title py-2'>{dataDetailClinic.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                            </div>
                        </>
                    }
                </div>
                <div className='specialty-body'>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div key={index} className='specialty-info-content'>
                                    <div className='specialty-left-content'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataScheduleModal}
                                            />
                                        </div>
                                    </div>

                                    <div className='specialty-right-content'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdProps={item}
                                            />
                                        </div>

                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo
                                                doctorIdProps={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
