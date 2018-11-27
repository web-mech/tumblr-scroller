<template>
	<div>
		<div class="image" :style="`background-image: url(${result.url})`"></div>
	</div>
</template>

<script>
export default {
  props: ['result']
}
</script>
<style lang="scss" scoped>
	.image {
		background: no-repeat center center;
		background-size: cover;
		display: block;
		height: 50vh;
		margin: 0px auto;
		transition: all 200ms ease-in-out;
		&:hover {
			transform: scale(1.2);
		}
	}
</style>
