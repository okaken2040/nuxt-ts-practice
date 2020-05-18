import Vue from 'vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Vuetify from 'vuetify'
import testComponent from '@/layouts/default'

Vue.use(Vuetify)

const vuetify = new Vuetify()

const wrapper = shallowMount(testComponent, {
  vuetify,
  stubs: {
    NuxtLink: RouterLinkStub,
    Nuxt: true
  },
  mocks: {
    localePath: (i) => i,
    $i18n: {
      locale: 'ja',
      locales: [
        {
          code: 'ja',
          iso: 'ja-JP',
          name: 'Japanese',
          file: 'ja-JP.json'
        },
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          file: 'en-US.json'
        }
      ]
    }
  }
})

const changeLocaleMock = jest.fn()
wrapper.setMethods({ changeLocale: changeLocaleMock })

describe('ヘッダー', () => {
  it('ロゴの遷移先の確認', () => {
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/')
  })
  it('言語切り替えボタン', () => {
    wrapper.find('#localeSwitch').trigger('click')
    expect(changeLocaleMock).toBeCalledWith('en')
  })
})
