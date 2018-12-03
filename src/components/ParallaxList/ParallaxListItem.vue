<template>
	<div class="background" :class="{'hide': hide, 'up-scroll': scrollUp, 'down-scroll': scrollDown}" :style="`background-image: url(${result.url}); z-index: ${total - index};`"></div>
</template>

<script>
export default {
  props: ['result', 'index', 'current', 'total'],
  computed: {
  	scrollUp () {
  		return this.index > this.current
  	},
  	scrollDown () {
  		return this.index < this.current
  	},
  	hide () {
  		let { current, index } = this
  		let max = current + 1
  		let min = current - 1
  		return index !== 0 && index !== min && index !== max
  	}
  }
}
</script>

<style lang="scss" scoped>
	@import url(https://fonts.googleapis.com/css?family=Montserrat);

	$parallax-offset: 30vh;
	$content-offset: 40vh;
	$transition-speed: 1.2s;
	$slide-number: 3;

	// ------------- MIXINS ------------- //
	@mixin transition($time, $property: all, $easing: ease-in) {
	    transition: $property $time $easing;
	}

	.background {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		overflow: hidden;
		will-change: transform;
		backface-visibility: hidden;
		height: 100vh + $parallax-offset;
		position: fixed;
		width: 100%;
		z-index: -1;
		transform: translateY($parallax-offset);
		@include transition($transition-speed, all, cubic-bezier(0.22, 0.44, 0, 1));
		&.hide {
			opacity: 0
		}
		&:before {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,.3);
		}

		&:first-child {
			transform: translateY(-$parallax-offset / 2);
		}

		&.up-scroll {
		  transform: translate3d(0,-$parallax-offset / 2,0);
		  + .background {
		    transform: translate3d(0,$parallax-offset, 0);
		  }
		}

		&.down-scroll {
		  transform: translate3d(0,-(100vh + $parallax-offset),0);
		  + .background:not(.down-scroll) {
		    transform: translate3d(0,-$parallax-offset / 2,0);
		  }
		}
	}
</style>
