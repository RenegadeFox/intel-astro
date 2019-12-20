<template>
  <button v-bind="$attrs" v-on="listeners" class="button">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class BaseSubHeader extends Vue {
  @Prop({ required: true, type: String }) text!: string

  get listeners() {
    return { ...this.$listeners }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
