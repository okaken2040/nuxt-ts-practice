<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="labelMessage">
    <div class="container">
      <label :for="formComponentName"> {{ labelMessage }}: </label>
      <textarea
        :id="formComponentName"
        v-model="inputValueModel"
        :cols="textareaCols"
        :rows="textareaRows"
        :name="formComponentName"
        :maxlength="maxLength"
        :placeholder="placeHolderMessage"
      />
      <!-- 入力値と最大文字数を親Componentで扱えるようにする -->
      <slot :inputValue="inputValue" :maxLength="maxLength" />
      <p v-show="errors.length">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from 'nuxt-property-decorator'

@Component
export default class FormValidationTextarea extends Vue {
  @Prop({ type: String, required: true })
  rules!: String

  @Prop({ type: String, required: true })
  labelMessage!: String

  @Prop({ type: String, required: true })
  textareaCols!: String

  @Prop({ type: String, required: true })
  textareaRows!: String

  @Prop({ type: String, required: true })
  formComponentName!: String

  @Prop({ type: String, required: true })
  maxLength!: String

  @Prop({ type: String, required: true })
  placeHolderMessage!: String

  @PropSync('inputValue', { type: String, required: true })
  inputValueModel!: String
}
</script>
