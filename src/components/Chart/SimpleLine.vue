<script>
    import {
        line
    } from 'vue-chartjs'

    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    export default {
        extends: line,
        mounted() {
            this.renderChart({
                labels: month,
                datasets: [{
                    backgroundColor: ['#0746c1', '#ff2d2d', '#ce00fb'],
                    data: [0, 12, 35, 58, 120, 578, 1200, 2678, 6000, 12000, 10354, 24356];
                }]
            }, {
                responsive: true,
            })
        }
    }
</script>