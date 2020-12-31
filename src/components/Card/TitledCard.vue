<template>
    <div class="title-card" :class="cardClass ? cardClass : ''">
        <div class="title-card-header" :style="`background-color: ${titleBackgroundColor}`">
            <h6 class="m-0" :style="`color: ${titleColor}`">{{ title }}</h6>
        </div>
        <div :class="fluid ? 'title-card-body-fluid' : 'title-card-body'"
            :style="`background-color: ${bodyBackgroundColor}`">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TitleCard',
        props: {
            cardClass: String,
            title: String,
            titleBackgroundColor: {
                type: String,
                default: "#457CD6"
            },
            titleColor: {
                type: String,
                default: "#ffffff"
            },
            bodyBackgroundColor: {
                type: String,
                default: "#ffffff"
            },
            fluid: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>
    .title-card {
        margin: 25px 0px;
    }

    .title-card .title-card-header {
        width: 100%;
        text-align: left;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 16px 20px;
    }

    .title-card .title-card-body {
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 30px;
    }

    .title-card .title-card-body-fluid {
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 10px;
    }

    @media (max-width: 768px) {
        .title-card .title-card-body {
            padding: 10px;
        }
    }
</style>