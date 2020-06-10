<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('about.title')"
    />
    <v-card max-width="750" class="mx-auto" elevation="0">
      <h2 class="mb-6" v-text="$t('about.purpose')" />
      <p v-text="$t('about.text')" />
    </v-card>
  </div>
</template>
