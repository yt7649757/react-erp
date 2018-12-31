import WrappedNormalLoginForm  from '../login/login'
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
import TransferredList from '../menu/agora/transferredList';
import WasteProjectApply from '../menu/agora/wasteProjectApply';

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
import MyContractProject from "../menu/queto/myContractProject";

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
import PriceTable from '../menu/finance/priceTable';
import ProjectProgress from "../menu/finance/projectProgress";
import PayReceive from '../menu/finance/payReceive';
import ProjectReceipt from '../menu/finance/contractDetail/projectReceipt';
import Engineering from "../menu/finance/priceCheckList/engineering";
import EngineeringDetail from "../menu/finance/priceCheckList/engineeringDetail";
import Contractprintlook from "../menu/finance/priceCheckList/contractprintlook";
import TransationRecord from "../menu/finance/accountManage/transactionRecord";
import Currentaccount from "../menu/finance/currentaccount";
import ShowGeneralExpense from "../menu/finance/showGeneralExpense";


import NoticeListByDep from "../menu/oawork/noticeListByDep";
import NoticeList from "../menu/oawork/noticeList";
import AddLeave from "../menu/oawork/addLeave";
import LeavePermit from "../menu/oawork/leavePermit";
import MyLeavePermit from "../menu/oawork/myLeavePermit";
import AddWorkPlan from "../menu/oawork/addWorkPlan";
import MyWorkPlan from "../menu/oawork/myWorkPlan";
import AllWorkPlan from "../menu/oawork/allWorkPlan";
import WorkPlanByDep from "../menu/oawork/workPlanByDep";
import ManagerMailbox from "../menu/oawork/managerMailbox";
import RepairEntering from "../menu/oawork/repairEntering";
import RepairEnteringManage from "../menu/oawork/repairEnteringManage";
import MyRepairEntering from "../menu/oawork/myRepairEntering";
import MyAddRepairEntering from "../menu/oawork/myAddRepairEntering";
import AddressList from "../menu/oawork/addressList";
import MySignIn from "../menu/oawork/mySignIn";
import SignInRecord from "../menu/oawork/signInRecord";
import CurrentMonthSignIn from "../menu/oawork/curentMonthRegister";
import NoticeIssue from "../menu/oawork/notcieIssue";
import ApplyUseCar from "../menu/oawork/applyUseCar";
import Applysupplies from "../menu/oawork/applysupplies";
import EmployeePower from "../menu/ceo/employeePower";
import ShowRateItemList from "../menu/ceo/showRateItemList";
import ShowDefaultRate from "../menu/ceo/showDefaultRate";
import ShowRateItemClothesList from "../menu/ceo/showRateItemClothesList";
import ShowRateItemPackageList from "../menu/ceo/showRateItemPackageList";
import ShowEditBudgetStyle from "../menu/ceo/showEditBudgetStyle";
import Showdatastylelist from "../menu/ceo/showdatastylelist";
import Showdatastyleclotheslist from "../menu/ceo/showdatastyleclotheslist";
import Showdatatypepackagelist from "../menu/ceo/showdatatypepackagelist";
import ShowContractEdit from "../menu/ceo/showContractEdit";
import Showtemplatestylelist from "../menu/ceo/showtemplatestylelist";
import ShowTemplateBudget from "../menu/ceo/showTemplateBudget";
import ShowRolePowerList from "../menu/ceo/showRolePowerList";
import AgoraAchievement from "../menu/ceo/agoraAchievement";
import ServiceAchievement from "../menu/ceo/serviceAchievement";
import ShowMarketingTarget from "../menu/ceo/showMarketingTarget";
import ShowServerTarget from "../menu/ceo/showServerTarget";
import UserInput from "../menu/ceo/userInput";
import UserList from "../menu/ceo/userList";
import CompanySetup from "../menu/ceo/companySetup";
import CompanyDepartment from "../menu/ceo/companyDepartment";
import JobList from "../menu/ceo/jobList";
import ProjectsumList from "../menu/ceo/projectsumList";
import SetuserroleList from "../menu/ceo/setuserroleList";
import ShowProjectComList from "../menu/ceo/showProjectComList";
import ShowProjectSevComList from "../menu/ceo/showProjectSevComList";
import ShowFundsList from "../menu/ceo/showFundsList";
import MyEmail from "../menu/ceo/myEmail";
import ShowRefundPriceProject from "../menu/ceo/showRefundPriceProject";
import DesignAchievement from "../menu/ceo/designAchievement";
import ShowProListByCom from "../menu/ceo/showProListByCom";

