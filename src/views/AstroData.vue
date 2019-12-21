<template>
  <div class="astro-data">
    <card
      v-for="item in datesToDisplay"
      :key="item.date.getTime()"
      class="cards"
      :date="item.date"
      :sun="item.sun"
      :moon="item.moon"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import * as SunCalc from "suncalc"
import { State } from "vuex-class"
import { City } from "@/types/city"
import Card from "@/components/Card.vue"
import { SunTimes, MoonTimes, AstroCard } from "@/types/AstroTimes"

@Component({
  components: {
    Card
  }
})
export default class AstroData extends Vue {
  @State location!: City
  @State dateRange!: Array<Date>

  get datesToDisplay(): Array<AstroCard> {
    // Loop through each date in the dateRange Array
    return this.dateRange.map((dateItem: Date) => {
      // Holds all sun times (rise, set, BMNT, EENT)
      const sunTimes = SunCalc.getTimes(
        dateItem,
        this.location.lat,
        this.location.long
      )
      // Holds all moon times (rise, set, illum, alwaysUp, alwaysDown)
      const moonTimes = SunCalc.getMoonTimes(
        dateItem,
        this.location.lat,
        this.location.long
      )
      return {
        date: dateItem,
        sun: {
          rise: sunTimes.sunrise,
          set: sunTimes.sunset,
          bmnt: sunTimes.nauticalDawn,
          eent: sunTimes.nauticalDusk
        } as SunTimes,
        moon: {
          rise: moonTimes.rise,
          set: moonTimes.set,
          alwaysUp: moonTimes.alwaysUp,
          alwaysDown: moonTimes.alwaysDown,
          illumination: SunCalc.getMoonIllumination(dateItem).fraction
        } as MoonTimes
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.astro-data {
  width: 100%;
  margin-top: 50px;
  align-self: start;
  display: grid;

  .cards {
    justify-self: center;
    width: 90%;
  }
}
</style>
