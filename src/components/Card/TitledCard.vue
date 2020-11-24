<template>
    <div class="title-card">
        <div class="title-card-header">
            <h6 class="m-0">{{ title }}</h6>
        </div>
        <div class="title-card-body">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleCard',
    props: {
        title: String
    }
}
</script>

<style>
.title-card{
  margin: 25px 0px;
}

.title-card .title-card-header{
  width: 100%;
  background-color: #457CD6;
  color: #ffffff;
  text-align: left;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 16px 20px;
}

.title-card .title-card-body{
  width: 100%;
  background-color: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 30px;
}

@media (max-width: 768px) {
  .title-card .title-card-body{
    padding: 10px;
  }
}

</style>