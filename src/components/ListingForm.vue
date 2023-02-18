<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form class="container" v-if="houseInfo">
    <div class="form-container">
      <div class="header-container">
        <back-button :backButtonImage="backButtonImage" />
        <div class="title-container">
          <h1>{{ title }}</h1>
        </div>
      </div>
      <div class="form-input-container">

        <!-- street name -->
        <label for="street-name" class="input-title">Street name*</label>
        <input type="text" name="streetName" placeholder="Enter the street name" v-model="houseInfo.streetName"
          :class="{ 'error': missingFields.includes('streetName') }">
        <span v-if="missingFields.includes('streetName')" class="error-message">Required field is missing.</span>
        <div class="house-info-container">

          <!-- house number -->
          <div class="house-info">
            <label for="house-number" class="input-title">House number*</label>
            <input type="number" name="houseNumber" placeholder="Enter house number" v-model="houseInfo.houseNumber"
              :class="{ 'error': missingFields.includes('houseNumber') }">
            <span v-if="missingFields.includes('houseNumber')" class="error-message">Required field is missing.</span>
          </div>

          <!-- additional -->
          <div class="house-info">
            <label for="postal-code" class="input-title">Additional (optional)</label>
            <input type="text" name="numberAddition" placeholder="e.g. A" v-model="houseInfo.numberAddition">
          </div>
        </div>

        <!-- zip -->
        <label for="postal-code" class="input-title">Postal code*</label>
        <input type="text" name="zip" placeholder="e.g. 1000 AA" v-model="houseInfo.zip"
          :class="{ 'error': missingFields.includes('zip') }">
        <span v-if="missingFields.includes('zip')" class="error-message">Required field is missing.</span>

        <!-- city -->
        <label for="city" class="input-title">City*</label>
        <input type="text" name="city" placeholder="e.g. Utrecht" v-model="houseInfo.city"
          :class="{ 'error': missingFields.includes('city') }">
        <span v-if="missingFields.includes('city')" class="error-message">Required field is missing.</span>

        <!-- upload picture -->
        <label for="upload-picture" class="input-title">Upload picture(PNG or JPG)*</label>
        <div class="upload-picture-container" :style="{
          border: displayImage !== '' || image !== plusImage ? 'none' : null
        }">
          <img :src="removeImageButton" alt="remove image button" @click="removeImage" :class="removeImageButtonStyle">
          <input type="file" class="upload-input" accept="image/jpeg, image/png" @change="uploadImage" ref="uploadInput"
            name="displayImage" :class="{ 'error': missingFields.includes('displayImage') }">
          <img v-show="uploadedImage === ''" :src="image" alt="image" :class="imageStyle" @click="triggerUploadInput">
          <img v-show="displayImage !== ''" :src="displayImage" alt="uploaded image" class="display-image"
            @click="triggerUploadInput">
        </div>
        <span v-if="missingFields.includes('displayImage')" class="error-message">Required field is missing.</span>

        <!-- price -->
        <div class="price-container">
          <label for="price" class="input-title">Price*</label>
          <input type="number" name="price" placeholder="e.g. €150.000" v-model="houseInfo.price"
            :class="{ 'error': missingFields.includes('price') }" class="price-input">
          <span v-if="missingFields.includes('price')" class="error-message">Required field is missing.</span>
        </div>
        <div class="house-size-garage-container">
          <div class="house-size">

            <!-- size -->
            <label for="size" class="input-title">Size*</label>
            <input type="number" name="size" placeholder="e.g. 60m2" v-model="houseInfo.size" class="size-input"
              :class="{ 'error': missingFields.includes('size') }">
            <span v-if="missingFields.includes('size')" class="error-message">Required field is missing.</span>
          </div>

          <!-- garage -->
          <div class="house-garage" style="position: relative;">
            <label for="garage" class="input-title">Garage*</label>
            <div class="arrows">
              <img src="../../assets/up-down-arrows.png" alt="up down arrows" class="up-down-arrows"
                @click="toggleGarage">
            </div>
            <input type="text" name="hasGarage" placeholder="Select" v-model="houseInfo.hasGarage"
              :class="{ 'error': missingFields.includes('hasGarage') }" class="garage" />
            <span v-if="missingFields.includes('hasGarage')" class="error-message">Field must be Yes or No</span>
          </div>
        </div>
        <div class="house-info-container">
          <div class="house-input">

            <!-- bedrooms -->
            <label for="bedrooms" class="input-title">Bedrooms*</label>
            <input type="number" name="bedrooms" placeholder="Enter amount" v-model="houseInfo.bedrooms"
              :class="{ 'error': missingFields.includes('bedrooms') }">
            <span v-if="missingFields.includes('bedrooms')" class="error-message">Required field is missing.</span>
          </div>
          <div class="house-input">

            <!-- bathrooms -->
            <label for="bathrooms" class="input-title">Bathrooms*</label>
            <input type="number" name="bathrooms" placeholder="Enter amount" v-model="houseInfo.bathrooms"
              :class="{ 'error': missingFields.includes('bathrooms') }">
            <span v-if="missingFields.includes('bathrooms')" class="error-message">Required field is missing.</span>
          </div>
        </div>

        <!-- construction date -->
        <label for="construction-date" class="input-title">Construction date*</label>
        <input type="number" name="constructionYear" placeholder="e.g. 1990" v-model="houseInfo.constructionYear"
          :class="{ 'error': missingFields.includes('constructionYear') }">
        <span v-if="missingFields.includes('constructionYear')" class="error-message">{{ constructionYearErrorMessage
        }}</span>

        <!-- description -->
        <label for="description" class="input-title">Description*</label>
        <textarea name="description" cols="30" rows="7" placeholder="Enter description" v-model="houseInfo.description"
          :class="{ 'error': missingFields.includes('description') }"></textarea>
        <span v-if="missingFields.includes('description')" class="error-message">Required field is missing.</span>

        <!-- submit button -->
        <div class="submit-button-container">
          <button class="submit-button" type="submit" @click="checkRequiredFields">{{ button }}</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import BackButton from '../components/BackButton.vue'
