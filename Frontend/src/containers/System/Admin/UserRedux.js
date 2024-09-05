import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_Actions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import "./UserRedux.scss"
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     console.log('check data:', res)
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gender !== this.props.gender) {
            let arrGender = this.props.gender;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.position !== this.props.position) {
            let arrPosit = this.props.position
            this.setState({
                positionArr: arrPosit,
                position: arrPosit && arrPosit.length > 0 ? arrPosit[0].keyMap : ''
            })
        }
        if (prevProps.role !== this.props.role) {
            let arrRole = this.props.role
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        //reset input
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGender = this.props.gender;
            let arrPosit = this.props.position;
            let arrRole = this.props.role;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                previewImgURL: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosit && arrPosit.length > 0 ? arrPosit[0].keyNap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                action: CRUD_Actions.CREATE
            },)
        }
    }

    //handle preview image
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    handleOnClickPreviewImg = () => {
        if (!this.state.previewImgURL) return
        this.setState({
            isOpen: true
        })
    }

    //handle submit create
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        let { action } = this.state;
        if (action === CRUD_Actions.CREATE) {
            //fire redux action create
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_Actions.EDIT) {
            //fire redux action edit
            this.props.editUser({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }

        console.log('check onclick: ', this.state)
    }

    checkValidateInput = () => {
        let isValidate = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let index = 0; index < arrCheck.length; index++) {

            if (!this.state[arrCheck[index]]) {
                isValidate = false;
                alert('This input is required: ' + arrCheck[index])
                break;
            }
        }

        return isValidate
    }

    onChangeInput = (event, id) => {
        let copyState = { ... this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    //handle edit from parent
    handleEditUser = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')

        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_Actions.EDIT,
            userEditId: user.id
        },)
    }

    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className="title py-3" ><FormattedMessage id="user-manage.title" /></div>
                <div className='col-12'>{isLoadingGender === true ?? 'loading gender'}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.email" /> </label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.password" /> </label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.firstName" /> </label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.lastName" /> </label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.phoneNumber" /> </label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="user-manage.address" /> </label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.gender" /> </label>
                                <select className='form-control' onChange={(event) => this.onChangeInput(event, 'gender')}
                                    value={gender}>
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.position" /> </label>
                                <select className='form-control' onChange={(event) => this.onChangeInput(event, 'position')}
                                    value={position}>
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}
                                                    disabled={this.state.action === CRUD_Actions.EDIT && this.state.role === 'R3' ? true : false}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.roleId" /> </label>
                                <select className='form-control' onChange={(event) => this.onChangeInput(event, 'role')}
                                    value={role}>
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.image" /> </label>
                                <div className='previewImg-container'>
                                    <div>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => this.handleOnchangeImg(event)} />
                                        <label className='label-upload' htmlFor='previewImg'>
                                            <FormattedMessage id="user-manage.upload" /> <i className='fas fa-upload'></i></label>
                                    </div>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.handleOnClickPreviewImg()}>
                                    </div>
                                </div>

                            </div>

                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_Actions.EDIT ? 'btn btn-warning px-2' : 'btn btn-primary px-2'}
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_Actions.EDIT ?
                                        <FormattedMessage id="user-manage.save" />
                                        :
                                        <FormattedMessage id="user-manage.submit" />
                                    }
                                </button>
                            </div>

                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUser={this.handleEditUser}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
        role: state.admin.roles,
        position: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
