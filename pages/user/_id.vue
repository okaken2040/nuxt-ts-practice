<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('user.title')"
    />
    <v-card max-width="500" class="mx-auto" elevation="0">
      <v-list dense>
        <v-list-item v-for="n in ['name', 'age', 'profile']" :key="n">
          <v-list-item-content>
            <label v-text="$t(`user.${n}`)" />
            <p v-text="user[`${n}`]" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-btn
        id="backButton"
        color="primary"
        :to="localePath('/user')"
        elevation="0"
        v-text="$t('user.back')"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserApi } from '@/plugins/axios/utils/user'
import { User } from '@/types/user'

@Component({})
export default class extends Vue {
  user!: User

  async asyncData({ params }: { params: any }) {
    const response = await UserApi.findById(params.id)
    return { user: response }
  }
}
</script>
