<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">
      Congrats, {{ projectState.name }} is now set and ready!
    </h1>
    <p class="mb-8">
      However, goals for week #1 have yet to be set.
      <br class="d-none d-md-block" />
      We recommend to set them now to start the right way.
    </p>
    <div class="mb-8 d-flex flex-column flex-sm-row">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            class="ready__button-unavailable body-2 font-weight-bold text-none mb-3 col-sm-3 mb-sm-0 col-md-2 ml-0 mr-md-3"
            color="grey"
            depressed
            readonly
            v-bind="attrs"
            v-on="on"
          >
            Continue
          </v-btn>
        </template>
        <span>Available soon</span>
      </v-tooltip>
      <v-btn
        class="body-2 font-weight-bold text-none ol-sm-3 col-md-2 ml-0"
        color="primary"
        depressed
        outlined
        :to="`/app/projects/${projectState.id}`"
      >
        Skip
      </v-btn>
    </div>
  </div>
</template>

<script type="js">
export default {
  name: 'ProjectReadyPage',
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
