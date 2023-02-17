<template>
	<div class="home-container">
		<!--header -->
		<div class="header-container">
			<h1>Houses</h1>
			<app-button />
		</div>

		<!-- search field, price / size sort option -->
		<div class="options-container">
			<search-field />
			<sort-buttons />
		</div>

		<!-- house listings -->
		<house-list />
</div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import SearchField from '@/components/SearchField.vue';
import HouseList from '../components/HouseList.vue';
import SortButtons from '../components/SortButtons.vue';

export default {
	name: 'Home',
	components: {
		AppButton,
		SearchField,
		HouseList,
		SortButtons,
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

.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 80px;
}

.options-container {
	width: 100%;
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

@media (max-width: 500px) {
	.header-container {
		width: 100%;
		justify-content: flex-end;
		gap: 35%;
		margin-top: 0px;
	}

	.options-container {
		flex-direction: column;
		justify-content: center;
		margin-top: 20px;
	}
}
</style>
