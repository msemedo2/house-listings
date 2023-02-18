<template><!-- only show edit and delete button on houseDetail page if created by me -->
  <div v-show="listing.madeByMe === true" class="buttons-container">
    <router-link :to="{ path: `/edit-listing/${selectedHouseId}` }">
      <img :src="editButton" alt="location icon" class="edit-icon" @click="setListing">
    </router-link>
    <img :src="deleteButton" alt="location icon" class="delete-icon" @click.prevent="setActiveModal">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditButton',
  props: ['deleteButton', 'editButton'],
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

@media (max-width: 500px) {
  .buttons-container {
    position: fixed;
    top: 25px;
    right: 25px;
  }

  .delete-icon,
  .edit-icon {
    z-index: 12;
    top: -275px;
    right: 20px;
  }

  .delete-icon {
    width: 15px;
  }
}
</style>