export default {
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
  ],
  defaultLocale: 'ja',
  strategy: 'prefix_and_default',
  detectBrowserLanguage: {
    useCookie: true
  },
  lazy: true,
  langDir: 'locales/',
  vueI18n: {
    fallbackLocale: 'en'
  }
}
