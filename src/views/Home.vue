<template>
	<div class="home-container">
		<!--Header -->
		<div class="header-container">
			<h1>Houses</h1>
			<app-button />
		</div>

		<!-- Search Field, Price / Size Sort option -->
		<div class="options-container">
			<search-field />
			<div class="filter-container">
				<button class="price-button" :style="{ backgroundColor: buttonColors[0] }" @click="sortSelection(0)">
					Price
				</button>
				<button class="size-button" :style="{ backgroundColor: buttonColors[1] }" @click="sortSelection(1)">
					Size
				</button>
				<p>{{ searchValue }}</p>
			</div>

		</div>

		<!-- House Listings -->
		<house-list />
	</div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import SearchField from '@/components/SearchField.vue';
import HouseList from '../components/HouseList.vue';

export default {
	name: 'Home',
	components: {
		AppButton,
		SearchField,
		HouseList,
	},
	data() {
		return {
			buttonColors: ['var(--primary-color)', 'var(--tertiary-color-dark)'],
			searchValue: '',
		};
	},
	methods: {
		// revert button color when opposite button is selected
		sortSelection(index) {
			const newButtonColors = ['var(--tertiary-color-dark)', 'var(--tertiary-color-dark)'];
			newButtonColors[index] = 'var(--primary-color)';
			this.buttonColors = newButtonColors;
		},

	},
};
</script>

<style scoped>
.home-container {
	margin: 0 auto;
	max-width: 1400px;
	padding: 30px 0;
	width: 90%;
}

/* --- */
.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 80px;
}

/* --- */
.options-container {
	margin-top: 30px;
	display: flex;
	justify-content: space-between;
}

.price-button,
.size-button {
	width: 120px;
	height: 100%;
	background-color: var(--tertiary-color-dark);
}

.price-button {
	border-radius: 8px 0 0 8px;
}

.size-button {
	border-radius: 0 10px 10px 0;
}
</style>
