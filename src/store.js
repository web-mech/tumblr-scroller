import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_META = 'SET_META'
const SET_QUERY = 'SET_QUERY'
const RESET_RESULTS = 'RESET_RESULTS'
const ADD_RESULTS = 'ADD_RESULTS'
const tumblrApiKey = process.env.VUE_APP_TUMBLR_KEY

function searchTumblr(query) {
  let request = `https://api.tumblr.com/v2/tagged/?tag=${query.tag}&before=${query.before}&limit=${query.limit}&api_key=${tumblrApiKey}`
  return fetch(request)
    .then(response => response.json())
}

export default new Vuex.Store({
  state: {
    query: '',
    meta: {
      limit: 10,
      before: (new Date()).getTime() / 1000
    },
    results: []
  },
  mutations: {
    [SET_QUERY](state, query) {
      state.query = query
    },
    [ADD_RESULTS](state, results) {
      state.results.push(...results)
    },
    [RESET_RESULTS]({results}) {
      results.length = 0
    },
    [SET_META](state, meta)  {
      Object.assign(state.meta, meta)
    }
  },
  actions: {
    search({commit, state}, query) {
      if(query !== state.query) {
        commit(RESET_RESULTS)
      }

      commit(SET_QUERY, query)

      
      return searchTumblr({
        tag: query,
        limit: state.meta.limit,
        before: state.meta.before
      }).then(({meta, response}) => {
        if (meta.status !== 200) {
          return
        }
        let posts = response
          .filter(({type}) => type === 'photo')
        let results = posts
          .map((result) => result.photos.slice(0).shift().original_size)
        
        let lastPost = posts.slice(0).pop()

        commit(ADD_RESULTS, results)
        
        if (!lastPost) {
          return
        }

        commit(SET_META, {
          before: lastPost.timestamp
        })
      })
    }
  }
})
