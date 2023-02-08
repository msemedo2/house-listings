<template>
	<header>
		<nav class="navbar">
			<img src="../../assets/img_logo_dtt@3x.png" alt="logo" sizes />
			<ul>
				<router-link class="nav-link" :to="{ name: 'home' }">Houses</router-link>
				<router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
};
</script>

<style scoped>
header {
	width: 100%;
	height: 55px;
	background-color: white;
	position: fixed;
	z-index: 10;
}

.navbar {
	margin: 0 auto;
	height: 100%;
	max-width: 1400px;
	width: 90%;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.nav-link {
	display: inline-block;
	cursor: pointer;
	margin-left: 40px;
	font-weight: var(--fw-medium);
	color: var(--f-secondary-color);
}

.active-link {
	font-size: 18px;
	font-weight: var(--fw-bold);
}

img {
	width: 100px;
}
</style>
