<template>
  <router-link class="go-back-container" :to="{ name: 'home' }"><img class="arrow-image"
      src="../../assets/ic_back_grey@3x.png" alt="back arrow">Back to overview</router-link>
</template>

<script>
export default {
  name: 'BackButton',
}
</script>

<style scoped>
.arrow-image {
  width: 20px;
  margin-right: 20px;
  position: relative;
  top: 3px;
}
</style>