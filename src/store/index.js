import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentMovies: null,
    currentSearchItem: '',
    isMovieDetailPage: false,
    generatedPage: 1
  },
  mutations: {
    setCurrentMovies(state, movies) {
      state.currentMovies = movies
    },
    setCurrentSearchItem(state, searchItem) {
      state.currentSearchItem = searchItem
    },
    setIsMovieDetailPage(state, bool) {
      state.isMovieDetailPage = bool
    },
    setPage(state, page) {
      state.generatedPage = page
    }
  },
  actions: {
    updateCurrentMovies({ commit }, movies) {
      commit('setCurrentMovies', movies)
    },
    updatecurrentSearchItem({ commit }, searchItem) {
      commit('setCurrentSearchItem', searchItem)
    },
    updateIsMovieDetailPage({ commit }, bool) {
      commit('setIsMovieDetailPage', bool)
    },
    updateCurrentGeneratedPage({ commit }, page) {
      commit('setPage', page)
    }
  },
  getters: {
    currentMovies(state) {
      return state.currentMovies
    },
    currentSearchItem(state) {
      return state.currentSearchItem
    },
    isMovieDetailPage(state) {
      return state.isMovieDetailPage
    },
    currentGeneratedPage(state) {
      return state.generatedPage
    }
  }
})
