<template>
  <div class="home flex">
    <SearchBar/>
    <ResultsList/>
  </div>
</template>

<script>

import SearchBar from '@/components/SearchBar.vue'
import ResultsList from '@/components/ResultsList.vue'

export default {
  components: {
    SearchBar,
    ResultsList
  }
}
</script>
