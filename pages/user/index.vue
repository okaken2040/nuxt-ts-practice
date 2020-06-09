<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('users.title')"
    />
    <v-card max-width="500" class="mx-auto" elevation="0">
      <v-list>
        <v-list-item
          v-for="user in users"
          :key="user.id"
          :to="localePath(`/user/${user.id}`)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="user.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserApi } from '@/plugins/axios/utils/user'
import { User } from '@/types/user'

@Component({})
export default class extends Vue {
  users!: Array<User>

  async asyncData() {
    const response = await UserApi.findAll()
    return { users: response }
  }
}
</script>
