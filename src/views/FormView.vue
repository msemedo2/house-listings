<template>
  <form @submit="postData" class="container">
    <div class="form-container">
      <back-button />
      <h1>Create new listing</h1>
      <div class="form-input-container">

        <!-- Street Name -->
        <label for="street-name" class="input-title">Street name*</label>
        <input type="text" name="streetName" placeholder="Enter the street name" v-model="listing.streetName"
          :class="{ 'error': isFieldRequired }">
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
        <div class="house-info-container">

          <!-- House Number -->
          <div class="house-info">
            <label for="house-number" class="input-title">House number*</label>
            <input type="text" name="houseNumber" placeholder="Enter house number" v-model="listing.houseNumber"
              :class="{ 'error': isFieldRequired }">
            <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
          </div>

          <!-- Additional -->
          <div class="house-info">
            <label for="postal-code" class="input-title">Additional (optional)</label>
            <input type="text" name="numberAddition" placeholder="e.g. A" v-model="listing.numberAddition">
          </div>
        </div>

        <!-- Zip -->
        <label for="postal-code" class="input-title">Postal code*</label>
        <input type="text" name="zip" placeholder="e.g. 1000 AA" v-model="listing.zip"
          :class="{ 'error': isFieldRequired }">
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>

        <!-- City -->
        <label for="city" class="input-title">City*</label>
        <input type="text" name="city" placeholder="e.g. Utrecht" v-model="listing.city"
          :class="{ 'error': isFieldRequired }">
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>

        <!-- Upload Picture -->
        <label for="upload-picture" class="input-title">Upload picture(PNG or JPG)*</label>
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
        <div class="upload-picture-container" :style="{ border: displayImage !== '' ? 'none' : null }">
          <input type="file" class="upload-input" accept="image/jpeg, image/png" @change="uploadImage" ref="uploadInput"
            :class="{ 'error': isFieldRequired }">
          <img v-show="uploadedImage === ''" :src="plusImage" alt="plus" class="plus" @click="triggerUploadInput">
          <img v-show="displayImage !== ''" :src="displayImage" alt="uploaded image" class="display-image"
            @click="triggerUploadInput">
        </div>

        <!-- Price -->
        <label for="price" class="input-title">Price*</label>
        <input type="text" name="price" placeholder="e.g. €150.000" v-model="listing.price"
          :class="{ 'error': isFieldRequired }">
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
        <div class="house-info-container">
          <div class="house-input">

            <!-- Size -->
            <label for="size" class="input-title">Size*</label>
            <input type="text" name="size" placeholder="e.g. 60m2" v-model="listing.size"
              :class="{ 'error': isFieldRequired }">
            <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
          </div>

          <!-- Garage -->
          <div class="house-input">
            <label for="garage" class="input-title">Garage*</label>
            <input type="number" name="hasGarage" placeholder="Select" min="0" max="1" v-model="listing.hasGarage"
              :class="{ 'error': isFieldRequired }">
            <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
          </div>
        </div>
        <div class="house-info-container">
          <div class="house-input">

            <!-- Bedrooms -->
            <label for="bedrooms" class="input-title">Bedrooms*</label>
            <input type="text" name="bedrooms" placeholder="Enter amount" v-model="listing.bedrooms"
              :class="{ 'error': isFieldRequired }">
            <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
          </div>
          <div class="house-input">

            <!-- Bathrooms -->
            <label for="bathrooms" class="input-title">Bathrooms*</label>
            <input type="text" name="bathrooms" placeholder="Enter amount" v-model="listing.bathrooms"
              :class="{ 'error': isFieldRequired }">
            <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>
          </div>
        </div>

        <!-- Construction Date -->
        <label for="construction-date" class="input-title">Construction date*</label>
        <input type="text" name="constructionYear" placeholder="e.g. 1990" v-model="listing.constructionYear"
          :class="{ 'error': isFieldRequired }">
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>

        <!-- Description -->
        <label for="description" class="input-title">Description*</label>
        <textarea name="description" cols="30" rows="7" placeholder="Enter description" v-model="listing.description"
          :class="{ 'error': isFieldRequired }"></textarea>
        <span v-if="isFieldRequired" class="error-message">Required field is missing.</span>

        <!-- Submit Button -->
        <div class="submit-button-container">
          <button class="submit-button" type="submit" @click="checkRequiredFields">Post</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BackButton from '../components/BackButton.vue'
