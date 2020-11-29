<template>
<fragment>
    <SideBarDivider/>
    <div class="sidebar-heading mb-2">
        {{ text }}
    </div>
    <slot/>
</fragment>
</template>

<script>
import SideBarDivider from './SideBarDivider'
export default {
    name: 'SideBarGroup',
    props: {
        text: String,
        reqLevel: {
            type: Number,
            default: 0
        }
    },
    components:{
        SideBarDivider
    }
}
</script>

<style>
.sidebar-heading {
  text-align: center;
  padding: 0 1rem;
  font-weight: 1000;
  font-size: .65rem;
}

@media (min-width: 768px) {
  .sidebar-heading {
    text-align: left;
  }

  .toggled .sidebar-heading {
    text-align: center;
  }
}

.sidebar-heading {
  color: rgba(255, 255, 255, 0.6);
}
</style>