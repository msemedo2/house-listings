<template>
  <img src="../../assets/ic_edit@3x.png" alt="location icon" class="edit-icon">
  <img src="../../assets/ic_delete@3x.png" alt="location icon" class="delete-icon" @click.prevent="setActiveModal">
</template>

<script>

export default {
  name: 'EditButton',

  methods: {
    setActiveModal() {
      this.$store.dispatch('setActiveModal', true)
    },

  },
}
</script>

<style scoped>
.delete-icon,
.edit-icon {
  width: 20px;
  margin-left: 25px;
  cursor: pointer;
}
</style>