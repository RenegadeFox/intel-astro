<template>
  <p class="text-faded">Easily get up to date astronomical weather data</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class BaseSubHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  text-align: center;
  font-size: 20px;
}
</style>
