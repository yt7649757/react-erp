import WrappedNormalLoginForm  from '../login/login'
import TableComponent from '../component/tableComponent';
import Page from '../menu/page';
import UserLoginList from '../menu/system/userLoginList';
import WorkRegister from '../menu/agora/workRegister';

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
        path:'/erp/Project/showProjectEntry',
        component: WorkRegister,
        private: true
    },
    {
        path: '/erp/System/messageList',
        component: UserLoginList,
        private: true,
    }
]

