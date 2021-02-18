<template>
    <div>
        <img :src="modifiedSrc" alt="">
    </div>
</template>

<script>
    export default {
        name: 'SimpleImage',
        props: {
            src: String
        },
        data() {
            return {}
        },
        computed: {
            modifiedSrc() {
                return this.src + "?" + performance.now();
            }
        }
    }
</script>