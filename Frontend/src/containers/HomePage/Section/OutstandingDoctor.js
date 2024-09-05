import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'

import Slider from "react-slick";

import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';

import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDocTors()
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        // let settings = {
        //     dots: true,
        //     infinity: false,
        //     speed: 500,
        //     slidesToShow: 4,
        //     slidesToScroll: 4,
        // }

        let arrDoctors = this.state.arrDoctors;
        let language = this.props.language

        return (
            <>
                <div className='section-share section-outstandingDoctor'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span><FormattedMessage id="homepage.outstanding-doctor" /></span>
                            <button><FormattedMessage id="homepage.more-info" /></button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {arrDoctors && arrDoctors.length > 0
                                    && arrDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName} `;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='border-customize'>
                                                    <div className='outer-bgImg'>
                                                        <img style={{ backgroundImage: `url(${imageBase64})` }} />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                        <div>Cơ xương khớp</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
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
        topDoctors: state.admin.topDoctors,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDocTors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
