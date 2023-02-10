<template>
  <div v-show="activeModal === true" class="modal-container">
    <div class="modal">
      <h2>Delete Listing</h2>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone.</p>
      <button class="delete-button" @click="deleteListing">Yes, Delete</button>
      <button class="back-button" @click="closeModal">Go Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: {
    name: 'DeleteModal',
  },
  data() {
    return {
      activeModal: false,
    }
  },
  watch: {
    '$store.state.activeModal': function (newValue) {
      this.activeModal = newValue
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('setActiveModal', false)
    },
    deleteListing() {
      this.$store.dispatch('deleteListing')
      this.$store.dispatch('setActiveModal', false)

      this.$router.push({ path: '/' })
    }
  },

}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}

.modal {
  max-width: 580px;
  width: 90%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow-y: auto;
}

h2 {
  margin-bottom: 20px;
}

p+p {
  font-family: var(--ff-secondary);
  margin-bottom: 35px;
}

button {
  width: 60%;
  border-radius: 10px;
  text-transform: upperCase;
  font-weight: var(--fw-regular);
  padding: 10px;
}

.delete-button {
  background-color: var(--primary-color);
  margin-bottom: 20px;
}

.back-button {
  background-color: var(--secondary-color);
  font-weight: var(--fw-semibold)
}
</style>