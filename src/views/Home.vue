<template>
  <div>
  	<ParallaxList :delta="delta" />
    <SearchBar @delta="delta = $event"/>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import ParallaxList from '@/components/ParallaxList.vue'

export default {
  data () {
    return {
      delta: 0
    }
  },
  components: {
    ParallaxList,
    SearchBar
  }
}
</script>
