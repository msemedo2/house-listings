<template>
	<button class="create-btn">
		<img class="plus" src="../../assets/ic_plus_white@3x.png" />
		Create new
	</button>
</template>

<script>
export default {
	name: 'AppButton',
};
</script>

<style scoped>
.create-btn {
	font-size: var(--fs-buttons);
	background-color: var(--primary-color);
	color: #fff;
	border-radius: 8px;
	padding: 10px 20px;
	text-transform: uppercase;
}

.plus {
	width: 20px;
	position: relative;
	top: 3px;
	margin-right: 10px;
}
</style>
