<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from "vue-property-decorator"
import { Action } from "vuex-class"
import HelloWorld from "@/components/HelloWorld.vue"
import moment from "moment"
import { City, ApiCity } from "@/types/city"

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  @Action("updateDate") updateDate!: Function

  created(): void {
    this.updateDate({ type: "start", date: moment() })
  }
}
</script>
