<template>
  <div :style="`height: ${cHeight}px`" @scroll="onScroll">
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
      offset: 0,
      height: window.innerHeight,
      onResizeBound: false,
      onWindowResize () {
        this.height = window.innerHeight
        this.offset = this.$el.getBoundingClientRect().top + window.scrollY
      }
    }
  },
  computed: {
    cHeight () {
      return this.height - this.offset
    }
  },
  methods: {
    onScroll: debounce(function () {
      if ((this.$el.scrollHeight - this.$el.scrollTop - HEIGHT_PAGINATE_BUFFER) <= this.$el.clientHeight) {
        this.$store.dispatch('search', this.$store.state.query)
      }
    }, 50, false)
  },
  mounted () {
    this.onResizeBound = this.onWindowResize.bind(this)
    window.addEventListener('resize', this.onResizeBound)
  },
  afterDestroy () {
    window.removeEventListener('resize', this.onResizeBound)
  }
}
</script>
