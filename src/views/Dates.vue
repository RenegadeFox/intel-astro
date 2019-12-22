<template>
  <div id="dates">
    <calendar class="calendar-container" @dateSelected="userSelectedDate" />
  </div>
</template>

<script lang="ts">
import axios from "axios"
import { Component, Vue } from "vue-property-decorator"
import { Action } from "vuex-class"
import Calendar from "@/components/Calendar.vue"
import { DateRange } from "@/components/Calendar.vue"

@Component({
  components: {
    Calendar
  }
})
export default class App extends Vue {
  @Action("updateDateRange") updateDateRange!: Function
  @Action("updatePage") updatePage!: Function

  userSelectedDate({ startDate, endDate, allDates }: DateRange): void {
    if (allDates.length > 1) {
      // Add to Vuex store
      this.updateDateRange(allDates)
      // Redirect to astro data page
      this.$router.push({ name: "astro-data" })
    } else if (allDates.length < 2) {
      // Otherwise, if only first date is selected
      // Change the subheader to say "Select end date"
      this.updatePage("endDate")
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/breakpoints";

#dates {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
}

@include breakpoint(tablet) {
  .calendar-container {
    width: 400px;
    height: 400px;
    justify-self: center;
  }
}

@include breakpoint(laptop) {
  .calendar-container {
    width: 400px;
    height: 400px;
    justify-self: center;
  }
}

@include breakpoint(desktop) {
  .calendar-container {
    width: 400px;
    height: 400px;
    justify-self: center;
  }
}
</style>
