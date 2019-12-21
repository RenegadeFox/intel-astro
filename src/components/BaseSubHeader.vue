<template>
  <p class="text-faded" v-html="pageMessage"></p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Getter, State } from "vuex-class"
import { City } from "@/types/city"

@Component
export default class BaseSubHeader extends Vue {
  @Getter("getPageMessage") getPageMessage!: string
  @State location!: City
  @State dateRange!: Array<Date>

  get pageMessage(): string {
    const startDate = `${this.dateRange[0].getDate()} ${this.dateRange[0].toLocaleString(
      "default",
      { month: "short" }
    )}`
    const endDate = `${this.dateRange[
      this.dateRange.length - 1
    ].getDate()} ${this.dateRange[this.dateRange.length - 1].toLocaleString(
      "default",
      {
        month: "short"
      }
    )}`

    return this.getPageMessage
      .replace("{city}", `${this.location.city}, ${this.location.state}`)
      .replace("{startDate}", startDate)
      .replace("{endDate}", endDate)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  text-align: center;
  font-size: 20px;
}
</style>
