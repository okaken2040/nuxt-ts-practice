<template>
  <v-app dark>
    <v-navigation-drawer v-if="drawer" fixed app permanent width="200">
      <drawer-list :items="drawerItems" />
    </v-navigation-drawer>

    <div v-else>
      <div
        :class="$style.slideArea"
        @mouseover="hover = 'over'"
        @mouseleave="hover = 'leave'"
      />
      <v-card
        :class="[$style.drawer, $style[hover]]"
        elevation="12"
        @mouseover="hover = 'over'"
        @mouseleave="hover = 'leave'"
      >
        <drawer-list :items="drawerItems" />
      </v-card>
    </div>

    <v-app-bar fixed app elevation="0" color="white">
      <div
        :class="$style.slideArea2"
        @mouseover="hover = 'over'"
        @mouseleave="hover = 'leave'"
      >
        <v-btn
          v-if="hover === 'over' || drawer"
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon v-text="`mdi-chevron-${drawer ? 'left' : 'right'}`" />
        </v-btn>
        <v-app-bar-nav-icon v-if="hover === 'leave' && !drawer" />
      </div>

      <v-spacer />
      <v-btn
        rounded
        class="mr-5"
        :to="localePath('/register')"
        elevation="0"
        v-text="$t('register.title')"
      />
      <v-btn
        v-for="locale in availableLocales"
        id="localeSwitch"
        :key="locale.code"
        rounded
        class="mr-5"
        elevation="0"
        @click="changeLocale(locale.code)"
        v-text="locale.name"
      />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import DrawerList from '@/components/list/DrawerList'

export default {
  components: { DrawerList },
  data() {
    return {
      hover: 'leave',
      drawer: true
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    drawerItems() {
      const items = [
        {
          icon: 'mdi-apps',
          name: 'drawer.items.top',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          name: 'drawer.items.about',
          to: '/about'
        },
        {
          icon: 'mdi-account',
          name: 'drawer.items.user',
          to: '/user'
        },
        {
          icon: 'mdi-email-outline',
          name: 'drawer.items.contact',
          to: '/contact'
        }
      ]
      // eslint-disable-next-line prefer-const
      let localeItems = []
      for (const item of items) {
        const localeUrl = this.localePath(item.to)
        item.to = localeUrl
        localeItems.push(item)
      }
      return localeItems
    }
  },
  methods: {
    changeLocale(localeCode) {
      this.$i18n.setLocale(localeCode)
      this.$setValidationLocale(localeCode)
    }
  }
}
</script>

<style lang="sass" module>
.drawer
  width : 200px
  margin-top : 100px
  position : absolute
  z-index : 10

.slideArea
  width : 200px
  height :100vh
  position : absolute
  z-index : 5

  @media screen and (max-width : 950px)
    width : 100px
  @media screen and (max-width : 750px)
    width : 50px

.slideArea2
  position : absolute
  top : 0
  left : 0
  width : 250px
  height :100%

.over
  transform : translateX(0%)
  opacity : 1
  transition : .3s

.leave
  transform : translateX(-100%)
  opacity : 0.1
  transition : .3s
</style>
