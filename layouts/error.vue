<template>
  <v-app dark>
    <v-card max-width="500" class="mx-auto" elevation="0">
      <h1 v-if="error.statusCode === 404" v-text="pageNotFound" />
      <h1 v-else v-text="otherError" />
      <v-btn text small :to="localePath('/')" v-text="'Home page'" />
    </v-card>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
