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
import ProjectDetail from "../menu/agora/projectDetail";
import ShowPayMentList from '../menu/finance/showPayMentList';
import ShowProjectDepositList from '../menu/finance/showProjectDepositList';
import CollectStyleList from '../menu/finance/collectStyleList';
import ShowContractProjectList from '../menu/finance/showContractProjectList';
import AccountManage from "../menu/finance/accountManage";
import ContractDetail from "../menu/finance/contractDetail";
import CollectPlanEdit from "../menu/finance/CollectPlanEdit";
import PriceCheckList from "../menu/finance/priceCheckList";
import CollectRevokeCheck from "../menu/finance/collectRevokeCheck";
import CollectCheck from "../menu/finance/collectCheck";
import ShowProListByUser from "../menu/queto/showProListByUser";
import ShowNoContract from "../menu/queto/showNoContract";
import ShowConProListByCom from "../menu/queto/showConProListByCom";
import ShowProListByDep from "../menu/queto/showProListByDep";
import ShowNoContractByDep from "../menu/queto/showNoContractByDep";
import ShowNoContractByCom from "../menu/queto/showNoContractByCom";
import ShowProjectAudit from "../menu/queto/showProjectAudit";
import ShowApplyList from "../menu/queto/showApplyList";
import ShowChangeList from "../menu/queto/showChangeList";
import ShowCheckList from "../menu/queto/showCheckList";
import ShowProjectContAudit from "../menu/queto/showProjectContAudit";
import ExcellentOpus from "../menu/queto/excellentOpus";
import Achievement from '../menu/queto/achievement';
import TransferredList from '../menu/agora/transferredList';
import WasteProjectApply from '../menu/agora/wasteProjectApply';
import PriceTable from '../menu/finance/priceTable';
import ProjectProgress from "../menu/finance/projectProgress";
import PayReceive from '../menu/finance/payReceive';
import ProjectReceipt from '../menu/finance/contractDetail/projectReceipt';
import Engineering from "../menu/finance/priceCheckList/engineering";
import EngineeringDetail from "../menu/finance/priceCheckList/engineeringDetail";
import Contractprintlook from "../menu/finance/priceCheckList/contractprintlook";
import TransationRecord from "../menu/finance/accountManage/transactionRecord";

export const config = [
    {
        path: '/',
        exact: true,
        component: WrappedNormalLoginForm,
    },
    // {
    //     // name: '版本检测',
    //     // path: '/install/update/checkUpdate',
    //     // // component: TableComponent,
    //     // private: true,
    // },
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
          },{
              path: '/erp/project/showprojectofuser/guid/:id',
              component: ProjectDetail
          },{
              path: '/erp/TransferredProject/showMarketUserProject',
              component: TransferredList
          },{
              path: '/erp/WasteSingle/showWasteProjectApply',
              component: WasteProjectApply
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
            }
        ]
    },
    {
        name: '财务管理',
        private: true,
        children: [
            {
                path: '/erp/finance/showpaymentlist',
                component: ShowPayMentList
            },{
                path: '/erp/ProjectDeposit/showProjectDepositList',
                component: ShowProjectDepositList
            },{
                path: '/erp/Finance/collectStyleList',
                component: CollectStyleList
            },{
                path: '/erp/Finance/showContractProjectList',
                component: ShowContractProjectList
            },{
                path: '/erp/Finance/showBankList',
                component: AccountManage
            },{
                path: '/erp/FinanceProjectPrice/showProjectList',
                component: ContractDetail
            }, {
                path: '/erp/Finance/collectPlanList',
                component: CollectPlanEdit
            }, {
                path: '/erp/Finance/showProjectPriceCheck',
                component: PriceCheckList
            }, {
                path: '/erp/FinanceRevoke/showRevokeList',
                component: CollectRevokeCheck
            }, {
                path: '/erp/ProjectPayment/showPaymentList',
                component: CollectCheck
            },{
                //报价表
                path: '/erp/design/showbudgetbook/guid/:id',
                component: PriceTable
            },{
                //设计进度
                path: '/erp/design/showbudgethtml/guid/:id',
                component: ProjectProgress
            },{
                path: '/erp/finance/collectionplan/guid/:id',
                component: PayReceive
            }, {
                path: '/erp/finance_project_price/lookprojectmore/guid/:id',
                component: ProjectReceipt
            },{
                //项目工程
                path: '/erp/finance/lookbuildfinance/guid/:id',
                component: Engineering
            }, {
                //工程明细
                path: '/erp/finance/lookbuilddetailed/pro_id/:id/id/:id',
                component: EngineeringDetail
            }, {
                //发包预算浏览
                path: '/erp/finance/contractprintlook/pro_id/:id',
                component: Contractprintlook
            }, {
                //交易记录
                path: '/erp/finance/lookbanklog/guid/:id',
                component: TransationRecord
            }
        ]
    },
    {
        name: '预算报价',
        private: true,
        children: [
            {
                path: '/erp/Design/showProListByUser',
                component: ShowProListByUser
            },{
                path: '/erp/DesignExtract/showNoContract',
                component: ShowNoContract
            },{
                path: '/erp/DesignExtract/showContractProjectList',
                component: ShowContractProjectList
            },{
                path: '/erp/DesignExtract/showConProListByCom',
                component: ShowConProListByCom
            },{
                path: '/erp/Design/showProListByDep',
                component: ShowProListByDep
            }, {
                path: '/erp/DesignExtract/showNoContractByDep',
                component: ShowNoContractByDep
            }, {
                path: '/erp/DesignExtract/showNoContractByCom',
                component: ShowNoContractByCom
            }, {
                path: '/erp/Project/showProjectAudit',
                component: ShowProjectAudit
            }, {
                path: '/erp/designExtract/showApplyList',
                component: ShowApplyList
            },{
                path: '/erp/DesignExtract/showChangeList',
                component: ShowChangeList
            },{
                path: '/erp/Design/showCheckList',
                component: ShowCheckList
            }, {
                path: '/erp/DesignExtract/showProjectContAudit',
                component: ShowProjectContAudit
            },{
                path: '/erp/user/excellentOpus',
                component: ExcellentOpus
            },{
                path: '/erp/Statistics/designData',
                component: Achievement
            }
        ]
    }
]

