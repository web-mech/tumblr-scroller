<template>
	<form action="s" @submit.prevent="search" @wheel="onWheel">
		<input type="text" placeholder="Type here to search..." v-model="query" v-focus/>
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
    },
    onWheel (event) {
    	this.$emit('delta', event.wheelDelta)
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
    if (this.$route.query.q) {
      this.query = this.$route.query.q
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
	@import url(https://fonts.googleapis.com/css?family=Montserrat);

	form {
		position: absolute;
		z-index: 999;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		input {
			color: #ffffff;
			font-family: Montserrat;
			font-size: 12vh;
	    	line-height: 1.4;
	    	width: 80%;
	    	background: transparent;
	    	outline: none;
	    	border: none;
	    	border-bottom: 2px solid #ffffff;
	    	&::placeholder {
	    		color: #ffffff;
	    	}
		}
	}

</style>
