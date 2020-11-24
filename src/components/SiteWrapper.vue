<template>
    <div id="wrapper">
        <SideBar :toggled="sideBarToggle" @onToggle="onSideBarToggle"/>
        <div id="content-wrapper" className="d-flex flex-column">
          <Header @onSideBarToggle="onSideBarToggle"/>
          <div className="content">
              <slot />
          </div>
        </div>
    </div>
</template>

<script>
import Header from './Header/Header.vue'
import SideBar from './Sidebar/SideBar'

export default {
    name: 'SiteWrapper',
    components:{
        Header,
        SideBar
    },
    data(){
        return{
            sideBarToggle: false
        }
    },
    mounted() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    },
    beforeDestroy() {
        window.addEventListener("resize", this.resize.bind(this));
    },
    methods: {
        resize(){
            this.sideBarToggle = window.innerWidth <= 1024;
        },
        onSideBarToggle(){
            this.sideBarToggle = this.sideBarToggle ? false : true;
        }
    }
}
</script>

<style>
#wrapper {
  display: flex;
  min-height: 100vh;
}

#wrapper #content-wrapper {
  width: 100%;
  overflow-x: hidden;
}

#wrapper #content-wrapper #content {
  flex: 1 0 auto;
}
</style>