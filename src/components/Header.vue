<template>
	<header>
		<nav class="navbar">
			<!-- desktop navbar -->
			<img src="../../assets/img_logo_dtt@3x.png" alt="logo" sizes class="logo" />
			<ul class="nav-link-container">
				<router-link class="nav-link" :to="{ name: 'home' }">Houses</router-link>
				<router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
			</ul>
			<!-- mobile navbar -->
			<ul class="link-container">
				<router-link :to="{ name: 'home' }">
					<img :src="imageHomeSource" @click="changeHomeImage" alt="home image" class="home-icon">
				</router-link>
				<router-link :to="{ name: 'about' }">
					<img :src="imageAboutSource" @click="changeInfoImage" alt="about image" class="about-icon">
				</router-link>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
	data() {
		return {
			originalHomeImage: "../../assets/ic_mobile_navigarion_home@3x.png",
			originalAboutImage: "../../assets/ic_mobile_navigarion_info@3x.png",
			activeHomeImage: "../../assets/ic_mobile_navigarion_home_active@3x.png",
			activeInfoImage: "../../assets/ic_mobile_navigarion_info_active@3x.png",
		}
	},
	created() {
		this.checkRoute();
	},
	// watch for changes in the route. If the page is reloaded on another route besides the home route, it will keep the correct image active
	watch: {
		$route() {
			this.checkRoute();
		},
	},

	methods: {
		checkRoute() {
			if (this.$route.path === "/") {
				this.imageHomeSource = this.activeHomeImage;
				this.imageAboutSource = this.originalAboutImage;
			} else if (this.$route.path === "/about") {
				this.imageHomeSource = this.originalHomeImage;
				this.imageAboutSource = this.activeInfoImage;
			}
		},
		// render correct image based on the active route	
		changeHomeImage() {
			if (this.$route.path === "/about") {
				this.imageHomeSource = this.activeHomeImage;
				this.imageAboutSource = this.originalAboutImage;
			}
		},
		changeInfoImage() {
			if (this.$route.path === "/") {
				this.imageHomeSource = this.originalHomeImage;
				this.imageAboutSource = this.activeInfoImage;
			}
		}
	}
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

.logo {
	width: 100px;
}

.link-container {
	display: none;
}

@media (max-width: 500px) {
	header {
		bottom: 0;
		height: 70px;
	}

	.logo {
		display: none;
	}

	.nav-link {
		display: none;
	}

	.link-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.about-icon,
	.home-icon {
		width: 30px;
		margin-top: 10px;
	}

}
</style>
