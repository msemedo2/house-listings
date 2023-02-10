<template>
	<div class="about-container">
		<div>
			<h2 class="title">DTT & the Project</h2>
			<p class="about-text">I am thrilled to present this assessment project as part of the hiring process for the
				position of Front-end
				developer trainee at DTT.<br><br> Being used to working with React, and having to familiarize myself with Vue,
				has
				made this experience incredibly enjoyable and rewarding.<br><br>
				I am truly passionate about using my skills and knowledge to create visually appealing and responsive
				websites and applications and having the opportunity to do that, as part of such a
				dynamic
				and
				innovative team, is very exciting. <br>
				I believe that my background and my eagerness to learn new and exciting technologies
				make me a strong candidate.
				<br><br>
				Thank you for considering me for the position, and I look forward to the opportunity to learn more about DTT.
			</p>
		</div>
		<div>
			<h2>Design and Development</h2>
			<div class="design-development">
				<div class="design">
					<div class="dtt">
						<img class="logo" src="../../assets/img_logo_dtt@3x.png" alt="DTT Logo">
					</div>
					<a href="https://www.d-tt.nl/en/" target="_blank" class="external-link">www.d-tt.nl</a>
				</div>
				<div class="development">
					<div class="ms">
						<img class="ms-logo" src="../../assets/ms_logo.png" alt="ms logo">
					</div>
					<div class="personal-links">
						<a href="https://www.miguelsemedo.com/" target="_blank" class="external-link">Personal Website</a>
						<a href="https://www.linkedin.com/in/miguel-semedo/" target="_blank" class="external-link">Linkedin</a>
						<a href="https://github.com/msemedo2" target="_blank" class="external-link">GitHub</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'About',
};
</script>

<style>
.about-container {
	margin: 0 auto;
	max-width: 1400px;
	padding: 30px 0;
	width: 90%;
}

.title {
	margin-top: 80px;
}

.about-text {
	margin: 20px 0 20px;
}

.design-development {
	display: flex;
	gap: 50px;
}

.design {
	margin-top: 20px;
}

.development {
	margin-top: 20px;
}

.dtt {
	display: flex;
	align-items: baseline;
}

.logo {
	width: 100px;
}

.ms {
	height: 36px;
}

.ms-logo {
	width: 39px;
}

.external-link {
	color: var(--f-hyperlink-color) !important;
	font-size: var(--fs-text);
}

.personal-links {
	display: flex;
	flex-direction: column;
}

@media (max-width: 500px) {
	.title {
		margin-top: 0;
	}
}
</style>
