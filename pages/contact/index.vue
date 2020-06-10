<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('contact.title')"
    />
    <v-card max-width="500" class="mx-auto" elevation="0">
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
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
          <form-validation-textarea
            rules="required|max:1000"
            :label-message="$t('form.label.message')"
            textarea-cols="20"
            textarea-rows="10"
            form-component-name="message"
            max-length="1000"
            :is-counter="true"
            :place-holder-message="$t('form.placeHolder.message')"
            :input-value.sync="inputMessage"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            id="submitButton"
            type="submit"
            :disabled="invalid"
            color="primary"
            elevation="0"
            v-text="$t('form.submit')"
          />
        </v-card-actions>
      </validation-observer>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import FormValidationInput from '@/components/validation/FormValidationInput.vue'
import FormValidationTextarea from '@/components/validation/FormValidationTextarea.vue'

@Component({
  components: {
    FormValidationInput,
    FormValidationTextarea
  }
})
export default class extends Vue {
  inputName: String = ''
  inputEmail: String = ''
  inputMessage: String = ''

  @Ref() observer!: InstanceType<typeof ValidationObserver>

  async submit() {
    const isValid = await this.observer.validate()
    if (isValid) {
      this.inputName = ''
      this.inputEmail = ''
      this.inputMessage = ''
      requestAnimationFrame(() => {
        this.observer.reset()
      })
      this.$router.push(this.$nuxt.context.app.localePath('/contact/thanks'))
    }
  }
}
</script>
