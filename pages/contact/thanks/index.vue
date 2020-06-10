<template>
  <div>
    <h1
      class="title font-weight-bold text-center my-3"
      v-text="$t('thank.title')"
    />
    <v-card max-width="500" class="mx-auto" elevation="0">
      <p class="text-center" v-text="$t('thank.content')" />
    </v-card>
  </div>
</template>
