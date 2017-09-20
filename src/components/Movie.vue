<template>
  <div>
    <v-layout row class="pa-3 hidden-xs-only">
      <v-flex xs6 sm4 md3>
        <v-card flat tile class="pt-5">
          <v-card-media :src="movie.Poster" height="350px" contain>
          </v-card-media>
        </v-card>
      </v-flex>
      <v-flex xs6 sm8 md7>
        <div class="pa-3 red--text display-2">{{ movie.Title }}</div>
        <div class="pa-3">
          <p>{{ movie.Plot }}</p>
          <div class="red--text lighten-1 headline">Genre</div>
          <p>{{ movie.Genre }}</p>
          <div class="red--text lighten-1 headline">Released</div>
          <p>{{ movie.Released }}</p>
          <div class="red--text lighten-1 headline">Cast & Crew</div>
          <p class="mb-0">
            <b>Direction:</b>&nbsp;{{ movie.Director }}</p>
          <p>
            <b>Actors:</b>&nbsp;{{ movie.Actors }}</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout column class="pa-3 hidden-sm-and-up">
      <v-flex xs12>
        <div class="pa-3 red--text display-2">{{ movie.Title }}</div>
        <v-card flat tile class="pt-5">
          <v-card-media :src="movie.Poster" height="350px" contain>
          </v-card-media>
        </v-card>
      </v-flex>
      <v-flex>
        <div class="pa-3">
          <p>{{ movie.Plot }}</p>
          <div class="red--text lighten-1 headline">Genre</div>
          <p>{{ movie.Genre }}</p>
          <div class="red--text lighten-1 headline">Released</div>
          <p>{{ movie.Released }}</p>
          <div class="red--text lighten-1 headline">Cast & Crew</div>
          <p class="mb-0">
            <b>Directors:</b>&nbsp;{{ movie.Director }}</p>
          <p>
            <b>Actors:</b>&nbsp;{{ movie.Actors }}</p>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'
export default {
  name: 'Movie',
  data() {
    return {
      isMovieDetailPage: true,
      movie: {}
    }
  },
  mounted() {
    this.$store.dispatch('updateIsMovieDetailPage', this.isMovieDetailPage)
    axios.get(config.BASE_API + '&i=' + this.$route.params.id)
      .then(response => {
        if (response.data.Response.toLowerCase() !== 'false') {
          this.movie = response.data
        }
      })
  }
}
</script>

<style>

</style>
