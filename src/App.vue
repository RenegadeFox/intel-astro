<template>
  <div id="app">
    <base-header class="header" />

    <base-sub-header class="sub-header" />

    <router-view class="page-content-container" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import BaseHeader from "@/components/BaseHeader.vue"
import BaseSubHeader from "@/components/BaseSubHeader.vue"

@Component({
  components: {
    BaseHeader,
    BaseSubHeader
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss"></style>
