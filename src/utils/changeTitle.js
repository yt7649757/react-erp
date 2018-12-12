export const changeTitle = (params) => {
    switch (params) {
        case 'OrderForm':
            return '添加定金单';
        case 'UselessForm':
            return '废单申请';
        case 'EditForm':
            return '修改数据';
        case 'ApplyPartForm':
            return '申请转部';
        case 'UploadForm':
            return '上传附件';
        default:
            return '添加数据'
    }
}