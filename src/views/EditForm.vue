<template>
  <listing-form :title="title" :button="button" :houseInfo="houseInfo" @submitForm="editHouse" :image="image"
    @update-image="updateImage" :backButtonImage="backButtonImage" @toggleGarage="toggleGarage" />
</template>

<script>
import ListingForm from '../components/ListingForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'EditForm',
  components: {
    ListingForm,
  },
  computed: {
    ...mapState(['listing', 'selectedHouseId', 'houses']),
  },
  data() {
    return {
      title: 'Edit listing',
      button: 'Save',
      houseInfo: {},
      image: '',
      backButtonImage: '../../assets/ic_back_grey@3x.png'
    }
  },
  // based on the house id in store, format the information that is passed as props to populate the listingForm component
  mounted() {
    if (this.selectedHouseId) {
      this.formatListing();
    }
  },
  created() {
    this.formatListing();
  },
  // reenforce the formatting if there is a change in the id
  watch: {
    listing() {
      if (this.selectedHouseId) {
        this.formatListing();
      }
    },
  },
  methods: {
    formatListing() {
      // separate the value saved in store listing.location.street, into streetName and houseNumber
      const street = this.listing.location.street;
      const streetParts = street.split(' ');
      const houseAndAdditionalNumber = streetParts.pop();
      const streetName = streetParts.join(' ');
      //separate the letters at the end from the numbers
      const houseNumber = parseInt(houseAndAdditionalNumber.match(/\d+/g));
      const numberAddition = houseAndAdditionalNumber.match(/[a-zA-Z]+/g)?.join('');

      this.houseInfo = {
        constructionYear: this.listing.constructionYear,
        description: this.listing.description,
        hasGarage: this.listing.hasGarage === true ? 'Yes' : 'No',
        city: this.listing.location.city,
        numberAddition,
        streetName,
        houseNumber,
        zip: this.listing.location.zip,
        price: this.listing.price,
        bedrooms: this.listing.rooms.bedrooms,
        bathrooms: this.listing.rooms.bathrooms,
        size: this.listing.size,
      }

      this.image = this.listing.image
    },

    // api post request to edit the information of the listing
    editHouse(updatedHouseInfo, uploadedImage) {
      this.$store.dispatch('editHouse', { updatedHouseInfo, uploadedImage });
    },

    updateImage() {
      this.image = '../../assets/ic_upload@3x.png'
    },

    toggleGarage() {
      this.houseInfo.hasGarage = this.houseInfo.hasGarage === 'Yes' ? 'No' : 'Yes'
    }
  },
}

</script>