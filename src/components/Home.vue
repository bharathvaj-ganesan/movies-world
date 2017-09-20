<template>
  <div>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <div class="searchContainer primary">
          <form v-on:submit.prevent>
            <input class="search" placeholder="Browse Movies..." v-model="searchTerm" required v-on:keyup="onSearch" />
          </form>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center justify-space-around class="movies">
      <v-flex xs5 sm3 md2 class="movie-item" v-for="movie in movies" v-bind:key="movie.imdbID">
        <v-card>
          <v-card-media v-if="movie.Poster !== 'N/A'" :src="movie.Poster" height="200px">
          </v-card-media>
          <v-card-media v-else src="../../static/default_poster.jpg" height="200px">
          </v-card-media>
          <p class="ellipsis mb-0 pa-1 text-xs-center">{{movie.Title}}</p>
          <v-card-actions class="pa-0">
            <v-btn flat class="red--text" :to="/movie/+movie.imdbID">More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <mugen-scroll v-if="!endOfSearchResult && page <=5" :handler="loadNextPage" :should-handle="!loading" :threshold="1" :handleOnMount="false">
      loading...
    </mugen-scroll>
    <h4 class="text-xs-center grey--text" v-if="endOfSearchResult||page === 6">You are at the World's end</h4>
  </div>
</template>

<script>
import axios from 'axios'
import MugenScroll from 'vue-mugen-scroll'
import config from '@/assets/config'
export default {
  name: 'Home',
  data() {
    return {
      searchTerm: '',
      movies: [],
      page: 1,
      endOfSearchResult: false,
      isMovieDetailPage: false,
      loading: false
    }
  },
  components: {
    MugenScroll
  },
  mounted() {
    this.searchTerm = (this.$store.getters.currentSearchItem === '') ? 'Hobbit' : this.$store.getters.currentSearchItem
    this.$store.dispatch('updatecurrentSearchItem', this.searchTerm)
    this.$store.dispatch('updateIsMovieDetailPage', this.isMovieDetailPage)
    if (this.$store.getters.currentMovies === null) {
      axios.get(config.BASE_API + '&s=' + 'hobbit' + '&page=' + this.page)
        .then(response => {
          if (response.data.Response.toLowerCase() !== 'false') {
            this.movies = response.data.Search
            this.$store.dispatch('updateCurrentMovies', this.movies)
          } else {
            this.endOfSearchResult = true
          }
        })
    } else {
      this.movies = this.$store.getters.currentMovies
      this.page = this.$store.getters.currentGeneratedPage
    }
  },
  methods: {
    onSearch() {
      this.page = 1
      this.endOfSearchResult = false
      this.$store.dispatch('updatecurrentSearchItem', this.searchTerm)
      this.$store.dispatch('updateCurrentGeneratedPage', this.page)
      axios.get(config.BASE_API + '&s=' + this.searchTerm + '&page=' + this.page)
        .then(response => {
          if (response.data.Response.toLowerCase() === 'false') {
            this.endOfSearchResult = true
          } else {
            this.movies = response.data.Search
            this.$store.dispatch('updateCurrentMovies', this.movies)
          }
        })
    },
    loadNextPage() {
      this.page += 1
      if ((this.page <= 5) && (this.endOfSearchResult === false)) {
        this.loading = true
        this.$store.dispatch('updateCurrentGeneratedPage', this.page)
        axios.get(config.BASE_API + '&s=' + this.searchTerm + '&page=' + this.page)
          .then(response => {
            if (response.data.Response.toLowerCase() !== 'false' && this.movies !== null) {
              for (let movie of response.data.Search) {
                this.movies.push(movie)
              }
              this.$store.dispatch('updateCurrentMovies', this.movies)
            } else {
              this.endOfSearchResult = true
            }
          })
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchContainer {
  float: left;
  width: 100%;
  height: 80px;
  padding: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  box-shadow: 0 2px 0 0px rgba(0, 0, 0, 0.1);
}

.searchContainer form {
  float: left;
  width: 100%;
  height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.searchContainer .search {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-box-ordinal-group: 3;
  -ms-flex-order: 2;
  order: 2;
  outline: none;
  border: none;
  border-radius: 0;
  background: #fff;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  height: 50px;
  -webkit-transition: all 0.05s ease-in-out;
  transition: all 0.05s ease-in-out;
  -webkit-appearance: none;
}

.searchContainer .search:focus {
  height: 80px;
  margin-left: -15px;
  margin-right: -15px;
  padding: 10px 15px;
}

.movies {
  margin: 15px;
}

.movie-item {
  margin: 10px 5px;
}
</style>
