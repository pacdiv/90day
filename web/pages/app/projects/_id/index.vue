<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">{{ projectState.name }}</h1>
    <p class="mb-12 font-italic">
      Started on: {{ projectState.startedOn }}
      <br />
      Ending on: {{ projectState.endingOn }}
    </p>
    <p class="text-h5 mb-1">YOUR NORTH STAR</p>
    <p class="mb-12">
      {{ projectState.northStar }}
    </p>
    <div
      v-for="(week, idx) in projectState.weeks"
      :key="`week-${idx}`"
      class="mb-1 grey lighten-5 rounded pa-4"
    >
      <p class="text-h6 mb-0">WEEK #{{ idx + 1 }}</p>
      <p class="caption mb-6">{{ week.startsOn }} – {{ week.endsOn }}</p>
      <p class="cody-2">{{ !week.goals || 'No goals defined yet.' }}</p>
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
      return {
        ...state,
        endingOn: (new Date(state.end)).toGMTString(),
        startedOn: (new Date(state.start)).toGMTString(),
        weeks: [
          {
            endsOn: (dayjs(state.start).add(7, 'day')).format('DD/MM/YYYY'),
            goals: [],
            startsOn: dayjs(state.start).format('DD/MM/YYYY'),
          }
        ]
      }
    },
  },
}
</script>