import { mapState } from 'vuex';

export default {
  name: 'ListingForm',
  components: {
    BackButton,
  },
  data() {
    return {
      plusImage: '../../assets/ic_upload@3x.png',
      displayImage: '',
      uploadedImage: '',
      isFieldRequired: false,
      missingFields: [],
      removeImageButton: '../../assets/ic_clear_white@3x.png',
      imageVisible: true,
      currencySymbol: false,
      constructionYearErrorMessage: ''
    }
  },
  props: [
    'title',
    'button',
    'houseInfo',
    'image',
    'backButtonImage'
  ],

  computed: {
    ...mapState(['houses', 'listing']),
    imageStyle() {
      return this.image === '../../assets/ic_upload@3x.png' ? 'plus' : 'display-image'
    },
    removeImageButtonStyle() {
      return this.uploadedImage ? 'remove-button' : 'no-remove-button';
    },
    imageToLocalStorage() {
      return JSON.stringify(this.image);
    }
  },

  methods: {
    // listing for clicks on the upload image element
    triggerUploadInput() {
      this.$refs.uploadInput.click();
    },
    //when remove image element is selected reset
    removeImage() {
      this.displayImage = '';
      this.$emit('update-image', '');
      this.uploadedImage = '';
    },
    //when an image is selected from the folder converting image file into file that can be passed to the api request and assign it to uploaded image. also assigning the image to display
    uploadImage(e) {
      const files = e.target.files
      const file = files[0];
      this.uploadedImage = file;

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.displayImage = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },

    // form validation
    // check if the required fields have been filled, if the garage is Yes or No and if the image selected is different from the previous one (in case is coming from the editForm component) or if it is filled (if it comes from the createForm component)
    // if passed, call submitForm function in the parent component
    checkRequiredFields(e) {
      e.preventDefault();
      this.missingFields = []
      const requiredFields = Object.entries(this.houseInfo);
      for (const [field, value] of requiredFields) {
        if (field === 'numberAddition') continue;
        if (!value) {
          this.missingFields.push(field);
        }
        if (field === 'hasGarage' && (value !== 'Yes' && value !== 'No')) {
          this.missingFields.push(field);
        }
        if (field === 'constructionYear') {
          if (!value) {
            this.constructionYearErrorMessage = 'Required field is missing.';
            this.missingFields.push(field);
          } else if (value <= 1900) {
            this.constructionYearErrorMessage = 'Year must be greater than 1900.';
            this.missingFields.push(field);
          }
        }
      }
      if (!this.displayImage && this.image !== this.listing.image) {
        this.missingFields.push('displayImage');
      }
      if (this.missingFields.length === 0) {
        this.$emit('submitForm', this.houseInfo, this.uploadedImage)
      }
    },

    toggleGarage() {
      this.$emit('toggleGarage')
    },

  },
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
  opacity: 0;
}


.house-info-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.house-size-garage-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 30px;
  position: relative;
}


.house-size {
  width: 50%;
}

.house-garage {
  width: 50%;
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

.remove-button {
  width: 30px;
  position: absolute;
  z-index: 10;
  top: 8px;
  right: -10px;
  cursor: pointer;
}

.no-remove-button {
  display: none;
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

.arrows {
  cursor: pointer;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 5px;
  top: 38px;
}

.up-down-arrows {
  opacity: 40%;
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
  font-size: var(--empty-message);
}

.error-message {
  font-style: italic;
  font-family: var(--ff-primary);
  font-size: var(--fs-input);
  font-weight: var(--fw-medium);
  color: var(--primary-color);
}

@media (max-width: 500px) {
  .form-container {
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header-container {
    width: 100%;
    display: flex;
    max-width: 90%;
  }

  .title-container {
    width: 100%;
    align-items: center;
    text-align: center;
    margin-right: 30px;
  }

  .arrow-image {
    margin-right: 0px;
  }

  h1 {
    margin: 0
  }

  .form-input-container {
    max-width: 90%;
  }

  .submit-button {
    width: 100%;
  }
}
</style>