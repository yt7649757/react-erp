import WrappedNormalLoginForm  from '../login/login'
import TableComponent from '../component/tableComponent';
import Page from '../menu/page';
import UserLoginList from '../menu/system/userLoginList';
import WorkRegister from '../menu/agora/workRegister';
import RoleList from '../menu/system/roleList';
import TreeList from '../menu/system/treeList';
import NodeList from '../menu/system/nodeList';
import MyProject from "../menu/agora/myProject";
import UselessList from '../menu/agora/uselessList';
import AgoraList from '../menu/agora/agoraList';
import WasteSingleList from '../menu/agora/wasteSingleList';

export const config = [
    {
        path: '/',
        exact: true,
        component: WrappedNormalLoginForm,
    },
    {
        name: '版本检测',
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
      name:'市场营销',
      private: true,
      children: [
          {
              path:'/erp/Project/showProjectEntry',
              component: WorkRegister,
          }
      ]
    },
    {
        name: '系统管理',
        private: true,
        children: [
            {
                path: '/erp/System/messageList',
                component: UserLoginList,
            },{
                path: '/erp/System/roleList',
                component: RoleList
            }, {
                path: '/erp/system/getrolenodelist/role_id/:id/is_mobile/0',
                component: TreeList
            },
            {
                path: '/erp/System/nodeList',
                component: NodeList
            },{
                path: '/erp/Project/showProjectUserList',
                component: MyProject
            },{
                path: '/erp/Project/wasteApplyListCopy',
                component: UselessList
            },{
                path: '/erp/Statistics/marketData',
                component: AgoraList
            },{
                path: '/erp/WasteSingle/showWasteSingleList',
                component: WasteSingleList
            }
        ]
    }
]

