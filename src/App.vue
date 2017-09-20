<template>
  <v-app >
    <v-toolbar fixed dark class="primary">
      <v-btn icon v-if="isMovieDetailPage" :to="'/'">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">Movies World</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isMovieDetailPage () {
      return this.$store.getters.isMovieDetailPage
    }
  }
}
</script>
<style lang="stylus" >
  @import './stylus/main'
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
