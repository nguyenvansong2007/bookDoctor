import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl'
import './SpecialtyManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../utils/CommonUtils';
import { createSpecialtyService } from '../../../services/userService';
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt()

class SpecialtyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgBase64: '',
            contentMarkdown: '',
            contentHTML: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    }

    //onchange input
    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    // handle onchange markdown
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    //handle preview image
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let objectUrl = URL.createObjectURL(file);
            this.setState({
                // previewImgURL: objectUrl,
                imgBase64: base64
            })
        }
    }

    //save
    handleSaveSpecialty = async () => {
        let res = await createSpecialtyService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imgBase64: '',
                contentMarkdown: '',
                contentHTML: '',
            })
        } else {
            toast.error('Something wrong!')
            console.log(res)
        }
    }

    render() {

        return (
            <div className='specialty-manage-container'>
                <div className='specialty-title title'><FormattedMessage id="specialty-manage.title" /></div>
                <div className='specialty-content row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="specialty-manage.name" /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="specialty-manage.image" /></label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImg(event)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />

                    </div>

                    <div className='col-12'>
                        <button className='btn-add btn'
                            onClick={() => this.handleSaveSpecialty()}
                        ><FormattedMessage id="specialty-manage.save-btn" /></button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
