<template>
    <span class="Container m-2" :style="`background-color: ${bgColor}`">
        <slot name="prepend" />
        <span class="Content m-1">
            <strong class="number">
                <slot name="number" />
            </strong>
        </span>
        <slot name="append" />
    </span>
</template>

<script>
    export default {
        name: "Badge",
        props: {
            number: {
                type: Number,
            },
            bgColor: {
                type: String,
                default: '#FFA900'
            }
        }
    }
</script>

<style>
    .Container {
        padding: 0.45rem 10px;
        color: rgb(0, 0, 0);
        border-radius: 10px;
    }

    .Content {
        padding: 0.05em 0.5em;
        color: rgb(0, 0, 0);
        background-color: #ffffff;
        align-content: center;
    }
</style>