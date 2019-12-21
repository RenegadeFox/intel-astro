<template>
  <div id="app">
    <base-header class="header" />

    <base-sub-header class="sub-header" />

    <router-view class="page-content-container" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import { Action, Getter, State } from "vuex-class"
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
  @Getter("hasSelectedCity") hasSelectedCity!: boolean

  @Watch("$route")
  onRouteChange(to: any, from: any): void {
    this.updatePageName()
  }

  created(): void {
    // Check if user is passed the welcome page and has not selected a date yet
    if (
      !this.hasSelectedCity &&
      (this.$router.currentRoute.name === "dates" ||
        this.$router.currentRoute.name === "astro-data")
    ) {
      this.$router.push({ name: "welcome" })
    }

    this.updatePageName()
  }

  updatePageName(): void {
    this.updatePage(this.$router.currentRoute.name)
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/globals";

html,
body {
  padding: 0px;
  margin: 0px;
  background: $main-gradient;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

a {
  color: #fff;
}
</style>
