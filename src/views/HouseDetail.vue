<template>
  <div class="house-detail-container">
    <back-button :backButtonImage="backButtonImage" />
    <div class="selected-house-container">
      <div class="image-container">
        <img :src="selectedHouse.image" alt="house image" class="image">
      </div>
      <div class="house-info-container">
        <div class="header-container">
          <div class="header">
            <h2>{{ selectedHouse.location?.street || listing.streetName }}</h2>
            <div class="favorites-container" :class="{ 'favorite-primary': isHouseInFavorites(selectedHouseId) }">
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
          <div>
            <!-- edit / delete button -->
            <edit-button :deleteButton="deleteButton" :editButton="editButton" />
          </div>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_location@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.location?.zip || listing.zip }}</p>
          <p class="listing-text">{{ selectedHouse.location?.city || listing.city }}</p>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_price@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.price }}</p>
          <img src="../../assets/ic_size@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.size }} m2</p>
          <img src="../../assets/ic_construction_date@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.constructionYear }}</p>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_bed@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.rooms?.bedrooms || listing.bedrooms }}</p>
          <img src="../../assets/ic_bath@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.rooms?.bathrooms || listing.bathrooms }}</p>
          <img src="../../assets/ic_garage@3x.png" alt="location icon" class="icon">
          <p class="listing-text">{{ selectedHouse.hasGarage ? 'Yes' : 'No' }}</p>
        </div>
        <p class="description">{{ selectedHouse.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import EditButton from '../components/EditButton.vue';
import { mapState } from 'vuex'
export default {
  name: 'HouseDetail',
  components: {
    BackButton,
    EditButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      garage: 0,
      backButtonImage: '',
      editButton: '',
      deleteButton: '',
    }
  },
  computed: {
    ...mapState(['houses', 'listing', 'favoriteHouses', 'selectedHouseId']),
    selectedHouse() {
      return this.houses.find(house => house.id === parseInt(this.id));
    },
  },
  methods: {
    setSelectedHouseId() {
      this.$store.dispatch('setSelectedHouseId', this.id)
    },
    setListing() {
      this.$store.dispatch('setListing', parseInt(this.$store.state.selectedHouseId));
    },
    // passing backButtonImage as props depending on the screen size
    checkScreenSize() {
      if (window.innerWidth < 501) {
        this.backButtonImage = '../../assets/ic_back_white@3x.png'
        this.editButton = '../../assets/ic_edit_white@3x.png'
        this.deleteButton = '../../assets/ic_delete_white@3x.png'
      } else {
        this.backButtonImage = '../../assets/ic_back_grey@3x.png'
        this.editButton = '../../assets/ic_edit@3x.png'
        this.deleteButton = '../../assets/ic_delete@3x.png'
      }
    },
    //check if house in favorites, display icon accordingly
    isHouseInFavorites() {
      return this.favoriteHouses.some(
        (favoriteHouse) => favoriteHouse.id === parseInt(this.selectedHouseId)
      );
    },
  },

  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)

    this.setSelectedHouseId()
    this.setListing()
    this.isHouseInFavorites();
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
}

.header {
  display: flex;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.image {
  width: 100%;
  height: auto;
}

.house-detail-container {
  margin: 0 auto;
  height: 100vh;
  max-width: 1400px;
  padding: 80px 0;
  width: 90%;
  font-family: var(--ff-primary);
  font-size: 16px;
}

.listing-text {
  font-weight: var(--fw-bold);
}

.selected-house-container {
  margin-top: 25px;
}

.house-info-container {
  background-color: var(--bg-color-light);
  padding: 30px;
  margin-top: -10px;
  max-width: 100%;
}

.house-info {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  align-items: baseline;
  gap: 10px;
}

.icon {
  max-width: 15px;
}

.description {
  margin-top: 20px;
  line-height: 1.7;
}

.favorites-container {
  font-size: var(--fs-header2);
  margin-left: 15px;
}

.favorites-container {
  color: var(--secondary-color);
}

.favorites-container.favorite-primary {
  color: var(--primary-color);
}

@media (max-width: 500px) {
  .go-back-container {
    position: absolute;
    top: 50px;
    left: 25px;
  }

  .house-detail-container {
    width: 100%;
    padding: 0;
    top: 0;
    position: relative;
    top: -25px;
    overflow: hidden
  }

  .house-info-container {
    position: relative;
    z-index: 10;
    padding: 30px 15px 15px;
    top: -50px;
    border-radius: 20px 20px 0 0;
  }
}
</style>