import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './BackToTopBtn.scss'


class BackToTopBtn extends Component {
    timeout = null
    constructor(props) {
        super(props);
        this.state = {
            backToTopBtn: false
        }
    }

    async componentDidMount() {
        // Button is displayed after scrolling for 500 pixels
        window.addEventListener('scroll', this.handleOnScroll());
    }

    handleOnScroll = () => {
        if (window.scrollY >= 100) {
            this.setState({ backToTopBtn: true });
        } else {
            this.setState({ backToTopBtn: false })
        }
    }


    componentDidUpdate() {

    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleOnScroll());
    // }

    render() {
        console.log('check did mount', this.state)
        return (
            <>
                <div className='back-to-top'>
                    {this.state.backToTopBtn && (
                        <button
                            className='btn-to-top'
                            onClick={() => { this.props.handleScrollToTop() }}
                        ><i class="fa fa-arrow-up"></i></button>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(BackToTopBtn);
