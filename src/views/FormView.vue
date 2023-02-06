<template>
  <form type="submit" class="container">
    <div class="form-container">
      <router-link class="go-back-container" :to="{ name: 'home' }"><img class="arrow-image"
          src="../../assets/ic_back_grey@3x.png" alt="back arrow">Back to overview</router-link>
      <h1>Create new listing</h1>
      <div class="form-input-container">
        <label for="street-name" class="input-title">Street name*</label>
        <input type="text" placeholder="Enter the street name">
        <div class="house-info-container">
          <div class="house-info">
            <label for="house-number" class="input-title">House number*</label>
            <input type="text" placeholder="Enter house number">
          </div>
          <div class="house-info">
            <label for="postal-code" class="input-title">Additional (optional)</label>
            <input type="text" placeholder="e.g. A">
          </div>
        </div>
        <label for="postal-code" class="input-title">Postal code*</label>
        <input type="text" placeholder="e.g. 1000 AA">
        <label for="city" class="input-title">City*</label>
        <input type="text" placeholder="e.g. Utrecht">
        <!-- upload picture -->
        <label for="upload-picture" class="input-title">Upload picture(PNG or JPG)*</label>
        <div class="upload-picture-container" :style="{ border: uploadedImage !== '' ? 'none' : null }">
          <input type="file" class="upload-input" accept="image/jpeg, image/png" @change="uploadImage"
            ref="uploadInput">
          <img v-show="uploadedImage === ''" :src="plusImage" alt="plus" class="plus" @click="triggerUploadInput">
          <img v-show="uploadedImage !== ''" :src="uploadedImage" alt="uploaded image" class="upload-image"
            @click="triggerUploadInput">
        </div>
        <label for="price" class="input-title">Price*</label>
        <input type="text" placeholder="e.g. €150.000">
        <div class="house-info-container">
          <div class="house-input">
            <label for="size" class="input-title">Size*</label>
            <input type="text" placeholder="e.g. 60m2">
          </div>
          <div class="house-input">
            <label for="garage" class="input-title">Garage*</label>
            <input type="text" placeholder="Select">
          </div>
        </div>
        <div class="house-info-container">
          <div class="house-input">
            <label for="bedrooms" class="input-title">Bedrooms*</label>
            <input type="text" placeholder="Enter amount">
          </div>
          <div class="house-input">
            <label for="bathrooms" class="input-title">Bathrooms*</label>
            <input type="text" placeholder="Enter amount">
          </div>
        </div>
        <label for="construction-date" class="input-title">Construction date*</label>
        <input type="text" placeholder="e.g. 1990">
        <label for="description" class="input-title">Description*</label>
        <textarea name="description" cols="30" rows="7" placeholder="Enter description"></textarea>
        <div class="submit-button-container">
          <button class="submit-button">Post</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormView',
  data() {
    return {
      plusImage: '../../assets/ic_upload@3x.png',
      uploadedImage: '',
    }
  },
  methods: {
    triggerUploadInput() {
      this.$refs.uploadInput.click();
    },
    uploadImage(e) {
      // it will only upload image if file chosen
      if (e.target.files.length !== 0) {
        this.uploadedImage = URL.createObjectURL(e.target.files[0]);
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('../../assets/img_background@3x.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin: 0;
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

input[type="text"] {
  background-color: var(--bg-color-light);
  height: 45px;
  border-radius: 5px;
  margin-bottom: 10px;
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
.upload-image {
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
</style>