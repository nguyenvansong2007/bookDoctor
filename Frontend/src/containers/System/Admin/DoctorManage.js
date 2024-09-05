import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorManage.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_Actions, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',

            listDoctors: [],
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            clinicName: '',
            clinicAddress: '',
            note: '',
            specialtyId: '',
            clinicId: '',

        }

    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');

            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })

        }
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj)
                })
            }

            if (type === 'PRICE') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let obj = {}
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj)
                })
            }

            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let obj = {}
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj)
                })
            }

            if (type === 'CLINIC') {
                data.map((item, index) => {
                    let obj = {}
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj)
                })
            }
        }

        return result
    }


    // handle onchange markdown
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    //save content markdown
    handleSaveContentMarkdown = () => {
        let { hasOldData, listSpecialty } = this.state
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    //onchange select
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty } = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let clinicName = '', clinicAddress = '', priceId = '',
                provinceId = '', paymentId = '', note = '', specialtyId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                selectedSpecialty = '';

            if (res.data.Doctor_Info) {
                clinicName = res.data.Doctor_Info.clinicName
                clinicAddress = res.data.Doctor_Info.clinicAddress
                note = res.data.Doctor_Info.note

                paymentId = res.data.Doctor_Info.paymentId;
                provinceId = res.data.Doctor_Info.provinceId;
                priceId = res.data.Doctor_Info.priceId;
                specialtyId = res.data.Doctor_Info.specialtyId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                clinicName: clinicName,
                clinicAddress: clinicAddress,
                note: note,
                hasOldData: true,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                clinicName: '',
                clinicAddress: '',
                note: '',
                hasOldData: false,
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                // clinicId: '',
                // specialtyId: '',
            })
        }
        console.log("check selected op: ", res)
    }

    //onchange text area    
    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleChangeSelectedDoctorInfo = (selectedOption, nameInput) => {
        let stateName = nameInput.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;

        this.setState({
            ...copyState
        })
    }

    render() {
        let { hasOldData } = this.state
        return (
            <div className='doctor-manage-container'>
                <div className='doctor-manage-title title'><FormattedMessage id="doctor-manage.title" /></div>
                <div className='more-info'>
                    <div className='left-content form-group'>
                        <label><FormattedMessage id="doctor-manage.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="doctor-manage.ph-doctor" />}
                        />
                    </div>

                    <div className='right-content'>
                        <label><FormattedMessage id="doctor-manage.description" /></label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>

                </div>

                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="doctor-manage.ph-price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="doctor-manage.ph-payment" />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="doctor-manage.ph-province" />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.clinic-name" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'clinicName')}
                            value={this.state.clinicName} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.clinic-address" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'clinicAddress')}
                            value={this.state.clinicAddress} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="doctor-manage.clinic" />}
                            name='selectedClinic'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="doctor-manage.specialty" />}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="doctor-manage.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note} />
                    </div>
                </div>

                <div className='doctor-manage-editor'>
                    <MdEditor style={{ height: '350px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData === true ? 'btn-edit-content' : 'btn-save-content'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span><FormattedMessage id="doctor-manage.edit-info" /></span>
                        :
                        <span><FormattedMessage id="doctor-manage.save-info" /></span>
                    }
                </button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
        fetchRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
