<template>
    <div id="data-card" :class="cardClass ? cardClass : ''" :style="`border-left: 3px solid ${color};`">
        <b-row class="no-padding w-100">
            <b-col class="mr-2">
                <div class="data-card-title mb-1" :style="`color: ${color};`">{{ title }}</div>
                <div class="data-card-data h5">
                    <router-link v-if="isLink" :to="dataPath">{{data}}</router-link>
                    <span v-else>{{data}}</span>
                </div>
            </b-col>
            <b-col v-if="hasTrend" cols="auto" class="d-flex align-items-center">
                <div class="data-card-trend" :style="'color: ' + (trend > 0 ? '#007bff' : '#dc3545')">
                    {{ ['','+'][+(trend > 0)] + trend }}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'DataCard',
        props: {
            hasTrend: {
                type: Boolean,
                default: false
            },
            cardClass: String,
            color: {
                type: String,
                default: "#4e73df"
            },
            title: String,
            data: Number,
            trend: Number,
            dataPath: {
                type: String,
                default: "/"
            },
            isLink: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>
    #data-card {
        margin: 25px 0px;
        width: 100%;
        background-color: #fff;
        color: #000;
        text-align: left;
        border-radius: 5px;
        padding: 16px 20px;
    }

    #data-card .data-card-title {
        font-size: 1rem;
    }

    #data-card .data-card-data {
        color: #5a5c69;
        font-weight: 700;
    }

    #data-card .data-card-trend {
        font-size: 2rem;
        font-weight: 700;
    }

    @media (max-width: 767px) {
        #data-card {
            margin: 10px 0px;
        }
    }
</style>