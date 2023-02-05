<template>
	<div class="input-container">
		<img class="magnify-img" src="../../assets/ic_search@3x.png" alt="magnifying glass" />
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
	//update search value in store
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
}

.magnify-img {
	width: 15px;
	margin-left: 10px;
	position: relative;
	top: 3px;
}

input {
	width: 330px;
	margin-left: 10px;
}
</style>
