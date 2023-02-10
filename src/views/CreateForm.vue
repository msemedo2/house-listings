<template>
  <listing-form :title="title" :button="button" :houseInfo="houseInfo" @submitForm="postHouse" :image="image"
    @update-image="updateImage" :backButtonImage="backButtonImage" />
</template>

<script>
import ListingForm from '../components/ListingForm.vue';
import axios from 'axios';
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
    // api post request to create new listing based on the information filled in the listingForm
    postHouse(updatedHouseInfo, uploadedImage) {
      const url = 'https://api.intern.d-tt.nl/api/houses';
      const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';
      const data = updatedHouseInfo;

      axios
        .post(url, data, {
          headers: {
            'X-Api-Key': API_KEY,
          },
        })
        .then((res) => {
          const id = res.data.id;
          this.$store.dispatch('addHouse', { ...updatedHouseInfo, id });
          this.postImage(id, uploadedImage)
        })
        .catch((err) => {
          console.log(err);
        });

    },

    // api post request to set the image on the created house, based on the id generated
    postImage(id, uploadedImage) {
      const imgUrl = `https://api.intern.d-tt.nl/api/houses/${id}/upload`;
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
          this.$router.push({ path: `/house/${id}` })
        })
    },
    updateImage() {
      this.image = '../../assets/ic_upload@3x.png'
    },
  }
}
</script>