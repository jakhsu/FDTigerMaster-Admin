<template>
    <b-navbar id="topbar" toggleable="lg" class="mb-4 shadow">
        <span class="version">測試版</span>
        <b-button variant="link" class="sidebar-toggle d-md-none mr-3" @click="onSideBarToggleClick">
            <font-awesome-icon icon="bars" />
        </b-button>
        <b-nav class="ml-auto" />
        <b-dropdown right variant="link" toggle-class="text-decoration-none" no-caret>
            <template class="dropdown-toggle" #button-content>
                <span class="user-name mr-2 d-lg-inline">Hi, {{ $store.state.user.name }}</span>
                <b-img class="img-profile" rounded="circle" alt="user avatar" :src="userImg"></b-img>
            </template>
            <b-dropdown-item to="#">
                <font-awesome-icon icon="user" />
                個人檔案
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="onLogoutClick">
                <font-awesome-icon icon="sign-out-alt" />
                登出
            </b-dropdown-item>
        </b-dropdown>
    </b-navbar>
</template>

<script>
    import userImg from '@/assets/user.svg';
    import tigermaster from 'fdtigermaster-admin-sdk';

    export default {
        name: 'Header',
        data() {
            return {
                userImg: userImg
            };
        },
        methods: {
            onSideBarToggleClick() {
                this.$emit("onSideBarToggle");
            },
            async onLogoutClick() {
                try{
                    await tigermaster.device.delete();
                }finally{
                    tigermaster.auth.logout();
                }
            }
        }
    }
</script>

<style>
    #topbar {
        background-color: #ffc646;
    }

    #topbar .sidebar-toggle {
        color: #ffffff;
    }

    #topbar .user-name {
        color: #ffffff;
        font-size: 14pt;
    }

    #topbar .img-profile {
        height: 2rem;
        width: 2rem;
    }

    #topbar .dropdown-menu {
        position: absolute;
    }

    #topbar .version {
        color: #ffffff;
        font-size: 20pt;
    }
</style>