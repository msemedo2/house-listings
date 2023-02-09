import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import CreateForm from '@/views/CreateForm.vue';
import HouseDetail from '@/views/HouseDetail.vue';
import EditForm from '@/views/EditForm.vue';

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home,
	},
	{
		name: 'about',
		path: '/about',
		component: About,
	},
	{
		name: 'create',
		path: '/create-listing',
		component: CreateForm,
	},
	{
		name: 'house',
		path: '/house/:id',
		component: HouseDetail,
	},
	{
		name: 'edit',
		path: '/edit-listing/:id',
		component: EditForm,
	},
	//if user tries to access a nonexistent url, redirect to home page
	{
		path: '/:catchAll(.*)*',
		redirect: { name: 'home' },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkActiveClass: 'active-link',
});

export default router;
