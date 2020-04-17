<template>
  <div class="contact-form">
    <p>Contact us</p>
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
        place-holder-message="名前を入力してください"
        :input-value.sync="inputName"
      >
        <template v-slot="inputProps">
          <p>
            {{ inputProps.inputValue.length + '/' + inputProps.maxLength }}
          </p>
        </template>
      </FormValidationInput>
      <!-- メールアドレスには入力文字数を表示しない -->
      <FormValidationInput
        rules="required|email|max:256"
        :label-message="$t('form.label.email')"
        input-type="email"
        form-component-name="email"
        max-length="256"
        place-holder-message="メールアドレスを入力してください"
        :input-value.sync="inputEmail"
      />
      <FormValidationTextarea
        rules="required|max:1000"
        :label-message="$t('form.label.message')"
        textarea-cols="20"
        textarea-rows="10"
        form-component-name="message"
        max-length="1000"
        place-holder-message="お問い合わせ内容を入力してください"
        :input-value.sync="inputMessage"
      >
        <template v-slot="inputProps">
          <p>
            {{ inputProps.inputValue.length + '/' + inputProps.maxLength }}
          </p>
        </template>
      </FormValidationTextarea>
      <button type="submit" :disabled="invalid">
        {{ $t('form.button') }}
      </button>
    </validation-observer>
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
      // バリデーション通過時の処理(例:サーバーに値を送信する等)
      // サンクスページに遷移
      this.inputName = ''
      this.inputEmail = ''
      this.inputMessage = ''
      requestAnimationFrame(() => {
        this.observer.reset()
      })
      this.$router.push('/contact/thanks')
    }
  }
}
</script>
