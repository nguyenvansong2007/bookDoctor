import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import LoginImg from '../../assets/images/login-img2.jpg'
import './Login.scss';
import { handleLogin } from '../../services/userService';
import { isBuffer } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    //hàm handle event
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {

                    this.setState({
                        errMessage: e.response.data.message,
                    })
                }
            }
            // console.log(e)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-8 left-content'>
                            <img src={LoginImg} className="img-fluid" alt="Phone image" />
                        </div>
                        <div className='col-4 right-content'>
                            <div className='col-10 text-login mb-4 title'>Đăng nhập</div>
                            <div className='col-10 form-group input-login'>
                                <label>Tên đăng nhập:</label>
                                <input type='text' placeholder='Nhập tên đăng nhập' className='form-control'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)} />
                            </div>
                            <div className='col-10 form-group input-login'>
                                <label>Mật khẩu:</label>
                                <div className='custom-input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} placeholder='Nhập mật khẩu'
                                        className='form-control'
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                        onKeyDown={(event) => this.handleKeyDown(event)} />
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>

                            <div className='col-6' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>

                            <div className='col-10'>
                                <button className='btn-login' onClick={() => this.handleLogin()}>Đăng nhập</button>
                            </div>
                            <div className='col-10 text-center'>
                                <span className='forgot-password'>Quên mật khẩu?</span>
                            </div>

                            <div className='col-10 text-center mt-3'>
                                <span className='text-other-login'>Hoặc đăng nhập với:</span>
                            </div>
                            <div className='col-10 social-login'>

                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>

                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
