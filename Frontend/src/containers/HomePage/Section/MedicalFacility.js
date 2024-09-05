import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { getAllClinicService } from '../../../services/userService'
import Slider from "react-slick";
import { withRouter } from 'react-router-dom';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],

        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {
        let { dataClinics } = this.state
        return (
            <>
                <div className='section-share section-medicalFacility'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Cơ sở y tế nổi bật</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataClinics && dataClinics.length > 0 &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div key={index} className='section-customize' onClick={() => this.handleViewDetailClinic(item)}>
                                                <img className='bg-image'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <h5>{item.name}</h5>
                                            </div>
                                        )
                                    })
                                }


                            </Slider>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
