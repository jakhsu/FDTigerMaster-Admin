<script>
    import {
        Pie
    } from 'vue-chartjs'

    export default {
        extends: Pie,
        mounted() {
            this.renderChart({
                labels: ['男性', '女性', '其他'],
                datasets: [{
                    label: 'GitHub Commits',
                    backgroundColor: ['#1F1FF9', '#FF2D54', '#2DFF3F'],
                    data: [40, 20, 5]
                }]
            }, {
                responsive: true,
            })
        }
    }
</script>