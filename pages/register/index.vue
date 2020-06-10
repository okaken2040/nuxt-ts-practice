<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('register.title')"
    />
    <v-card max-width="500" class="mx-auto" elevation="0">
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="register()"
      >
        <v-card-text>
          <form-validation-input
            rules="required|max:50"
            :label-message="$t('form.label.name')"
            input-type="text"
            form-component-name="name"
            max-length="50"
            :place-holder-message="$t('form.placeHolder.name')"
            :input-value.sync="inputName"
          />
          <form-validation-input
            rules="required|email|max:100"
            :label-message="$t('form.label.email')"
            input-type="email"
            form-component-name="email"
            max-length="100"
            :place-holder-message="$t('form.placeHolder.email')"
            :input-value.sync="inputEmail"
          />
          <form-validation-input
            rules="required|max:100"
            :label-message="$t('form.label.password')"
            input-type="text"
            form-component-name="password"
            max-length="100"
            :is-counter="true"
            :place-holder-message="$t('form.placeHolder.password')"
            :input-value.sync="inputPassword"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            id="registerButton"
            type="submit"
            :disabled="invalid"
            color="primary"
            elevation="0"
            v-text="$t('form.sign_up')"
          />
        </v-card-actions>
      </validation-observer>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { UserApi } from '@/plugins/axios/utils/user'
import { User } from '@/types/user'
import FormValidationInput from '@/components/validation/FormValidationInput.vue'

@Component({
  components: {
    FormValidationInput
  }
})
export default class extends Vue {
  inputName: string = ''
  inputEmail: string = ''
  inputPassword: string = ''

  @Ref() observer!: InstanceType<typeof ValidationObserver>

  async register() {
    const isValid = await this.observer.validate()
    if (isValid) {
      const user: User = {
        name: this.inputName,
        email: this.inputEmail,
        password: this.inputPassword
      }
      requestAnimationFrame(() => {
        this.observer.reset()
      })
      await UserApi.create(user)
      await this.$router.push(this.$nuxt.context.app.localePath('/user'))
    }
  }
}
</script>
