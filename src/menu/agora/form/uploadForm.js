import React, {Component} from 'react';
import {Form, Icon, Tabs, Input, Button, Modal, Upload, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';
import '../../../style/agora/uploadForm.css';
import {port} from '../../../common/port';
import cookie from 'react-cookies';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    console.log(isPNG, isGIF)
    if (!(isJPG || isGIF || isPNG)) {
        message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
        message.error('超过20M限制 不允许上传!');
    }
    return (isJPG || isGIF || isPNG ) && isLt2M;
}


class UploadForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            _visible: false,
            fileList: [],
            fieldNames: ['photo_name','photo_address','photo_desc','photo_m']
        }
    }

    componentDidMount() {
        //必须在这里声明，所以 ref 回调可以引用它
        this.props.onRef(this)
    }


    getItemsValue = () => {
        const { form } = this.props
        const { fieldNames } = this.state
        console.log(fieldNames)
        //表单验证
        return new Promise(function (resolve) {
            form.validateFields(fieldNames,(err, values) => {
                if (!err) {
                    resolve(values)
                }
            })
        })

    }

    submit = (url, params) => {
        return this.props.agoraActions.addField(url, params)
    }


    //图片上传方法

    showModal = () => {
        this.setState({
            visible: true
        })
    }


    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            loading: false,
            imageUrl: ''
        });
    }


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            message.info('上传图片成功')
            if (info && info.file.response.status === 'Success') {
                this.props.form.setFieldsValue({
                    photo_address: info.file.response.realPath,
                    photo_m: info.file.response.photo_m
                })
            }
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    //附件上传
    showFileModal = () => {
        this.setState({
            _visible: true
        })
    }

    handleFileCancel = () => {
        this.setState({
            _visible: false,
            fileList: []
        })
    }



    handleFileChange = (info) => {

        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
            this.props.form.setFieldsValue({
                field_address: info.file.response.realPath,
                field_m: info.file.response.field_m
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }

        this.setState({ fileList });
    }


    removeFile = () => {
        this.props.form.setFieldsValue({
            file: ''
        })
    }

    //根据tab不同验证对应的表单
    changeTab = (key) => {
        if(key === '1') {
            this.setState({
                fieldNames: ['photo_name','photo_address','photo_desc','photo_m']
            })
        }else if(key === '2') {
            this.setState({
                fieldNames: ['field_name','field_address','field_desc','field_m']
            })
        }
    }


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 15},
            },
        };

        const token = 'Bearer ' + cookie.load('access_token');
        const url = port + '/api/erp/file/uploadpicture';
        const fileurl = port + '/api/erp/file/uploadfile';

        //图片上传

        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        const props = {
            action: fileurl,
            name: 'attachment',
            headers: {Authorization: token},
            onChange: this.handleFileChange,
            accept: '.doc,.docx,.rar,.xls,.xlsx,.zip,.dwg,.7z',
            multiple: false,
            onRemove: this.removeFile
        }

        return (

            <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                <TabPane tab={<span><Icon type="picture"/>图片上传</span>} key="1">
                    {/*<Picture/>*/}
                    <div>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="图片名称"
                            >
                                {getFieldDecorator('photo_name', {
                                    initialValue: '',
                                    rules: [{
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请选择付款方式!',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="图片上传"
                            >
                                {getFieldDecorator('photo_address', {
                                    initialValue: '',
                                    rules: [{
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Input disabled/>
                                )}
                            </FormItem>

                            <FormItem
                            >
                                <Button style={{marginLeft: '101px'}} onClick={this.showModal}><Icon type="upload"/>
                                    上传图片
                                </Button>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('photo_m', {

                                })(
                                    <Input type="hidden"/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="上传说明"
                            >
                                {getFieldDecorator('photo_desc', {
                                    initialValue: ''
                                })(
                                    <TextArea rows={5} style={{resize: 'none'}}/>
                                )}
                            </FormItem>
                        </Form>
                        <Modal
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={null}
                            mask={false}
                            destroyOnClose={true}
                            width={300}
                            maskClosable={false}
                            style={{
                                'right': '7%',
                                'top': '50%',
                                'marginTop': '-160px',
                                'position': 'absolute',
                            }}
                        >
                            <Upload
                                name="attachment"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={url}
                                headers={{Authorization: token}}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                                // customRequest={this.uploadFile}
                            >
                                {imageUrl ?
                                    <img style={{width: 128, height: 128}} src={imageUrl} alt="avatar"/> : uploadButton}
                            </Upload>
                            <p>注!图片上传的格式为（jpg,gif,png,pdf）.</p>
                        </Modal>
                    </div>
                </TabPane>

                <TabPane tab={<span><Icon type="file"/>附件上传</span>} key="2">
                    <div>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="文件名称"
                            >
                                {getFieldDecorator('field_name', {
                                    initialValue: '',
                                    rules: [{
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请选择付款方式!',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="文件上传"
                            >
                                {getFieldDecorator('field_address', {
                                    initialValue: '',
                                    rules: [{
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请上传附件!',
                                    }],
                                })(
                                    <Input disabled/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button style={{marginLeft: '101px'}} onClick={this.showFileModal}><Icon type="upload"/>
                                    上传附件
                                </Button>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('field_m', {

                                })(
                                    <Input type="hidden"/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="上传说明"
                            >
                                {getFieldDecorator('field_desc',{
                                    initialValue: ''
                                    }
                                )(
                                    <TextArea rows={5} style={{resize: 'none'}}/>
                                )}
                            </FormItem>
                        </Form>
                        <Modal
                            visible={this.state._visible}
                            onCancel={this.handleFileCancel}
                            mask={false}
                            footer={null}
                            destroyOnClose={true}
                            width={500}
                            maskClosable={false}
                            style={{
                                'right': '7%',
                                'top': '50%',
                                'marginTop': '-160px',
                                'position': 'absolute',
                            }}
                        >
                            <Upload {...props} fileList={this.state.fileList}>
                                <Button>
                                    <Icon type="upload"/> Click to Upload
                                </Button>
                            </Upload>
                            <p style={{marginTop: 10}}>注!附件上传的格式为（doc,rar,7z,xlsx,zip,xls,docx,dwg）.</p>
                        </Modal>
                    </div>
                </TabPane>
            </Tabs>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UploadForm))