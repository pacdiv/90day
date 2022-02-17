<template>
  <div />
</template>

<script>
export default {
  name: 'LoginPage',
  mounted() {
    this.$auth.loginWith('auth0')
  },
}
</script>
