<template>
    <div id="simple-card" :class="cardClass ? cardClass : ''" :style="`border-left: 3px solid ${borderColor};`">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SimpleCard',
    props: {
        cardClass: String,
        borderColor:{
            type: String,
            default: "#fff"
        }
    }
}
</script>

<style>
#simple-card{
    margin: 25px 0px;
    width: 100%;
    background-color: #fff;
    color: #000;
    text-align: left;
    border-radius: 5px;
    padding: 16px 20px;
}

@media (max-width: 767px){
    #simple-card{
        margin: 10px 0px;
        padding: 16px 0px;
    }
}
</style>