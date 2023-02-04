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
				<button
					class="price-button"
					:style="{ backgroundColor: buttonColors[0] }"
					@click="sortSelection(0)"
				>
					Price
				</button>
				<button
					class="size-button"
					:style="{ backgroundColor: buttonColors[1] }"
					@click="sortSelection(1)"
				>
					Size
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import SearchField from '@/components/SearchField.vue';

export default {
	name: 'Home',
	components: {
		AppButton,
		SearchField,
	},
	data() {
		return {
			buttonColors: ['#eb5440', '#c3c3c3'],
		};
	},
	methods: {
		sortSelection(index) {
			const newButtonColors = ['#c3c3c3', '#c3c3c3'];
			newButtonColors[index] = '#eb5440';
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
