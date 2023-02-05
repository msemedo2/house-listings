<template>
	<div>
		<app-header />
		<router-view></router-view>
	</div>
</template>

<script>
import AppHeader from '@/components/Header.vue';

export default {
	name: 'App',
	components: {
		AppHeader,
	},
	mounted() {
		this.$store.dispatch('fetchHouses')
	},
};
</script>

<style scoped>

</style>
