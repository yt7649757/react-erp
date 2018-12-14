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
        case 'LinkPeopleForm':
            return '添加联系人';
        case 'LogForm':
            return '添加日志';
        case 'RemindForm':
            return '设置提醒'
        default:
            return '添加数据'
    }
}