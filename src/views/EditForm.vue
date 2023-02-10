<template>
  <listing-form :title="title" :button="button" :houseInfo="houseInfo" @submitForm="editHouse" :image="image"
    @update-image="updateImage" :backButtonImage="backButtonImage" />
</template>

<script>
import ListingForm from '../components/ListingForm.vue';
import axios from 'axios';
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
      // separate the value saved in store listing.location.street, into streeName and houseNumber
      const street = this.listing.location.street;
      const streetParts = street.split(" ");
      const houseNumber = parseInt(streetParts.pop());
      const streetName = streetParts.join(" ");

      // convert hasGarage to 1 or two depending on the value
      let hasGarage = 0
      this.listing.hasGarage === true ? hasGarage === 1 : hasGarage === 0

      this.houseInfo = {
        constructionYear: this.listing.constructionYear,
        description: this.listing.description,
        hasGarage,
        city: this.listing.location.city,
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
      const url = `https://api.intern.d-tt.nl/api/houses/${this.selectedHouseId}`;
      const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';
      const data = updatedHouseInfo;

      axios
        .post(url, data, {
          headers: {
            'X-Api-Key': API_KEY,
          },
        })
        .then(() => {
          this.$store.dispatch('addHouse', { ...updatedHouseInfo });
          this.postImage(uploadedImage)
        })
        .catch((err) => {
          console.log(err);
        });

    },

    // api post request to update the image of the respective house
    postImage(uploadedImage) {
      const imgUrl = `https://api.intern.d-tt.nl/api/houses/${this.selectedHouseId}/upload`;
      const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';

      const formData = new FormData();
      formData.append("image", uploadedImage);

      axios
        .post(imgUrl, formData, {
          headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
          this.$store.dispatch('fetchHouses')
          this.$router.push({ path: `/house/${this.selectedHouseId}` })
        })
    },
    updateImage() {
      this.image = '../../assets/ic_upload@3x.png'
    }
  },
}

</script>