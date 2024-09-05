import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {


    render() {

        return (
            <>

                <div className='footer'>
                    <p>&copy; 2022 Nguyễn Duy Tân. More information, please visit my github.<a target='_blank' href='#'> &#8594; Click here &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
