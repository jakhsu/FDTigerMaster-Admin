<template>
  <b-form>
    <b-form-group label="通知標題">
      <b-form-input v-model="title" type="text" placeholder="輸入通知標題" />
    </b-form-group>
    <b-form-group label="通知文字">
      <b-form-textarea v-model="content" placeholder="輸入通知文字" rows="4" max-rows="4" />
    </b-form-group>
    <b-form-group label="通知圖片(選用)">
      <b-input-group inline>
        <b-form-input v-model="imageUrl" type="text" placeholder="圖片連結" disabled />
        <b-input-group-append>
          <input ref="file" type="file" @change="handleImage" class="custom-input" accept="image/*"
            style="display:none">
          <b-button @click="$refs.file.click()" variant="outline-info">
            <font-awesome-icon icon="upload" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-button variant="primary" :disabled="invaliedateForm" @click="onNextClick">
      下一步
    </b-button>
  </b-form>
</template>

<script>
  import tigermaster from 'fdtigermaster-admin-sdk'

  export default {
    name: "BroadcastContent",
    data() {
      return {
        title: '',
        content: '',
        imageUrl: '',
        isUploadingImg: false
      };
    },
    computed: {
      invaliedateForm() {
        return this.title === '' || this.content === '';
      }
    },
    methods: {
      onNextClick() {
        if (this.isUploadingImg === true) {
          return
        }
        this.$emit('next', {
          title: this.title,
          content: this.content,
          imageUrl: this.imageUrl,
        });
      },
      async handleImage(e) {
        this.isUploadingImg = true
        const pushNotify = tigermaster.pushNotify;
        const imageFile = e.target.files[0]
        try {
          const url = await pushNotify.uploadImage(imageFile)
          this.imageUrl = url
        } catch (e) {
          console.log(e)
        } finally {
          this.isUploadingImg = false
        }
      }
    }
  }
</script>