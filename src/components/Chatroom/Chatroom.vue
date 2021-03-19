<template>
    <div>
        <b-card class="chatroom">
            <template #header>
                <div class="d-flex">
                    <font-awesome-icon class="ml-auto chatroom-button" icon="phone" />
                    <font-awesome-icon class="ml-3 chatroom-button" icon="times" />
                </div>
            </template>
            <div class="chatroom-body m-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum asperiores dolor rerum eius architecto
                ut magnam blanditiis sapiente laboriosam nam, autem ratione harum quas amet numquam? Ratione esse porro
                provident deserunt, officiis modi nesciunt numquam quidem possimus! Similique blanditiis temporibus
                perferendis harum architecto aliquam? Aperiam a adipisci laboriosam cumque doloribus!
            </div>
            <div class="chatroom-input mt-2">
                <b-input></b-input>
            </div>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "Chatroom"
    }
</script>

<style scoped>
    .chatroom-button {
        font-size: 25px;
        cursor: pointer;
    }

    .chatroom-body {
        max-height: 300px;
        overflow: scroll;
    }

    .chatroom .card-body {
        padding: 0;
    }

    .chatroom {
        width: 250px;
    }
</style>