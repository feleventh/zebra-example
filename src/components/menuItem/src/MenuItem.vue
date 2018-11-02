<template>
  <router-link :to="path">{{pathName}}</router-link>
</template>
<script>
export default {
  name: 'ZbMenuItem',
  props: {
    path: {
      type: String,
      default: '/'
    },
    pathName: {
      type: String
    }
  }
}
</script>
