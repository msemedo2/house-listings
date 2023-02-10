<template>
  <router-link class="go-back-container" :to="{ name: 'home' }">
    <img class="arrow-image" :src="backButtonImage" alt="back arrow">
    <span class="back-text">Back to overview</span>
  </router-link>

</template>

<script>
export default {
  name: 'BackButton',
  props: ['backButtonImage']
}
</script>

<style scoped>
.arrow-image {
  width: 20px;
  margin-right: 20px;
  position: relative;
  top: 3px;
}

@media (max-width: 500px) {
  .back-text {
    display: none;
  }
}
</style>