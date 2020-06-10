<template>
  <div>
    <div class="text-center">
      <logo />
      <vuetify-logo />
    </div>
    <v-card max-width="500" class="mx-auto" elevation="0">
      <h1
        class="title font-weight-bold text-center my-3"
        v-text="$t('top.title')"
      />
      <v-card-text>
        <p v-text="$t('top.t.1')" />
        <dot-list list-name="top.f_list." :list-number="10" />

        <p v-text="$t('top.t.2')" />
        <dot-list list-name="top.b_list." :list-number="5" />

        <p v-text="$t('top.t.conclusion')" />
        <nuxt-link
          :to="localePath('/about')"
          :class="$style.link"
          v-text="$t('about.link')"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import VuetifyLogo from '@/components/VuetifyLogo.vue'
import DotList from '@/components/list/DotList.vue'

@Component({
  components: {
    Logo,
    VuetifyLogo,
    DotList
  }
})
export default class extends Vue {}
</script>

<style lang="sass" module>
.link
  text-decoration : none
</style>
