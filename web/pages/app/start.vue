<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">Why do you need to use ninety?</h1>
    <p class="mb-8">
      Don’t worry, it’s just a formal start! You’ll still have access to every
      feature.<br class="d-none d-md-block" />
      Tap on the card which suits you best.
    </p>
    <div class="d-flex flex-column flex-md-row mb-8">
      <div
        v-for="need in needs"
        :key="`need-${need.key}`"
        class="pa-0 col-md-4 pb-3 pr-md-3 flex"
        role="button"
        tabindex="0"
        @click="onNeedClick(need.key)"
      >
        <div
          :class="[
            'start__need pa-6 mb-md-4 d-flex align-center rounded lighten-5',
            selectedNeed === need.key ? 'green' : 'grey',
          ]"
        >
          <img
            class="start__need-illustration mr-4 mr-md-6"
            :src="`/images/${need.icon}`"
          />
          <div>
            <h2 class="text-h6">{{ need.title }}</h2>
            <p class="body-1 mb-0">{{ need.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-sm-center mr-md-3">
      <v-btn
        class="start__submit body-2 font-weight-bold text-none col-sm-6 col-md-4"
        color="primary"
        depressed
        :disabled="!selectedNeed"
        :to="`/app/project/new?why=${selectedNeed}`"
      >
        Continue
      </v-btn>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'StartPage',
  data() {
    return {
      needs: [
        {
          key: 'validate',
          icon: 'prototyping.svg',
          subtitle: 'an idea or project before building it',
          title: 'Validate',
        },
        {
          key: 'build',
          icon: 'programming.svg',
          subtitle: 'a project or a minimal viable product (MVP)',
          title: 'Build',
        },
        {
          key: 'achieve',
          icon: 'desert.svg',
          subtitle: 'a major goal that matters to you',
          title: 'Achieve',
        },
      ],
      selectedNeed: '',
    }
  },
  methods: {
    onNeedClick(nextSelectedNeed) {
      this.selectedNeed = nextSelectedNeed
    },
  },
}
</script>

<style lang="scss" scoped>
.start {
  &__need {
    cursor: pointer;
    min-height: 100%;
    transition: background-color 300ms ease-in-out;
  }

  &__need-illustration {
    max-width: 6em;
  }

  &__submit {
    transition: background-color 300ms ease-in-out;
  }
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .start {
    &__need-illustration {
      max-width: 5em;
    }
  }
}
</style>
