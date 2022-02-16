<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-1">{{ projectState.name }}</h1>
    <h1 class="body-1 mb-12">{{ projectState.period }}</h1>
    <p class="text-h5 mb-1 text-uppercase">Your North Star </p>
    <p class="mb-12">
      {{ projectState.northStar }}
    </p>
    <p class="text-h5 mb-3 text-uppercase">Current week</p>
    <div class="mb-12 orange lighten-5 rounded pa-4">
      <p class="text-h6 mb-1">WEEK #{{ projectState.currentWeekIndex + 1 }}</p>
      <p class="body-1 mb-6">{{ projectState.currentWeek.period }}</p>
      <p class="cody-2">
        {{ projectState.currentWeek.goals.length || 'No goals defined yet.' }}
      </p>
    </div>
    <p
      v-if="projectState.previousWeeks.length"
      class="text-h5 mb-1 text-uppercase"
    >
      Previous weeks
    </p>
    <div
      v-for="(week, idx) in projectState.previousWeeks"
      :key="`week-${idx}`"
      class="mb-12 grey lighten-5 rounded pa-4"
    >
      <p class="text-h6 mb-1">WEEK #{{ idx + 1 }}</p>
      <p class="body-1 mb-6">{{ week.period }}</p>
      <p class="cody-2">
        {{ week.goals.length || 'No goals defined.' }}
      </p>
    </div>
  </div>
</template>

<script lang="js">
import dayjs from 'dayjs'

export default {
  name: 'ProjectPage',
  asyncData({ redirect, store }) {
    if (!store.state['new-project'].id) redirect('/app/start')
  },
  data() {},
  computed: {
    projectState() {
      const state = { ...this.$store.state['new-project'] }
      const currentWeek = state.weeks[state.currentWeekIndex]

      return {
        ...state,
        currentWeek: {
          ...currentWeek,
          period: this.generatePeriodTitle(currentWeek.startsOn, currentWeek.endsOn),
        },
        end: (new Date(state.end)).toGMTString(),
        period: this.generatePeriodTitle(state.start, state.end),
        previousWeeks: state.weeks.slice(0, state.currentWeekIndex).reverse().map(w => ({
          ...w,
          period: this.generatePeriodTitle(w.startsOn, w.endsOn),
        })),
        start: (new Date(state.start)).toGMTString(),
      }
    },
  },
  methods: {
    generatePeriodTitle(start, end) {
      const todayDate = dayjs()

      if (todayDate.isSame(start, 'day')) return 'Starts today'
      if (todayDate.isSame(end, 'day')) return 'Ends today'

      if (todayDate.isBefore(start, 'day'))
        return `Starts in ${todayDate.diff(start, 'day') * -1} days`

      const daysEndCount = todayDate.diff(end, 'day') * -1
      if (todayDate.isAfter(end, 'day')) return `Ended ${daysEndCount} days ago`

      return `Ends in ${daysEndCount} days`
    }
  },
}
</script>
