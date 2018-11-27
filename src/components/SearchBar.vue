<template>
	<form action="s" @submit.prevent="search">
		<input type="text" placeholder="Type here to search..." v-model="query" @change="search" v-focus/>
	</form>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search (event) {
      this.$router.push({
        path: '/s',
			        query: {
			          q: this.query
			        }
			    })
      this.$store.dispatch('search', this.query)
    }
  },
  directives: {
		  focus: {
		    inserted: function (el) {
		      el.focus()
		    }
		  }
  },
  mounted () {
    if (this.$route.query) {
      this.query = this.$route.query.q
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
	form {
		width: 100vh;
		input {
			width: 100%;
			font-size: 3rem;
			outline: none;
			border: none;
			border-bottom: 2px solid #ddd;
			transition: color 200ms ease-in;
			&:focus {
				color: #d73;
			}
		}
	}

</style>
