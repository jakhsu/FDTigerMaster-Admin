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
                <b-img class="topbar-icon" rounded="circle" alt="user avatar" :src="userImg"></b-img>
            </template>
            <b-dropdown-item>
                <router-link :to="currentUserPath">
                    <font-awesome-icon icon="user" />
                    個人檔案
                </router-link>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="onLogoutClick">
                <font-awesome-icon icon="sign-out-alt" />
                登出
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown variant="link" class="ml-2 chatroom-dropdown" no-caret right>
            <template #button-content>
                <font-awesome-icon class="" icon="comments" />
            </template>
            <b-dropdown-header>
                <strong>聊天室</strong>
            </b-dropdown-header>
            <ChatrommList />
        </b-dropdown>
        <Chatroom v-if="$store.state.chatroom.isShow" :id="$store.state.chatroom.currentId" />
    </b-navbar>
</template>

<script>
    "user strict"
    import userImg from '@/assets/user.svg';
    import tigermaster from 'fdtigermaster-admin-sdk';
    import ChatrommList from '@/components/Chatroom/ChatrommList.vue';
    import Chatroom from '@/components/Chatroom/Chatroom.vue'


    export default {
        name: 'Header',
        components: {
            ChatrommList,
            Chatroom
        },
        data() {
            return {
                userImg: userImg,
                currentUserPath: `/home/user_detail?userId=${this.$store.state.user.id}`
            };
        },
        methods: {
            onSideBarToggleClick() {
                this.$emit("onSideBarToggle");
            },
            async onLogoutClick() {
                try {
                    await tigermaster.device.delete();
                } finally {
                    tigermaster.auth.logout();
                }
            }
        }
    }
</script>

<style>
    #topbar {
        background-color: #ffc646;
        align-items: center;
    }

    #topbar .sidebar-toggle {
        color: #ffffff;
    }

    #topbar .user-name {
        color: #ffffff;
        font-size: 14pt;
    }

    #topbar .topbar-icon {
        height: 2rem;
        width: 2rem;
        cursor: pointer;
    }

    #topbar .dropdown-menu {
        position: absolute;
    }

    #topbar .version {
        color: #ffffff;
        font-size: 20pt;
    }

    .chatroom-dropdown .btn,
    .chatroom-dropdown .btn.active {
        background-color: transparent;
        border-color: transparent;
        border-radius: 50%;
        color: black;
        font-size: 20pt;
    }

    .chatroom-list {
        max-height: 200px;
        overflow: scroll;
    }
</style>