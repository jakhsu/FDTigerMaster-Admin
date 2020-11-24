<template>
    <div id="ClientDetail">
        <b-container fluid>
            <h1>{{ this.$route.query.userId }}</h1>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'ClientDetail'
}
</script>

<style scoped>
#ClientDetail{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>