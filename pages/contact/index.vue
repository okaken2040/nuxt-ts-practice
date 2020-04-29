<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card outlined>
        <v-row justify="center">
          <v-col cols="10">
            <v-card-title>
              <p>{{ $t('contact.title') }}</p>
            </v-card-title>
            <v-divider></v-divider>
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="submit()"
            >
              <FormValidationInput
                rules="required|max:50"
                :label-message="$t('form.label.name')"
                input-type="text"
                form-component-name="name"
                max-length="50"
                :is-counter="true"
                :place-holder-message="$t('form.placeHolder.name')"
                :input-value.sync="inputName"
              >
              </FormValidationInput>
              <FormValidationInput
                rules="required|email|max:256"
                :label-message="$t('form.label.email')"
                input-type="email"
                form-component-name="email"
                max-length="256"
                :place-holder-message="$t('form.placeHolder.email')"
                :input-value.sync="inputEmail"
              />
              <FormValidationTextarea
                rules="required|max:1000"
                :label-message="$t('form.label.message')"
                textarea-cols="20"
                textarea-rows="10"
                form-component-name="message"
                max-length="1000"
                :is-counter="true"
                :place-holder-message="$t('form.placeHolder.message')"
                :input-value.sync="inputMessage"
              >
              </FormValidationTextarea>
              <v-card-actions>
                <v-spacer />
                <v-btn type="submit" :disabled="invalid" color="primary">
                  {{ $t('form.button') }}
                </v-btn>
              </v-card-actions>
            </validation-observer>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
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
