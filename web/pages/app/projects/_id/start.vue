<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">Almost there! When do you start working?</h1>
    <p class="mb-3">
      One last information to fill and your project will be set!
      <br class="d-none d-md-block" />
      When do you plan tp start working on {{ projectState.name }}?
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
            :label="`Next ${items[projectState.planDayOfWeek]}`"
            value="nextRecapPlanDay"
          />
        </v-radio-group>
      </v-form>
    </div>
    <v-btn
      class=" body-2 font-weight-bold text-none mb-8 col-sm-6 col-md-4 ml-0"
      color="primary"
      depressed
      :disabled="!valid"
      @click.native="onSubmit"
    >
      Continue
    </v-btn>
  </div>
</template>

<script type="js">
export default {
  name: 'ProjectStartPage',
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
          planDayOfWeek: this.projectState.planDayOfWeek,
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
