<template>
  <v-list dense>
    <v-list-item v-for="n in listNumber" :key="n">
      <v-icon v-text="'mdi-circle-small'" />
      <v-list-item-content>
        <v-list-item-title v-text="$t(listName + n)" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DotList extends Vue {
  @Prop({ type: String, required: true })
  listName!: String

  @Prop({ type: Number, required: true })
  listNumber!: Number
}
</script>
