import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import _ from 'lodash';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        this.setState({
            email: this.props.dataModal.email
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    //handle
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedyModal(this.state)
    }

    render() {
        let { isOpenModal, dataModal, closeRemedyModal, sendRemedyModal } = this.props

        return (
            <>
                <Modal isOpen={isOpenModal} className='remedy-modal-container'
                    size='md'
                    backdrop={true}
                    centered
                >

                    <div className='modal-header'>
                        <h5 className='modal-title'>Xác nhận khám xong và gửi hóa đơn</h5>
                        <span onClick={closeRemedyModal}>  <i className='fas fa-times'></i></span>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label >Email bệnh nhân</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label >Chọn file</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary px-3' onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                        <Button color='secondary px-3' onClick={closeRemedyModal}>Cancel</Button>
                    </ModalFooter>

                </Modal >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
