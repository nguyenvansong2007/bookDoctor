import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { getAllSpecialtyService, getAllClinicService, getAllDoctorsService } from '../../services/userService'

const placeholderText = ["Tìm chuyên khoa", "Tìm phòng khám", "Tìm bác sĩ"];

class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            isShowSearchResult: false,
            dataSpecialty: [],
            dataClinic: [],
            dataDoctor: [],
            search: ''
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }

        let res2 = await getAllClinicService();
        if (res2 && res2.errCode === 0) {
            this.setState({
                dataClinic: res2.data
            })
        }

        let res3 = await getAllDoctorsService();
        if (res3 && res3.errCode === 0) {
            this.setState({
                dataDoctor: res3.data
            })
        }

        setInterval(() => {
            let copyIndex = this.state.index
            if (copyIndex === 2) {
                this.setState({
                    index: 0
                })
            } else (
                this.setState({
                    index: copyIndex + 1
                })
            )

        }, 2000)

    }

    //onclick
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }

    handleReturnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({
            isShowSearchResult: true,
            search: event.target.value
        })
        if (event.target.value === '') {
            this.setState({
                isShowSearchResult: false
            })
        }
    }

    handleOnClickSearch = () => {
        let bool = this.state.isShowSearchResult
        bool === false ?
            this.setState({
                isShowSearchResult: true
            })
            :
            this.setState({
                isShowSearchResult: false
            })
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {
        let language = this.props.language;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        }
        let { dataSpecialty, dataClinic, dataDoctor, search } = this.state;

        return (
            <>
                <div className='homeheader-container'>
                    <div className='header-content'>
                        <div className='header-content-left' >
                            <i className='fas fa-bars' onClick={() => { this.props.history && this.props.history.push(`/login`) }}></i>
                            <img className='header-logo' src={logo} onClick={() => this.handleReturnHome()} />
                            <div className='header-logo'></div>
                        </div>

                        <div className='header-content-center'>
                            <div className='child-content' onClick={() => this.props.handleScrollToSpecialty()}>
                                <div><b> <FormattedMessage id="home-header.speciality" /> </b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.props.handleScrollToClinic()}>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.props.handleScrollToDoctor()}>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.props.handleScrollToHandbook()}>
                                <div><b><FormattedMessage id="home-header.handbook" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.health-handbook" /></div>
                            </div>
                        </div>

                        <div className='header-content-right'>
                            <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id="home-header.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div >
                </div >

                {this.props.isShowBanner === true &&
                    <div className='header-banner'>
                        <div className='content-up'>
                            <div className='title'><FormattedMessage id="banner.title1" /></div>
                            <div className='sub-title'><FormattedMessage id="banner.title2" /></div>
                            <div className='search-form'>
                                <div className='search'>
                                    <i className='fas fa-search' onClick={() => this.handleOnClickSearch()}></i>
                                    <input type="text" placeholder={placeholderText[this.state.index]}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                    />
                                </div>
                                {this.state.isShowSearchResult === true ?
                                    <div className='search-result'>
                                        <h4>Chuyên khoa</h4>
                                        {dataSpecialty && dataSpecialty.length > 0 &&
                                            dataSpecialty.filter((item) => {
                                                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                                            }).map((item, index) => {
                                                return <div key={index}
                                                    className='search-result-content'
                                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                                >{item.name}</div>
                                            })
                                        }
                                        <h4>Phòng khám</h4>
                                        {dataClinic && dataClinic.length > 0 &&
                                            dataClinic.filter((item) => {
                                                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                                            }).map((item, index) => {
                                                return <div key={index}
                                                    className='search-result-content'
                                                    onClick={() => this.handleViewDetailClinic(item)}
                                                >{item.name}</div>
                                            })
                                        }
                                        <h4>Bác sĩ</h4>
                                        {dataDoctor && dataDoctor.length > 0 &&
                                            dataDoctor.filter((item) => {
                                                return search.toLowerCase() === '' ? item : item.firstName.toLowerCase().includes(search) ||
                                                    item.lastName.toLowerCase().includes(search)
                                            }).map((item, index) => {
                                                return <div key={index}
                                                    className='search-result-content'
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                >{item.firstName} {item.lastName}</div>
                                            })

                                        }

                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-hospital'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-mobile'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-procedures'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-flask'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-briefcase-medical'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>

                    </div >
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
