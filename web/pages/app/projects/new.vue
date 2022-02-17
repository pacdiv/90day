<template>
  <div class="mt-16 d-flex flex-column">
    <p class="text-h6">New project: Step 2 out of 5</h1>
    <h1 class="text-h4 mb-12">What’s its name?</h1>
    <p class="mb-4">
      Now is time to make this first step on this journey!
      <br class="d-none d-md-block" />
      Give your project a name.
    </p>
    <div class="px-0 col-sm-6">
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="25"
          label="Project name"
          outlined
          required
        />
      </v-form>
    </div>
    <div class="pa-0 col-md-4 pb-3 pr-md-3">
      <v-btn
        class="new-project__submit body-2 font-weight-bold text-none col-12"
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
  name: 'NewProjectPage',
  middleware: 'auth',
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || !v.trim() || 'A name is required',
        v => v.length <= 25 || 'Name must be less than 25 characters',
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('/api/project/create', {
          name: this.name,
          type: this.$route.query.why
        })
        .then(({ data }) => {
          this.$store.dispatch('new-project/update', data)
          this.$router.push(`/app/projects/${data.id}/north-star`)
        })
    }
  },
}
</script>
