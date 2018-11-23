import WrappedNormalLoginForm  from '../login/login'
import TableComponent from '../component/tableComponent';
import Page from '../menu/page'
import MessageList from '../menu/system/messageList'

export const config = [
    {
        path: '/',
        exact: true,
        component: WrappedNormalLoginForm,
    },
    {
        path: '/install/update/checkUpdate',
        component: TableComponent,
        private: true,
    },
    {
        path: '/erp',
        exact: true,
        component: Page,
        private: true,
    },
    {
        path: '/erp/System/messageList',
        component: MessageList,
        private: true,
    }
]

