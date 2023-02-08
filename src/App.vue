<template>
	<div>
		<app-header />
		<delete-modal />
		<router-view></router-view>
	</div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import DeleteModal from './components/DeleteModal.vue';

export default {
	name: 'App',
	components: {
		AppHeader,
		DeleteModal,
	},
	mounted() {
		this.$store.dispatch('fetchHouses')
	},
};
</script>

<style>

</style>
