<template>
    <div>
        <b-row>
            <b-col>
                <div class="preview">
                    <img src="@/assets/iphone.png" alt="">
                    <div class="content">
                        <slot name="content" />
                    </div>
                </div>
            </b-col>
            <b-col>
                <div class="preview">
                    <img src="@/assets/android.png" alt="">
                    <div class="content">
                        <slot name="content" />
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>

</template>

<script>
    export default {
        name: "PhonePreview"
    }
</script>

<style scoped>
    .preview {
        position: relative;
        width: 100%;
    }

    .content {
        position: absolute;
        width: 100%;
        top: 5rem;
        left: 20px;
    }
</style>