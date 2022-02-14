<template>
  <div class="mt-16 d-flex flex-column">
    <h1 class="text-h4 mb-12">Let’s dive into it!</h1>
    <p class="mb-4">
      Now is time to lay the first brick of this journey!
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
    <v-btn
      class="new-project__submit body-2 font-weight-bold text-none col-sm-6 col-md-4 ml-0"
      color="primary"
      depressed
      :disabled="!valid"
      @click.native="onSubmit"
    >
      Continue
    </v-btn>
  </div>
</template>

<script lang="js">
export default {
  name: 'NewProjectPage',
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
