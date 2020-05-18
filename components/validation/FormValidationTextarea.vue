<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="labelMessage">
    <label :for="formComponentName"> {{ labelMessage }} </label>
    <v-textarea
      :id="formComponentName"
      v-model="inputValueModel"
      :cols="textareaCols"
      :rows="textareaRows"
      :name="formComponentName"
      :maxlength="maxLength"
      :placeholder="placeHolderMessage"
      solo
      :counter="isCounter ? maxLength : undefined"
    ></v-textarea>
    <p
      v-show="errors.length"
      :id="formComponentName + '_error'"
      :class="$style.error_message"
    >
      {{ errors[0] }}
    </p>
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

  @Prop({ type: Boolean, default: false })
  isCounter!: Boolean

  @Prop({ type: String, required: true })
  placeHolderMessage!: String

  @PropSync('inputValue', { type: String, required: true })
  inputValueModel!: String
}
</script>

<style lang="sass" module>
.error_message
  color : red
</style>
