<template>
	<div class="input-container">
		<div class="magnify-img-container">
			<img class="magnify-img" src="../../assets/ic_search@3x.png" alt="magnifying glass" />
		</div>
		<input type="text" placeholder="Search for a house" v-model="searchValue" @input="updateSearchValue" />
	</div>
</template>

<script>

export default {
	name: 'SearchField',
	data() {
		return {
			searchValue: '',
		}
	},
	// update search value in vuex store
	methods: {
		updateSearchValue() {
			this.$store.dispatch('updateSearchValue', this.searchValue)
		}
	}
};
</script>

<style scoped>
.input-container {
	background-color: var(--tertiary-color-light);
	padding: 5px 5px 5px 5px;
	border-radius: 5px;
	width: 45%;
	display: flex;
	text-align: center;
}

.magnify-img-container {
	position: relative;
	top: 7px;
}

.magnify-img {
	width: 15px;
	margin-left: 10px;
	position: relative;
	top: 3px;
}

input {
	margin-left: 10px;
	width: 70%;
}

@media (max-width: 500px) {
	.input-container {
		width: 100%;
		height: 35px;
	}

	.magnify-img-container {
		top: 0px;
	}
}
</style>
