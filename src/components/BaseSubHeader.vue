<template>
  <p class="text-faded" v-html="pageMessage" v-if="page !== 'astro-data'"></p>
  <p class="text-faded" v-else>
    Showing astro data in
    <br />
    <router-link to="/city">{{ formattedName }}</router-link>
    <br />
    from
    <router-link to="/dates">
      {{ dateRange[0].toLocaleString("default", { month: "short" }) }}
      {{ dateRange[0].getDate() }}
    </router-link>
    until
    <router-link to="/dates">
      {{
        dateRange[dateRange.length - 1].toLocaleString("default", {
          month: "short"
        })
      }}
      {{ dateRange[dateRange.length - 1].getDate() }}
    </router-link>
  </p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Getter, State } from "vuex-class"
import { City } from "@/types/city"
import { getStateFromString } from "@/assets/helpers"

@Component
export default class BaseSubHeader extends Vue {
  @Getter("getPageMessage") getPageMessage!: string
  @State page!: string
  @State location!: City
  @State dateRange!: Array<Date>

  get pageMessage(): string {
    if (this.dateRange.length > 1) {
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
        .replace(
          "{city}",
          `<a @click.prevent='$router.push("/city")'>${this.location.city}, ${this.location.state}</a>`
        )
        .replace(
          "{startDate}",
          `<a @click.prevent='$router.push("/dates")'>${startDate}</a>`
        )
        .replace(
          "{endDate}",
          `<a @click.prevent='$router.push("/dates")'>${endDate}</a>`
        )
    } else {
      return this.getPageMessage
    }
  }

  /**
   *Get the city + U.S. state abbreviation/country
   *
   * @param {ApiCity} item City to be formatted
   * @returns {string} Formatted city/state name
   */
  get formattedName(): string {
    return `${this.location.city}, ${getStateFromString(this.location.state)}`
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
