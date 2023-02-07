<template>
  <div class="house-detail-container">
    <back-button />
    <div class="selected-house-container">
      <img :src="selectedHouse.image" alt="house image">
      <div class="house-info-container">
        <div class="header-container">
          <h2>{{ selectedHouse.location.street }}</h2>
          <div>
            <!-- Edit / Delete Button -->
            <edit-button :id="id" />
          </div>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_location@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.location.zip }}</p>
          <p>{{ selectedHouse.location.city }}</p>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_price@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.price }}</p>
          <img src="../../assets/ic_size@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.size }} m2</p>
          <img src="../../assets/ic_construction_date@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.constructionYear }}</p>
        </div>
        <div class="house-info">
          <img src="../../assets/ic_bed@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.rooms.bedrooms }}</p>
          <img src="../../assets/ic_bath@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.rooms.bathrooms }}</p>
          <img src="../../assets/ic_garage@3x.png" alt="location icon" class="icon">
          <p>{{ selectedHouse.hasGarage ? 'Yes' : 'No' }}</p>
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
      garage: 0
    }
  },
  computed: {
    ...mapState(['houses']),
    selectedHouse() {
      return this.houses.find(house => house.id === parseInt(this.id));
    },
  },
  methods: {
    setSelectedHouseId() {
      this.$store.dispatch('setSelectedHouseId', this.id)
    }
  },
  mounted() {
    this.setSelectedHouseId()
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
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

.selected-house-container {
  margin-top: 25px;
}

.house-info-container {
  background-color: var(--bg-color-light);
  padding: 30px;
  margin-top: -10px;
  width: 100%;
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
</style>