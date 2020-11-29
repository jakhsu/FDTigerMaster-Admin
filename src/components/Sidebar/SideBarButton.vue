<template>
    <b-nav-item class="sidebar-button" :class="{'active': active}" :to="to">
        <font-awesome-icon :icon="icon" fixed-width/>
        <span>
            <slot/>
        </span>
    </b-nav-item>
</template>

<script>
export default {
    name: 'SideBarButton',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        reqLevel: {
            type: Number,
            default: 0
        },
        to: String,
        icon: String
    }
}
</script>

<style>
.sidebar-button {
  position: relative;
}

.sidebar-button .nav-link {
  text-align: center;
  padding: 0.75rem 1rem;
  width: 6.5rem;
}

.sidebar-button .nav-link span {
  margin-left: 0px;
  font-size: 0.65rem;
  display: block;
}

.sidebar-button.active .nav-link {
  font-weight: 700;
}

@media (min-width: 768px) {
  .sidebar-button .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1rem;
    width: 14rem;
  }
  .sidebar-button .nav-link i {
    font-size: 0.85rem;
    margin-right: 0.25rem;
  }

  .sidebar-button .nav-link span {
    margin-left: 10px;
    font-size: 0.85rem;
    display: inline;
  }

  .toggled .sidebar-button .nav-link {
    text-align: center;
    padding: 0.75rem 1rem;
    width: 6.5rem;
  }

  .toggled .sidebar-button .nav-link span {
    margin-left: 0px;
    font-size: 0.65rem;
    display: block;
  }

  .toggled .sidebar-button .nav-link i {
    margin-right: 0;
  }
}

.sidebar-button .nav-link {
  color: rgba(255, 255, 255, 0.6);
}

.sidebar-button .nav-link i {
  color: rgba(255, 255, 255, 0.3);
}

.sidebar-button .nav-link:active,
.sidebar-button .nav-link:focus,
.sidebar-button .nav-link:hover {
  color: #fff;
}

.sidebar-button .nav-link:active i,
.sidebar-button .nav-link:focus i,
.sidebar-button .nav-link:hover i {
  color: #fff;
}

.sidebar .nav-item.active .nav-link{
    color: #fff;
}

.sidebar .nav-item.active .nav-link i{
    color: #fff;
}
</style>