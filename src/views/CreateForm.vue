<template>
  <listing-form :title="title" :button="button" :houseInfo="houseInfo" @submitForm="postHouse" :image="image"
  @update-image="updateImage" :backButtonImage="backButtonImage" @toggleGarage="toggleGarage" />
</template>

<script>
import ListingForm from '../components/ListingForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'CreateForm',
  components: {
    ListingForm,
  },

  data() {
    return {
      title: 'Create new listing',
      button: 'Post',
      houseInfo: {
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        constructionYear: '',
        hasGarage: '',
        description: '',
      },
      image: '../../assets/ic_upload@3x.png',
      backButtonImage: '../../assets/ic_back_grey@3x.png'
    }
  },
  computed: {
    ...mapState(['listing'])
  },
  methods: {
    postHouse(updatedHouseInfo, uploadedImage) {
      this.$store.dispatch('postHouse', { updatedHouseInfo, uploadedImage });
    },

    updateImage() {
      this.image = '../../assets/ic_upload@3x.png'
    },

    toggleGarage() {
      this.houseInfo.hasGarage = this.houseInfo.hasGarage === 'Yes' ? 'No' : 'Yes'
    },
  }
}
</script>