import { mapState } from 'vuex';
import axios from 'axios';

export default {

  name: 'FormView',
  data() {
    return {
      plusImage: '../../assets/ic_upload@3x.png',
      displayImage: '',
      uploadedImage: '',
      listing: {
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
      isFieldRequired: false,
    }
  },
  components: {
    BackButton,
  },
  computed: {
    ...mapState(['houses'])
  },
  methods: {
    triggerUploadInput() {
      this.$refs.uploadInput.click();
    },

    //Convert image file into file that can be read and assign it to uploaded image
    uploadImage(e) {
      const files = e.target.files
      const file = files[0];
      this.uploadedImage = file;
      console.log(this.uploadedImage)

      // const files = e.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.displayImage = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },

    checkRequiredFields(e) {
      e.preventDefault();
      const requiredFields = Object.entries(this.listing);
      for (const [field, value] of requiredFields) {
        if (field === 'numberAddition') continue;
        if (!value && field !== 'hasGarage') {
          this.isFieldRequired = true;
          return;
        }
        if (field === 'hasGarage' && (value !== 0 && value !== 1)) {
          console.error(`The ${field} field must be 0 or 1`);
          return;
        }
        if (!this.displayImage) {
          console.error(`The displayImage field is required`);
          return;
        }
      }
      this.postHouse()
    },

    postImage(id) {
      const imgUrl = `https://api.intern.d-tt.nl/api/houses/${id}/upload`;
      const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';

      const formData = new FormData();
      formData.append("image", this.uploadedImage);

      axios
        .post(imgUrl, formData, {
          headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => {
          console.log(this.houses)
          console.log(res.data)
          this.$store.dispatch('fetchHouses')
          this.$router.push({ path: `/house/${id}` })
        })
    },
    postHouse() {
      const url = 'https://api.intern.d-tt.nl/api/houses';
      const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';
      const data = this.listing;

      axios
        .post(url, data, {
          headers: {
            'X-Api-Key': API_KEY,
          },
        })
        .then((res) => {
          const id = res.data.id;
          this.houses = [...this.houses]
          this.postImage(id)


        })
        .catch((err) => {
          console.log(err);
        });

    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('../../assets/img_background@3x.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.form-container {
  margin: 0 auto;
  height: 100vh;
  max-width: 1400px;
  padding: 80px 0;
  width: 90%;
  font-family: var(--ff-primary);
  font-weight: var(--fw-semibold);
  font-size: 16px;
}

.arrow-image {
  width: 20px;
  margin-right: 20px;
  position: relative;
  top: 3px;
}

h1 {
  margin-top: 20px;
}

.form-input-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-top: 30px;
  gap: 5px;
}

.input-title {
  font-size: var(--fs-input);
}

input {
  width: 100%;
  padding-left: 15px;
}

input[type="text"],
input[type="number"] {
  background-color: var(--bg-color-light);
  height: 45px;
  border-radius: 5px;
  margin-bottom: 10px;
}

input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

.house-info-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.house-info {
  width: 50%;
}

.upload-picture-container {
  border: 1px dashed var(--secondary-color);
  width: 110px;
  position: relative;
  margin-bottom: 10px;
}

.plus {
  width: 30px;

}

.upload-image {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin: 0;
}

.plus,
.display-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.upload-input {
  height: 100px;
  width: 100%;
  cursor: pointer;
  opacity: 0;
}

::-webkit-file-upload-button {
  cursor: pointer;
}

textarea {
  background-color: var(--bg-color-light);
  padding: 15px 15px 0 15px;
  resize: none;
  border-radius: 5px;
}

.submit-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.submit-button {
  width: 150px;
  font-size: var(--fs-buttons);
  font-weight: var(--fw-bold);
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 8px;
  padding: 8px 20px;
  text-transform: uppercase;
}

.error {
  border: 1px solid var(--primary-color);
}

.error::placeholder {
  color: var(--primary-color);
}

.error-message {
  font-style: italic;
  font-size: var(--fs-input);
  font-weight: var(--fw-medium);
  color: var(--primary-color);
}
</style>


