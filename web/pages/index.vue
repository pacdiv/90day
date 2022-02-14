<template>
  <div>
    <p>index page</p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({ redirect }) {
    redirect('/app/start')
  },
}
</script>
