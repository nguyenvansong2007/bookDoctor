import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialtyService } from '../../../services/userService';
import { withRouter } from 'react-router-dom'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }


    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {
        let { dataSpecialty } = this.state
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span><FormattedMessage id='homepage.specialty' /></span>
                            <button><FormattedMessage id='homepage.more-info' /></button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <img className='bg-image'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <h4>{item.name}</h4>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
