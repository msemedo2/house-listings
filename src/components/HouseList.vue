<template>
  <div class="house-listings-container">
    <div v-for="{ id, image, location, price, rooms, size } in sortedHouses" :key="id" class="house-container">
      <div class="house-image-container">
        <img :src=image class="house-img" alt="House">
      </div>
      <div class="house-location-container">
        <h2>{{ location.street }}</h2>
        <p>€ {{ separateWithDot(price) }}</p>
        <p class="city">{{ location.zip }} {{ location.city }}</p>
        <div class="house-info-container">
          <img class="info-icon" src="../../assets/ic_bed@3x.png" alt="bed">
          <p>{{ rooms.bedrooms }}</p>
          <img class="info-icon" src="../../assets/ic_bath@3x.png" alt="bed">
          <p>{{ rooms.bathrooms }}</p>
          <img class="info-icon" src="../../assets/ic_size@3x.png" alt="bed">
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
    ...mapState(['houses', 'searchValue', 'activeSortButton']),

    //filter houses based on all the possible inputs (title, price, postal code, size, city)
    filteredHouses() {
      return this.houses.filter(house => {
        return (
          house.location.street.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          house.location.zip.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          house.location.city.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          house.price.toString().toLowerCase().includes(this.searchValue.toLowerCase()) ||
          house.size.toString().toLowerCase().includes(this.searchValue.toLowerCase())
        );
      });
    },
    sortedHouses() {
      const filteredHouses = this.filteredHouses;
      if (this.activeSortButton === 0) {
        return filteredHouses.sort((a, b) => a.price - b.price);
      } else if (this.activeSortButton === 1) {
        return filteredHouses.sort((a, b) => a.size - b.size);
      }
      return filteredHouses;
    }
  },
  methods: {
    // Add dot separation on thousands for price
    separateWithDot(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
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
