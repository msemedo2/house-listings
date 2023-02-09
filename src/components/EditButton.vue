<template>
  <div v-show="!listing.madeByMe === false" class="buttons-container">
    <router-link :to="{ path: `/edit-listing/${selectedHouseId}` }">
      <img src="../../assets/ic_edit@3x.png" alt="location icon" class="edit-icon" @click="setListing">
    </router-link>
    <img src="../../assets/ic_delete@3x.png" alt="location icon" class="delete-icon" @click.prevent="setActiveModal">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditButton',
  computed: {
    ...mapState(['selectedHouseId', 'listing'])
  },
  methods: {
    setActiveModal() {
      this.$store.dispatch('setActiveModal', true)
    },
    setListing() {
      this.$store.dispatch('setListing', parseInt(this.$store.state.selectedHouseId));
    }
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