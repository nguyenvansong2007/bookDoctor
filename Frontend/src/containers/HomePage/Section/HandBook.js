import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";
import handbook from "../../../assets/handBook/handbook.jpg"
import handbook2 from "../../../assets/handBook/handbook2.jpg"
import handbook3 from "../../../assets/handBook/handbook3.jpg"
import handbook4 from "../../../assets/handBook/handbook4.jpg"

class HandBook extends Component {


    render() {

        return (
            <>
                <div className='section-share section-handBook'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Cảm nang</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className=' specialty-customize'>
                                    <img src={handbook} />
                                    <h4>Trẻ bị ho về đêm</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook2} />
                                    <h4>Cách trị ho và nôn cho trẻ</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook3} />
                                    <h4>Khám tai mũi họng tại bệnh viện</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook4} />
                                    <h4>Top 9 bác sĩ tại Hà Nội</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook4} />
                                    <h4>Cẩm nang 5</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook4} />
                                    <h4>Cẩm nang 6</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook4} />
                                    <h4>Cẩm nang</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={handbook4} />
                                    <h4>Cẩm nang</h4>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
