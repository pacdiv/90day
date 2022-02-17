<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">
      Congrats, {{ projectState.name }} is now set and ready!
    </h1>
    <p class="mb-8">
      Without further ado, discover your project ready for a 13-week period!
    </p>
    <div class="pa-0 col-md-4 pb-3 pr-md-3">
      <v-btn
        class=" body-2 font-weight-bold text-none col-12"
        color="primary"
        depressed
        :to="`/app/projects/${projectState.id}`"
      >
        Start
      </v-btn>
    </div>
  </div>
</template>

<script type="js">
export default {
  name: 'ProjectReadyPage',
  middleware: 'auth',
  asyncData({ redirect, store }) {
    if (!store.state['new-project'].id) redirect('/app/start')
  },
  data() {
    return {}
  },
  computed: {
    projectState() {
      return this.$store.state['new-project']
    },
  },
}
</script>

<style lang="scss" scoped>
.ready {
  &__button-unavailable {
    cursor: default;
  }
}
</style>
