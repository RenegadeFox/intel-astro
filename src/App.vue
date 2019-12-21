<template>
  <div id="app">
    <base-header class="header" />

    <base-sub-header class="sub-header" />

    <router-view class="page-content-container" />

    <base-footer class="footer" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import { Action, Getter, State } from "vuex-class"
import BaseHeader from "@/components/BaseHeader.vue"
import BaseSubHeader from "@/components/BaseSubHeader.vue"
import BaseFooter from "@/components/BaseFooter.vue"

@Component({
  components: {
    BaseHeader,
    BaseSubHeader,
    BaseFooter
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

#app {
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  display: grid;
  grid-template-columns: 10px auto 10px;
  grid-template-rows: 50px 100px 100px auto auto;
  grid-template-areas:
    ". . ."
    ". header ."
    ". sub-header ."
    "content content content"
    "footer footer footer";
}

.header {
  grid-area: header;
  text-align: center;
  align-self: center;
}

.sub-header {
  grid-area: sub-header;
  text-align: center;
  align-self: center;
}

.page-content-container {
  grid-area: content;
}

.footer {
  grid-area: footer;
  align-self: end;
  margin-bottom: -230px;
}
</style>
