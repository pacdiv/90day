<template>
  <div class="mt-16 d-flex flex-column">
    <p class="text-h6">New project: Step 4 out of 5</h1>
    <h1 class="text-h4 mb-12">When will you smartly plan your next moves?</h1>
    <p class="mb-3">
      To allow you to regularly rethink the direction you have taken, the 90-day
      method is weekly based.
    </p>
    <p class="mb-3">
      Once a week, you’ll write down what would have worked or failed during the
      previous week.
      <br class="d-none d-md-block" />After that, you’ll be able to plan your
      main goals for the incoming week based on these information.
    </p>
    <p class="mb-8">
      Which day of the week would suit you best to work efficiently on these
      recap/plan tasks?
    </p>
    <div class="d-flex flex-column flex-md-row mb-8 col-sm-6 py-0 px-0">
      <v-form v-model="valid" class="flex">
        <v-select
          v-model="switchDayOfWeek"
          :rules="switchDayOfWeekRules"
          :items="items"
          :label="`Recap/Plan Day for ${projectState.name}`"
          outlined
        />
      </v-form>
    </div>
    <div class="pa-0 col-md-4 pb-3 pr-md-3">
      <v-btn
        class="body-2 font-weight-bold text-none col-12"
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
  name: 'ProjectPlanDayPage',
  asyncData({ redirect, store }) {
    if (!store.state['new-project'].id) redirect('/app/start')
  },
  data() {
    return {
      items: [
        { text: 'every sunday', value: 0 },
        { text: 'every monday', value: 1 },
        { text: 'every tuesday', value: 2 },
        { text: 'every wednesday', value: 3 },
        { text: 'every thursday', value: 4 },
        { text: 'every friday', value: 5 },
        { text: 'every saturday', value: 6 },
      ],
      valid: false,
      switchDayOfWeek: '',
      switchDayOfWeekRules: [
        v => v >= 0 && v <= 6 || 'A Recap/Plan Day is required',
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
        .put('/api/project/plan-recap-day', {
          id: this.projectState.id,
          switchDayOfWeek: this.switchDayOfWeek,
        })
        .then(({ data }) => {
          this.$store.dispatch('new-project/update', data)
          this.$router.push(`/app/projects/${data.id}/start`)
        })
    }
  },
}
</script>
