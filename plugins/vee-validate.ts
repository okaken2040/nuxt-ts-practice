import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  localize
} from 'vee-validate'
import JA from 'vee-validate/dist/locale/ja.json'
import EN from 'vee-validate/dist/locale/en.json'
import { required, email, max } from 'vee-validate/dist/rules'
import { Context } from '@nuxt/types'

extend('required', required)
extend('email', email)
extend('max', max)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

let LOCALE = 'en'
interface ValidationMessages {
  [key: string]: any
}
const validationMessages = { en: EN, ja: JA }

export default (context: Context) => {
  const browserLocale: string = context.app.i18n.locale
  if ((validationMessages as ValidationMessages)[browserLocale]) {
    LOCALE = browserLocale
    localize(
      browserLocale,
      (validationMessages as ValidationMessages)[browserLocale]
    )
  }
  Vue.prototype.$getValidationLocale = () => {
    return LOCALE
  }
  Vue.prototype.$setValidationLocale = (locale: string) => {
    LOCALE = locale
    localize(locale, (validationMessages as ValidationMessages)[locale])
  }
}
