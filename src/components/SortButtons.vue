<template>
  <div class="filter-container">
    <button class="price-button" :style="{ backgroundColor: buttonColors[0] }"
      @click="changeColor(0), setActiveSortButton(0)">
      Price
    </button>
    <button class="size-button" :style="{ backgroundColor: buttonColors[1] }"
      @click="changeColor(1), setActiveSortButton(1)">
      Size
    </button>
  </div>
</template>

<script>

export default {
  name: 'SortButtons',
  data() {
    return {
      buttonColors: ['var(--tertiary-color-dark)', 'var(--tertiary-color-dark)'],
    };
  },
  methods: {
    // buttons start gray and if clicked turn orange, from then when grey button is clicked colors are reversed
    changeColor(index) {
      if (this.buttonColors) {
        this.buttonColors[index] = 'var(--primary-color)'
      }
      const newButtonColors = ['var(--tertiary-color-dark)', 'var(--tertiary-color-dark)'];
      newButtonColors[index] = 'var(--primary-color)';
      this.buttonColors = newButtonColors;
    },

    //send the index of the button clicked to be saved in the store global state
    setActiveSortButton(index) {
      this.$store.dispatch('setActivateSortButton', index);
    },
  },
};
</script>

<style scoped>
.filter-container {
  width: 40%;
  display: flex;
  justify-content: flex-end;
}

.options-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.price-button,
.size-button {
  height: 100%;
  width: 50%;
  max-width: 35%;
  min-width: 98px;
}

.price-button {
  border-radius: 8px 0 0 8px;
}

.size-button {
  border-radius: 0 10px 10px 0;
}

@media (max-width: 500px) {
  .filter-container {
    width: 100%;
    margin-top: 20px;
  }

  .price-button,
  .size-button {
    height: 35px;
    width: 50%;
    max-width: 100%;
    min-width: 0;
  }
}
</style>
