<template>
  <div />
</template>

<script>
export default {
  name: 'LogoutPage',
  mounted() {
    this.$auth.logout()
  },
}
</script>
