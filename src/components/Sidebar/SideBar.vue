<template>
    <b-nav class="sidebar flex-column" :class="{'toggled': toggled}">
        <b-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/home">
            <img class="sidebar-brand-logo" alt="ttes logo" :src="logoImg" />
            <div class="sidebar-brand-text ml-1">
                TigerMaster
                <div>測試版</div>
            </div>
        </b-link>

        <SideBarButton to="/home" icon="tachometer-alt">
            資訊面板
        </SideBarButton>
        <SideBarGroup text="使用者">
            <SideBarButton to="/home/client" icon="users">
                客戶資料
            </SideBarButton>
            <SideBarButton to="/home/master" icon="hard-hat">
                師傅資料
            </SideBarButton>
            <SideBarButton to="/home/admin" icon="user-shield">
                管理員資料
            </SideBarButton>
        </SideBarGroup>

        <SideBarGroup text="服務項目">
            <SideBarButton to="/home/skill" icon="link">
                技能
            </SideBarButton>
            <SideBarButton to="/home/working_category" icon="link">
                工項
            </SideBarButton>
        </SideBarGroup>

        <SideBarGroup text="訂單">
            <SideBarButton to="/home/ongoing_order" icon="hourglass-half">
                進行中訂單
            </SideBarButton>
            <SideBarButton to="/home/closed_order" icon="file-contract">
                已完成訂單
            </SideBarButton>
            <SideBarButton to="/home/order_finance" icon="money-check">
                匯款資訊
            </SideBarButton>
        </SideBarGroup>

        <SideBarGroup text="系統推播">
            <SideBarButton to="/home/broadcast" icon="paper-plane">
                推播
            </SideBarButton>
            <SideBarButton to="/home/broadcast_history" icon="archive">
                推播歷史
            </SideBarButton>
        </SideBarGroup>

        <SideBarGroup text="其他">
        </SideBarGroup>

        <SideBarDivider />

        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle" @click="onToggleClick">
                <font-awesome-icon v-if="toggled" icon="angle-right" fixed-width />
                <font-awesome-icon v-else icon="angle-left" fixed-width />
            </button>
        </div>
    </b-nav>
</template>

<script>
    import SideBarGroup from './SideBarGroup'
    import SideBarButton from './SideBarButton'
    import SideBarDivider from './SideBarDivider'

    import LogoImg from '@/assets/logo.png'

    export default {
        name: 'SideBar',
        props: {
            toggled: Boolean
        },
        components: {
            SideBarGroup,
            SideBarButton,
            SideBarDivider
        },
        data() {
            return {
                logoImg: LogoImg
            }
        },
        methods: {
            onToggleClick() {
                this.$emit("onToggle");
            }
        }
    }
</script>

<style>
    .sidebar {
        width: 14rem;
        min-height: 100vh;
    }

    .sidebar #sidebarToggle {
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        margin-bottom: 1rem;
        cursor: pointer;
    }

    .sidebar #sidebarToggle i {
        width: 100%;
        height: auto;
        text-align: center;
    }

    .sidebar #sidebarToggle::after {
        font-weight: 900;
        margin-right: 0.1rem;
    }

    .sidebar #sidebarToggle:hover {
        text-decoration: none;
    }

    .sidebar #sidebarToggle:focus {
        outline: none;
    }

    .sidebar.toggled {
        width: 6.5rem !important;
        overflow: visible;
    }

    .sidebar .sidebar-brand {
        height: 100px;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 800;
        padding: 1.5rem 0.5rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        z-index: 1;
    }

    .sidebar .sidebar-brand .sidebar-brand-logo {
        height: 70%;
        width: auto;
    }

    .sidebar .sidebar-brand .sidebar-brand-text {
        display: inline;
    }

    .sidebar.toggled .sidebar-brand .sidebar-brand-icon i {
        font-size: 2rem;
        display: inline;
    }

    .sidebar.toggled .sidebar-brand .sidebar-brand-text {
        display: none;
    }

    @media (max-width: 767px) {
        .sidebar {
            width: 6.5rem !important;
        }

        .sidebar .sidebar-brand {
            padding: 0.5rem 0.5rem;
        }

        .sidebar .sidebar-brand .sidebar-brand-logo {
            height: auto;
            width: 80%;
        }

        .sidebar .sidebar-brand .sidebar-brand-text {
            display: none;
        }

        .sidebar.toggled {
            width: 0 !important;
            overflow: hidden;
        }

        .sidebar.toggled .sidebar-brand .sidebar-brand-icon i {
            display: none;
        }

        .sidebar.toggled .sidebar-brand .sidebar-brand-text {
            display: inline;
        }
    }

    .sidebar {
        background-color: #34558b;
    }

    .sidebar .sidebar-brand {
        color: #fff;
    }

    .sidebar #sidebarToggle {
        background-color: rgba(255, 255, 255, 0.2);
        color: #ffffff;
    }

    .sidebar #sidebarToggle::after {
        color: rgba(255, 255, 255, 0.5);
    }

    .sidebar #sidebarToggle:hover {
        background-color: rgba(255, 255, 255, 0.25);
    }

    .sidebar.toggled #sidebarToggle::after {
        color: rgba(255, 255, 255, 0.5);
    }
</style>