<template>
	<results-list-container class="container">
		<results-list-item v-for="result in $store.state.results" :key="result.id" :result="result" />
	</results-list-container>
</template>

<script>
import ResultsListItem from './ResultsList/ResultsListItem'
import ResultsListContainer from './ResultsList/ResultsListContainer'

export default {
  components: {
    ResultsListItem,
    ResultsListContainer
  }
}
</script>

<style lang="scss" scoped>
	.container {
		overflow-y: scroll;
		width: 100vh;
	}
</style>
