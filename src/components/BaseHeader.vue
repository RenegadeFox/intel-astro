<template>
  <header>
    Intel Astro
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class BaseHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  font-size: 64px;
  font-weight: lighter;
  font-family: "Roboto", sans-serif;
}
</style>
