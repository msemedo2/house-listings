<template>
  <div class="filter-container">
    <div class="price-size-container">
      <button class="btn price-button" :style="{ backgroundColor: buttonColors[0] }"
        @click="changeColor(0), setActiveSortButton(0)">
        Price
      </button>
      <button class="btn size-button" :style="{ backgroundColor: buttonColors[1] }"
        @click="changeColor(1), setActiveSortButton(1)">
        Size
      </button>
    </div>
    <div class="favorites-reset-container">
      <button class="btn favorites-button" :style="{ backgroundColor: buttonColors[2] }"
        @click="changeColor(2), setActiveSortButton(2)">
        Favorites
      </button>
      <button class="btn reset-button" :style="{ backgroundColor: buttonColors[3] }"
        @click="changeColor(3), setActiveSortButton(3)">
        Reset
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SortButtons',
  data() {
    return {
      buttonColors: ['var(--tertiary-color-dark)', 'var(--tertiary-color-dark)', 'var(--tertiary-color-dark)', 'var(--tertiary-color-dark)'],
    };
  },
  methods: {
    // active button color set to primary
    changeColor(index) {
      if (this.buttonColors) {
        this.buttonColors[index] = 'var(--primary-color)'
      }
      const newButtonColors = ['var(--tertiary-color-dark)', 'var(--tertiary-color-dark)', 'var(--tertiary-color-dark)', 'var(--tertiary-color-dark)'];
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
  display: flex;
  flex-direction: column;
  width: 45%;

}

.price-size-container,
.favorites-reset-container {
  display: flex;
  height: 100%;
  width: 100%;

}

.favorites-reset-container {
  margin-top: 5px;
}

.btn {
  height: 100%;
  width: 50%;
  min-width: 98px;
}

.price-button,
.favorites-button {
  border-radius: 8px 0 0 8px;
}

.size-button,
.reset-button {
  border-radius: 0 10px 10px 0;
}

@media (max-width: 500px) {
  .favorites-reset-container {
    margin-bottom: 50px;
  }

  .filter-container {
    width: 100%;
    margin-top: 20px;
  }

  .btn {
    height: 35px;
    width: 50%;
    max-width: 100%;
    min-width: 0;
  }
}
</style>
