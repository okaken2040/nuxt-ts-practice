import Vue from 'vue'
import { mount, RouterLinkStub } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import testComponent from '@/pages/index'

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

const wrapper = mount(testComponent, {
  i18n,
  vuetify,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    localePath: (i) => i
  }
})

describe('ホーム画面', () => {
  it('遷移先の確認', () => {
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/contact/')
  })
})
