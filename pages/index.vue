<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          <h1>{{ $t('top.title') }}</h1>
        </v-card-title>
        <v-card-text>
          <nuxt-link :to="localePath('/contact/')" :class="$style.link">
            <p>{{ $t('contact.link') }}</p>
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

@Component({
  components: {
    Logo,
    VuetifyLogo
  }
})
export default class extends Vue {}
</script>

<style lang="sass" module>
.link
  text-decoration : none
</style>
