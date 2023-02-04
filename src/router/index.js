import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

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
