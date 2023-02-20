<template>
  <div class="house-listings-container">
    <!-- show number of search result matching -->
    <h2 v-show="sortedHouses.length < houses.length && sortedHouses.length !== 0" class="houses-found">{{
      sortedHouses.length
    }} houses found</h2>
    <!-- loop through sortedHouses array to display the house listings -->
    <router-link :to="{ path: `/house/${id}` }" @click="setListing(id)"
      v-for="{ id, image, location, price, rooms, size, madeByMe } in sortedHouses" :key="id" class="house-container">
      <div class="house-image-container">
        <img :src=image class="house-img" alt="House">
      </div>
      <div class="house-location-container">
        <div class="house-header-container">
          <h2>{{ location.street }}</h2>
          <!-- Check if house was made by the user and only render edit and delete button if true -->
          <div v-show="!madeByMe === false" class="buttons-container">
            <router-link :to="{ path: `/edit-listing/${id}` }">
              <img src="../../assets/ic_edit@3x.png" alt="location icon" class="edit-icon">
            </router-link>
            <img src="../../assets/ic_delete@3x.png" alt="location icon" class="delete-icon "
              @click.prevent="setActiveModal(id), setSelectedHouseId(id)">
          </div>
        </div>
        <p class="price-text">€ {{ separateWithDot(price) }}</p>
        <p class="city">{{ location.zip }} {{ location.city }}</p>
        <div class="house-info-container">
          <div class="house-footer">
            <img class="info-icon" src="../../assets/ic_bed@3x.png" alt="bed">
            <p>{{ rooms.bedrooms }}</p>
            <img class="info-icon" src="../../assets/ic_bath@3x.png" alt="bed">
            <p>{{ rooms.bathrooms }}</p>
            <img class="info-icon" src="../../assets/ic_size@3x.png" alt="bed">
            <p>{{ size }} m2</p>
          </div>
          <!-- favorites icons -->
          <div class="favorites-container" @click.prevent="addHouseToFavorites(id)"
            :class="{ 'favorite-primary': isHouseInFavorites(id) }">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </router-link>
    <!-- show no results image/message if there are no matches -->
    <div v-show="sortedHouses.length === 0 && searchValue.length > 0" class="no-results-container">
      <img src="../../assets/img_empty_houses@3x.png" alt="house" class="no-results-image">
      <p>No results found.<br>Please try another keyword.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HouseList',
  data() {
    return {
      favoriteHouseIds: [],
    };
  },
  computed: {
    ...mapState(['houses', 'searchValue', 'activeSortButton', 'selectedHouseId', 'favoriteHouses']),

    // filter houses based on all the possible inputs (title, price, postal code, size, city)
    // use the searchValue saved in store
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

    // sort house array based on the button clicked(price/size/favorites/reset)
    // use the activeSortButton saved in store
    sortedHouses() {
      const filteredHouses = this.filteredHouses;
      if (this.activeSortButton === 0) {
        return filteredHouses.sort((a, b) => a.price - b.price);
      } else if (this.activeSortButton === 1) {
        return filteredHouses.sort((a, b) => a.size - b.size);
      } else if (this.activeSortButton === 2) {
        return filteredHouses.filter(house => this.favoriteHouses.some(favorite => favorite.id === house.id));
      } else if (this.activeSortButton === 3) {
        return filteredHouses.sort((a, b) => this.houses.indexOf(a) - this.houses.indexOf(b));
      }
      return filteredHouses;
    },
  },
  methods: {
    // add dot separation on thousands for price
    separateWithDot(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    // if delete button is clicked save id in vuex store
    setSelectedHouseId(id) {
      this.$store.dispatch('setSelectedHouseId', id)
    },

    // activate delete modal when delete button clicked
    setActiveModal() {
      this.$store.dispatch('setActiveModal', true)
    },

    // if house selected save its id and listing information in vuex store
    setListing(id) {
      this.setSelectedHouseId(id)
      this.$store.dispatch("setListing", this.$store.state.selectedHouseId);
    },

    // set house as favorite and save it in vuex store
    addHouseToFavorites(id) {
      this.setSelectedHouseId(id);

      // check if house is already in favorites and add/remove from favorites accordingly
      const houseAlreadyInFavorites = this.$store.state.favoriteHouses.find(favoriteHouse => favoriteHouse.id === this.selectedHouseId);
      if (houseAlreadyInFavorites) {
        this.$store.dispatch('removeHouseFromFavorites', this.$store.state.selectedHouseId)
      } else {
        this.$store.dispatch('addHouseToFavorites', this.$store.state.selectedHouseId)
        this.favoriteHouseIds.push(this.selectedHouseId);
      }
    },
    // check if house is already in favorites and change the icon color accordingly
    isHouseInFavorites(id) {
      return this.favoriteHouses.some(
        (favoriteHouse) => favoriteHouse.id === id
      );
    },
  }
};
</script>

<style scoped>
.house-listings-container {
  margin-top: 30px;
}

.houses-found {
  margin-bottom: 20px;
}

.house-container {
  max-width: 1400px;
  background-color: var(--bg-color-light);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.house-header-container {
  display: flex;
  justify-content: space-between;
}

.delete-icon,
.edit-icon {
  width: 15px;
  margin: 10px 15px 0 0;
  cursor: pointer;
}

h2 {
  margin-top: 5px;
}

.price-text {
  font-weight: var(--fw-semibold)
}

.city {
  color: var(--tertiary-color-dark);
}

.house-info-container {
  display: flex;
  justify-content: space-between;
}

.house-footer {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  color: var(--secondary-color);
}

.favorites-container {
  margin-right: 15px;
  color: var(--secondary-color);
}

.favorites-container.favorite-primary {
  color: var(--primary-color);
}

.info-icon {
  max-width: 25px;
  height: 80%;
}

.no-results-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
}

.no-results-image {
  width: 300px;
  margin-bottom: 30px;
}

@media (max-width: 500px) {
  .house-listings-container {
    margin-bottom: 50px;
  }

  .delete-icon,
  .edit-icon {
    margin: 5px 6px 0 0;
  }

  .favorites-container {
    margin-right: 6px;
  }
}
</style>
