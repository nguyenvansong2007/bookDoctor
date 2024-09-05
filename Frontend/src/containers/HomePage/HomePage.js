import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import Footer from './Footer';
import About from './Section/About';
import BackToTopBtn from './Section/BackToTopBtn';
import ScrollToTop from 'react-scroll-to-top'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.specialtyRef = createRef()
        this.clinicRef = createRef()
        this.doctorRef = createRef()
        this.handbookRef = createRef()
        this.topRef = createRef()
    }

    handleScrollToSpecialty = () => {
        this.specialtyRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    handleScrollToClinic = () => {
        this.clinicRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    handleScrollToDoctor = () => {
        this.doctorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    handleScrollToHandbook = () => {
        this.handbookRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    handleScrollToTop = () => {
        this.topRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        }

        return (
            <div ref={this.topRef} style={{ position: 'relative' }}>
                <HomeHeader isShowBanner={true}
                    handleScrollToSpecialty={this.handleScrollToSpecialty}
                    handleScrollToClinic={this.handleScrollToClinic}
                    handleScrollToDoctor={this.handleScrollToDoctor}
                    handleScrollToHandbook={this.handleScrollToHandbook}
                />
                <ScrollToTop smooth top="1000" />

                <div ref={this.specialtyRef}><Specialty settings={settings} /></div>
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>

                <div ref={this.clinicRef}><MedicalFacility settings={settings} /></div>
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>

                <div ref={this.doctorRef}><OutstandingDoctor settings={settings} /></div>
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>

                <div ref={this.handbookRef}><HandBook settings={settings} /></div>
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>

                <About />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <ScrollToTop top="20" />
                <BackToTopBtn handleScrollToTop={this.handleScrollToTop} />
                <Footer />

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
