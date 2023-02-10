<template>
	<!-- desktop create new listing button -->
	<router-link class="create-link" :to="{ name: 'create' }">Create new
		<img class="plus" src="../../assets/ic_plus_white@3x.png" />
	</router-link>
	<!-- mobile create new listing button -->
	<router-link class="small-plus" :to="{ name: 'create' }">
		<img class="create-plus" src="../../assets/ic_plus_grey@3x.png" />
	</router-link>
</template>

<script>
export default {
	name: 'AppButton',
};
</script>

<style scoped>
.create-link {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	font-size: var(--fs-buttons);
	font-weight: var(--fw-bold);
	background-color: var(--primary-color);
	color: #fff;
	border-radius: 8px;
	padding: 10px 20px;
	text-transform: uppercase;
}

.plus {
	width: 20px;
	height: 95%;
	margin-right: 10px;
}

.small-plus {
	width: 22px;
	display: none;
}

@media (max-width: 500px) {
	.create-link {
		display: none;
	}

	.small-plus {
		display: block;
	}
}
</style>
