<template>
  <div id="dates">
    <calendar @dateSelected="userSelectedDate" />
  </div>
</template>

<script lang="ts">
import axios from "axios"
import { Component, Vue } from "vue-property-decorator"
import Calendar from "@/components/Calendar.vue"
import { DateRange } from "@/components/Calendar.vue"

@Component({
  components: {
    Calendar
  }
})
export default class App extends Vue {
  userSelectedDate({ startDate, endDate, allDates }: DateRange): void {
    if (allDates.length > 1) {
      // Add to Vuex store
      // Redirect to astro data page
    } else if (allDates.length < 2) {
      // Otherwise, if only first date is selected
      // Change the subheader to say "Select end date"
    }
  }
}
</script>

<style scoped></style>
