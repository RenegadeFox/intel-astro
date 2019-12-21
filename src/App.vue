<template>
  <div id="app">
    <base-header class="header" />

    <base-sub-header class="sub-header" />

    <router-view class="page-content-container" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import { Action } from "vuex-class"
import BaseHeader from "@/components/BaseHeader.vue"
import BaseSubHeader from "@/components/BaseSubHeader.vue"

@Component({
  components: {
    BaseHeader,
    BaseSubHeader
  }
})
export default class Layout extends Vue {
  @Action("updatePage") updatePage!: Function

  @Watch("$route")
  onRouteChange(to: any, from: any): void {
    this.updatePage(this.$router.currentRoute.name)
  }

  created(): void {
    this.updatePage(this.$router.currentRoute.name)
  }
}
</script>

<style lang="scss"></style>
