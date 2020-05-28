import Vue from 'vue'
import { mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  localize
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import { required, email, max } from 'vee-validate/dist/rules'
import flushPromises from 'flush-promises'
import testComponent from '@/pages/contact/index'

extend('required', required)
extend('email', email)
extend('max', max)
localize('ja', ja)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

Vue.use(VueI18n)
Vue.use(Vuetify)

const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    en: require('@/locales/en-US'),
    ja: require('@/locales/ja-JP')
  }
})
const vuetify = new Vuetify()
const router = { push: jest.fn() }
let wrapper = {}

beforeEach(() => {
  wrapper = mount(testComponent, {
    i18n,
    vuetify,
    sync: false,
    mocks: {
      $router: router,
      $nuxt: { context: { app: { localePath: (i) => i } } }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

async function flush() {
  await flushPromises()
  jest.runAllTimers()
}

describe('お問い合わせ画面', () => {
  describe('バリデーション', () => {
    it('必須項目のエラー表示', async () => {
      wrapper.find('#name').setValue('')
      wrapper.find('#email').setValue('')
      wrapper.find('#message').setValue('')
      await flushPromises()

      expect(wrapper.find('#name_error').text()).toBe('名前は必須項目です')
      expect(wrapper.find('#email_error').text()).toBe(
        'メールアドレスは必須項目です'
      )
      expect(wrapper.find('#message_error').text()).toBe(
        'お問い合わせ内容は必須項目です'
      )
    })
    it('正規表現のエラー表示', async () => {
      wrapper.find('#email').setValue('aaaaaa')
      await flushPromises()

      expect(wrapper.find('#email_error').text()).toBe(
        'メールアドレスは有効なメールアドレスではありません'
      )
    })
    it('エラーがある場合submitボタンが無効になる', async () => {
      wrapper.find('#name').setValue('test tarou')
      wrapper.find('#email').setValue('aaa')
      wrapper.find('#message').setValue('It is awesome!')
      await flush()

      expect(wrapper.find('#submitButton').props().disabled).toBeTruthy()
    })
  })

  jest.useFakeTimers()

  it('遷移先の確認', async () => {
    // 正常な値をフォームに入力
    wrapper.find('#name').setValue('test tarou')
    wrapper.find('#email').setValue('aaa@example.com')
    wrapper.find('#message').setValue('It is awesome!')

    await flush()
    expect(wrapper.find(ValidationObserver).vm.flags.invalid).toBeFalsy()
    // submitボタンを押下
    // ※ trigger('click')でテストをすると、バリデーションが完了する前にテストが走るので、代わりにsubmitメソッドを直接実行する。
    // ※ ValidationObserverのinvalidフラグがfalseの場合、submitメソッドが実行できる状態であるので、submitメソッドを直接実行しても、再現性は担保されている。
    wrapper.vm.submit()
    await flush()
    // 1.フォームの値が初期化されていることを確認
    expect(wrapper.vm.inputName).toBe('')
    expect(wrapper.vm.inputEmail).toBe('')
    expect(wrapper.vm.inputMessage).toBe('')
    expect(wrapper.find('#name').element.value).toBe('')
    expect(wrapper.find('#email').element.value).toBe('')
    expect(wrapper.find('#message').element.value).toBe('')
    // 2.vee-validateの状態が初期化されていることを確認
    expect(wrapper.find(ValidationObserver).vm.flags.invalid).toBeTruthy()
    // 3.遷移先を確認
    expect(router.push).toBeCalledWith('/contact/thanks')
  })
})
