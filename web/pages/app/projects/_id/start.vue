<template>
  <div class="mt-16 d-flex flex-column">
    <p class="text-h6">New project: Step 5 out of 5</h1>
    <h1 class="text-h4 mb-12">Almost there! When will you start working?</h1>
    <p class="mb-3">
      One last information to fill and your project will be set!
      <br class="d-none d-md-block" />
      When do you plan to start working on {{ projectState.name }}?
    </p>
    <div class="d-flex flex-column flex-md-row mb-8 col-sm-6 py-0 px-0">
      <v-form v-model="valid" class="flex">
        <v-radio-group
          v-model="start"
          mandatory
        >
          <v-radio
            label="Now"
            value="now"
          />
          <v-radio
            :label="`Next ${items[projectState.switchDayOfWeek]}`"
            value="nextRecapPlanDay"
          />
        </v-radio-group>
      </v-form>
    </div>
    <div class="pa-0 col-md-4 pb-3 pr-md-3">
      <v-btn
        class=" body-2 font-weight-bold text-none col-12"
        color="primary"
        depressed
        :disabled="!valid"
        @click.native="onSubmit"
      >
        Continue
      </v-btn>
    </div>
  </div>
</template>

<script type="js">
export default {
  name: 'ProjectStartPage',
  middleware: 'auth',
  asyncData({ redirect, store }) {
    if (!store.state['new-project'].id) redirect('/app/start')
  },
  data() {
    return {
      items: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      valid: false,
      start: '',
      startRules: [
        v => !!v || 'A start is required',
      ]
    }
  },
  computed: {
    projectState() {
      return this.$store.state['new-project']
    },
  },
  methods: {
    onSubmit() {
      this.$axios
        .put('/api/project/start', {
          id: this.projectState.id,
          switchDayOfWeek: this.projectState.switchDayOfWeek,
          start: this.start,
        })
        .then(({ data }) => {
          this.$store.dispatch('new-project/update', data)
          this.$router.push(`/app/projects/${data.id}/ready`)
        })
    }
  },
}
</script>