export const config = [
    {
        path: '/',
        exact: true,
        component: WrappedNormalLoginForm,
    },
    // {
    //     name: '版本检测',
    //     path: '/install/update/checkUpdate',
    //     component: Test,
    //     private: true,
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
            },{
                path: '/erp/finance/showcurrentaccount',
                component: Currentaccount
            },{
                path: '/erp/finance/showgeneralexpense',
                component: ShowGeneralExpense
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
                component: MyContractProject
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
    },{
        name:'OA办公',
        private: true,
        children: [
            {
                path: '/erp/work/shownoticelist',
                component: NoticeList
            },{
                path: '/erp/work/shownoticelistbydep',
                component: NoticeListByDep
            },{
                path: '/erp/System/showAddLeave',
                component: AddLeave
            },{
                path: '/erp/System/leaveList',
                component: LeavePermit
            },{
                path: '/erp/Work/showMyLeave',
                component: MyLeavePermit
            },{
                path: '/erp/System/showWorkPlan',
                component: AddWorkPlan
            },{
                path: '/erp/System/workuserList',
                component: MyWorkPlan
            },{
                path: '/erp/Work/showAllPlanList',
                component: AllWorkPlan
            },{
                path: '/erp/Work/showDepPlanList',
                component: WorkPlanByDep
            },{
                path: '/erp/Work/showAddManagerLine',
                component: ManagerMailbox
            },{
                path: '/erp/Work/showComplaint',
                component: RepairEntering
            },{
                path: '/erp/Work/showComplaintList',
                component: RepairEnteringManage
            },{
                path: '/erp/Work/showComplaintUserAdd',
                component: MyAddRepairEntering
            },{
                path: '/erp/Work/showComplaintUserHave',
                component: MyRepairEntering
            },{
                path: '/erp/User/userByRole',
                component: AddressList
            },{
                path: '/erp/Sign/showUserSign',
                component: MySignIn
            },{
                path: '/erp/Sign/showUserList',
                component: SignInRecord
            },{
                path: '/erp/Sign/showPersonnelSign',
                component: CurrentMonthSignIn
            },{
                path: '/erp/work/showNotice',
                component: NoticeIssue
            },{
                path: '/erp/OfficeVehicle/showVehicleList',
                component: ApplyUseCar
            },{
                path: '/erp/OfficeSupplies/showSuppliesList',
                component: Applysupplies
            }
        ]
    },{
        name: 'CEO管理',
        private: true,
        children: [{
            path: '/erp/Work/showNoRoleByUser',
            component: EmployeePower
        },{
            path: '/erp/Material/showRateItemList',
            component: ShowRateItemList
        },{
            path: '/erp/Design/showDefaultRate',
            component: ShowDefaultRate
        },{
            path: '/erp/Material/showRateItemClothesList',
            component: ShowRateItemClothesList
        },{
            path: '/erp/Material/showRateItemPackageList',
            component: ShowRateItemPackageList
        },{
            path: '/erp/Material/showEditBudgetStyle',
            component: ShowEditBudgetStyle
        },{
            path: '/erp/Material/showdatastylelist',
            component: Showdatastylelist
        },{
            path: '/erp/Material/showdatastyleclotheslist',
            component: Showdatastyleclotheslist
        },{
            path: '/erp/Material/showdatatypepackagelist',
            component: Showdatatypepackagelist
        },{
            path: '/erp/Contract/showContractEdit',
            component: ShowContractEdit
        },{
            path: '/erp/Material/showtemplatestylelist',
            component: Showtemplatestylelist
        },{
            path: '/erp/Material/showTemplateBudget',
            component: ShowTemplateBudget
        },{
            path: '/erp/User/showRoleList',
            component: ShowRolePowerList
        },{
            path: '/erp/WorkTarget/showMarketingTarget',
            component: ShowMarketingTarget
        },{
            path: '/erp/WorkTarget/showServerTarget',
            component: ShowServerTarget
        },{
            path: '/erp/System/showStaff',
            component: UserInput
        },{
            path: '/erp/System/userList',
            component: UserList
        },{
            path: '/erp/System/companyList',
            component: CompanySetup
        },{
            path: '/erp/System/departmentList',
            component: CompanyDepartment
        },{
            path: '/erp/System/jobsList',
            component: JobList
        },{
            path: '/erp/System/projectsumList',
            component: ProjectsumList
        },{
            path: '/erp/System/setuserroleList',
            component: SetuserroleList
        },{
            path: '/erp/Project/showProjectComList',
            component: ShowProjectComList
        },{
            path: '/erp/Design/showProListByCom',
            component: ShowProListByCom
        },{
            path: '/erp/Project/showProjectSevComList',
            component: ShowProjectSevComList
        },{
            path: '/erp/FundsSum/showFundsList',
            component: ShowFundsList
        },{
            path: '/erp/Work/showManagerList',
            component: MyEmail
        },{
            path: '/erp/ProjectDeposit/showRefundPriceProject',
            component: ShowRefundPriceProject
        },{
            path: '/erp/Statistics/showMarketData',
            component: AgoraAchievement
        },{
            path: '/erp/Statistics/showServiceData',
            component: ServiceAchievement
        },{
            path: '/erp/Statistics/showDesignData',
            component: DesignAchievement
        }]
    }
]

