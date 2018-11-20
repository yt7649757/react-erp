import WrappedNormalLoginForm  from '../login/login'
import TableComponent from '../component/tableComponent';
import Page from '../menu/page'

export const config = [
    {
        path: '/',
        exact: true,
        component: WrappedNormalLoginForm,
    },
    {
        path: '/erp',
        component: Page,
        private: true,
    },
    {
        path: '/install/update/checkUpdate',
        component: TableComponent,
        private: true,
    }
]

