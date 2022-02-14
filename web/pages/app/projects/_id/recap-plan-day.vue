<template>
  <div class="mt-16 d-flex flex-column">
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
      Which day of the week would you suit you best to work efficiently on these
      recap/plan tasks?
    </p>
    <div class="d-flex flex-column flex-md-row mb-8 col-sm-6 py-0 px-0">
      <v-form v-model="valid" class="flex">
        <v-select
          v-model="planDayOfWeek"
          :rules="planDayOfWeekRules"
          :items="items"
          :label="`Recap/Plan Day for ${projectState.name}`"
          outlined
        />
      </v-form>
    </div>
    <v-btn
      class="body-2 font-weight-bold text-none mb-8 col-sm-6 col-md-4 ml-0"
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
      planDayOfWeek: '',
      planDayOfWeekRules: [
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
          planDayOfWeek: this.planDayOfWeek,
        })
        .then(({ data }) => {
          this.$store.dispatch('new-project/update', data)
          this.$router.push(`/app/projects/${data.id}/start`)
        })
    }
  },
}
</script>
