<template>
    <div>
        hello
        <b-button @click="next">完成</b-button>
    </div>
</template>

<script>
    export default {
        name: 'example.vue',
        methods: {
            next() {
                this.$emit('finish', 123)
            }
        }
    }
</script>