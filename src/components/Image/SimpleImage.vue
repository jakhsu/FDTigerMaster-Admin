<template>
    <div>
        <img :src="src" alt="">
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
        }
    }
</script>