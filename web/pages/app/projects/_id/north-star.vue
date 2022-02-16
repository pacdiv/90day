<template>
  <div class="mt-16 d-flex flex-column">
    <p class="text-h6">New project: Step 3 out of 5</h1>
    <h1 class="text-h4 mb-12">The North Star metric, your “why”</h1>
    <p class="mb-3">
      Heads to the grindstone, we humans tend to lose focus on the main goal
      over time.
      <br class="d-none d-md-block" />
      Solve this by defining your North Star metric which is the one measurement
      of success of your goal.
    </p>
    <p class="mb-8">
      Project yourself in approximately 90 days from now.<br
        class="d-none d-md-block"
      />
      What’s the one measure that will determine if
      <span class="font-weight-bold">{{ projectState.name }}</span> is
      {{ questionProps.suffix }}
    </p>
    <div
      class="d-flex flex-column flex-md-row mb-8 col-sm-6 py-0 px-0"
    >
      <v-form v-model="valid" class="flex">
        <v-textarea
          v-model="northStar"
          :rules="northStarRules"
          :counter="80"
          :label="`North Star for ${projectState.name}`"
          :placeholder="questionProps.placeholder"
          outlined
          rows="3"
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

<script lang="js">
export default {
  name: 'ProjectNorthStarPage',
  asyncData({ redirect, store }) {
    if (!store.state['new-project'].id) redirect('/app/start')
  },
  data() {
    return {
      valid: false,
      northStar: '',
      northStarRules: [
        v => !!v || 'A North Star is required',
        v => v.length <= 80 || 'The North Star must be less than 80 characters',
      ]
    }
  },
  computed: {
    projectState() {
      return this.$store.state['new-project']
    },
    questionProps() {
      switch(this.projectState.type) {
        case 'validate':
          return {
            placeholder: 'Example: 100 unique visitors should have pressed my landing page’s fake BUY button',
            suffix: 'a successfully validated project/idea?'
          }
        case 'build':
          return {
            placeholder: 'Example: My website should have 100 daily uniques visitors',
            suffix: 'a successfully built project/MVP?'
          }
        case 'achieve':
        default:
          return {
            placeholder: 'Examples: I should have started my new job, I should have hired my very first employee',
            suffix: 'an achieved major goal of yours?'
          }
      }
    },
  },
  methods: {
    onSubmit() {
      this.$axios
        .put('/api/project/north-star', {
          id: this.projectState.id,
          northStar: this.northStar,
        })
        .then(({ data }) => {
          this.$store.dispatch('new-project/update', data)
          this.$router.push(`/app/projects/${data.id}/recap-plan-day`)
        })
    }
  },
}
</script>
