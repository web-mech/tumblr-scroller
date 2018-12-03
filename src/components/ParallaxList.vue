<template>
	<div class="container">
		<ParallaxListItem v-for="(result, index) in $store.state.results" :key="result.id" :ticking="ticking" :current="current" :total="$store.state.results.length" :index="index" :result="result" />
	</div>
</template>

<script>
import ParallaxListItem from './ParallaxList/ParallaxListItem'

const scrollSensitivitySetting = 80
const slideDurationSetting = 600

export default {
  props: ['delta'],
  components: {
    ParallaxListItem
  },
  data () {
    return {
      current: 0,
      loadedAt: [],
      ticking: false
    }
  },
  watch: {
    delta (delta) {
      this.resolveNext(delta)
    },
    '$route' (to) {
      this.current = 0
      this.loadedAt.length = 0
    }
  },
  methods: {
    resolveNext (delta) {
      if (this.ticking) {
        return
      }
      let length = this.$store.state.results.length

      if (this.current === length - 5 && !this.loadedAt.includes(this.current)) {
        this.loadedAt.push(this.current)
        setTimeout(() => {
          this.$store.dispatch('search', this.$store.state.query)
        }, slideDurationSetting)
      }

      if (delta <= -scrollSensitivitySetting && this.current < length) {
        this.current++
        this.nextScrollEvent()
      }

      if (delta >= scrollSensitivitySetting && this.current > 0) {
        this.current--
        this.nextScrollEvent()
      }
    },
    nextScrollEvent () {
      this.ticking = true
      setTimeout(() => {
			    	this.ticking = false
			  	}, slideDurationSetting)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat);

// ------------- MIXINS ------------- //
@mixin transition($time, $property: all, $easing: ease-in) {
    transition: $property $time $easing;
}

// ------------- VARIABLES ------------- //
$parallax-offset: 30vh;
$content-offset: 40vh;
$transition-speed: 1.2s;
$slide-number: 3;

.container {
	height: 100vh;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url(https://i.postimg.cc/kXq9Qmnj/bgd1.jpg);
}
</style>
