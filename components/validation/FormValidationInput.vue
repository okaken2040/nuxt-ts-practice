<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="labelMessage">
    <label :for="formComponentName"> {{ labelMessage }} </label>
    <v-text-field
      :id="formComponentName"
      v-model="inputValueModel"
      :type="inputType"
      :name="formComponentName"
      :maxlength="maxLength"
      :placeholder="placeHolderMessage"
      solo
      :counter="isCounter ? maxLength : undefined"
    ></v-text-field>
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
export default class FormValidationInput extends Vue {
  @Prop({ type: String, required: true })
  rules!: String

  @Prop({ type: String, required: true })
  labelMessage!: String

  @Prop({ type: String, required: true })
  inputType!: String

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
