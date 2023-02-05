<template>
  <div class="house-listings-container">
    <div v-for="{ id, image, location, price, rooms, size } in houses" :key="id" class="house-container">
      <div class="house-image-container">
        <img :src=image class="house-img" alt="House">
      </div>
      <div class="house-location-container">
        <h2>{{ location.street }}</h2>
        <p>€ {{ separateWithDot(price) }}</p>
        <p class="city">{{ location.zip }} {{ location.city }}</p>
        <div class="house-info-container">
          <img class="info-icon" src="../../public/assets/ic_bed@3x.png" alt="bed">
          <p>{{ rooms.bedrooms }}</p>
          <img class="info-icon" src="../../public/assets/ic_bath@3x.png" alt="bed">
          <p>{{ rooms.bathrooms }}</p>
          <img class="info-icon" src="../../public/assets/ic_size@3x.png" alt="bed">
          <p>{{ size }} m2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HouseList',
  computed: {
    ...mapState(['houses'])
  },
  methods: {
    // Add dot separation on thousands for price
    separateWithDot(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  },
  mounted() {
    this.$store.dispatch('fetchHouses')
  },

};
</script>

<style scoped>
.house-listings-container {
  margin-top: 30px;
}

.house-container {
  background-color: var(--bg-color-light);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  gap: 20px;
}

.house-image-container {
  width: 150px;
  overflow: hidden;
  border-radius: 10px;
}

.house-img {
  width: 200px;
  object-fit: cover;
  height: 100%;
}

.house-location-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

h2 {
  margin-top: 5px;
}

.city {
  color: var(--tertiary-color-dark);
}

.house-info-container {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  color: var(--secondary-color);
}

.info-icon {
  max-width: 25px;
  height: 80%;
}
</style>