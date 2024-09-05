import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackToTopBtn from './BackToTopBtn';

class About extends Component {


    render() {

        return (
            <>

                <div className='section-share section-about'>
                    {/* <div className='section-about-header'>
                        Truyền thông nói gì về Duy Tân Care
                    </div> */}
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/9vI-DTRs76I?list=RDaeqoQFcark0"
                                title="Cho Bao Nhiêu Yêu Thương Nay Bay Xa...Thu Cuối Lofi | Nhạc Lofi Chill Hot TikTok"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>

                        </div>
                        <div className='content-right'>
                            <h2>Dành cho bác sĩ</h2>
                            <p>What is Lorem Ipsum?
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <button className='btn btn-dark px-2'>Liên hệ hợp tác</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
