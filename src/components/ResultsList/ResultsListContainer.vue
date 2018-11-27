<template>
	<div :style="`height: ${height}px`">
		<slot></slot>
	</div>
</template>

<script>
import debounce from '@/debounce'
const UNIT_HEIGHT = 500
const HEIGHT_PAGINATE_BUFFER = UNIT_HEIGHT * 10

export default {
  data () {
    return {
      height: window.innerHeight - 100
    }
  },
  mounted () {
    this.$el.addEventListener('scroll', debounce((event) => {
			    if ((this.$el.scrollHeight - this.$el.scrollTop - HEIGHT_PAGINATE_BUFFER) <= this.$el.clientHeight) {
			    	this.$store.dispatch('search', this.$store.state.query)
			    }
    }, 50, false))
    window.addEventListener('resize', () => {
      this.height = window.innerHeight
    })
  }
}
</script>
