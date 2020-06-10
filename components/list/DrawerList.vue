<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <v-list-item-action>
        <v-icon v-text="item.icon" />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="$t(item.name)" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DrawerList extends Vue {
  @Prop({ type: Array, required: true })
  items!: Array<any>
}
</script>
