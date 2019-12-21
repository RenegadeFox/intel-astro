<template>
  <div class="calendar-container">
    <div class="header">
      <!-- Previous year/month arrows -->
      <a class="arrow" @click.prevent="moveToPreviousYear">&laquo;</a>
      <a class="arrow" @click.prevent="moveToPreviousMonth">&lsaquo;</a>

      <!-- Header content -->
      <span class="title" @click="moveToCurrentMonth">
        {{ header.label }}
      </span>

      <!-- Next year/month arrows -->
      <a class="arrow" @click.prevent="moveToNextMonth">&rsaquo;</a>
      <a class="arrow" @click.prevent="moveToNextYear">&raquo;</a>
    </div>

    <!-- Weekday labels -->
    <div class="weekday-labels-container">
      <div
        class="weekday-label"
        v-for="weekday in weekdays"
        :key="`week-label-${weekday.number}`"
      >
        {{ weekday.label_3 }}
      </div>
    </div>

    <!-- All days in the month -->
    <div
      class="week-container"
      v-for="(week, index) in weeks"
      :key="`week-${index}`"
    >
      <!-- Individual days within the week -->
      <div
        class="day"
        :class="{
          today: day.isToday,
          'previous-months-day': day.isPreviousMonth,
          'next-months-day': day.isNextMonth,
          selected: isDateSelected(day)
        }"
        v-for="(day, index) in week"
        :key="`day-${index}`"
        @click="selectDate(day)"
      >
        <span class="day-label">
          {{ day.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

// Type definitions
export interface CurrentDateComp {
  year: number
  month: number
  day: number
}

export interface OtherDateComp {
  year: number
  month: number
  days: number
}

export interface LabelsObj {
  label: string
  label_1: string
  label_2: string
  label_3: string
  number: number
}

export interface Header {
  month: LabelsObj
  year: string
  shortYear: string
  label: string
}

export interface Day {
  label: string
  day: number
  weekday: number
  week: number
  month: number
  year: number
  date: Date
  isPreviousMonth: boolean
  isNextMonth: boolean
  isCurrentMonth: boolean
  isToday: boolean
  isFirstDay: boolean
  isLastDay: boolean
  isSelected: boolean
}

export interface DateRange {
  startDate: Date
  endDate: Date
  allDates: Array<Date>
}

// Global Constants
const _monthLength: number = 0
const _monthCasing: string = "title"
const _weekdayLength: number = 3
const _weekdayCasing: string = "title"
const _today: Date = new Date()
const _todayComps: CurrentDateComp = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate()
}
const _weekdayLabels: Array<string> = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
const _monthLabels: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
const _daysInMonths: Array<number> = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

const addDay = (date: Date) => {
  // year, Check if last day in the year
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate() + 1

  // Check if new year
  if (month === 11 && day > 31) {
    year++
    month = 0
    day = 1
  } else if (day > _daysInMonths[month]) {
    // Otherwise, check if last day in month of the same year
    month++
    day = 1
  }

  return new Date(year, month, day)
}

const subtractDay = (date: Date) => {
  // year, Check if last day in the year
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate() - 1

  // Check if new year
  if (month === 0 && day > 1) {
    year--
    month = 11
    day = 31
  } else if (day < 1) {
    // Otherwise, check if last day in month of the same year
    month--
    day = _daysInMonths[month]
  }

  return new Date(year, month, day)
}

@Component
export default class Calendar extends Vue {
  month = _todayComps.month as number
  year = _todayComps.year as number
  selectedDates = [] as Array<Date>

  // Deal with date selection
  selectDate(day: Day): void {
    // Check if this is the first or second date added to the Array
    if (this.selectedDates.length === 0) {
      // Add to the selected dates Array to change the style of the calendar for the selected dates
      this.selectedDates.push(day.date)
    } else {
      // Otherwise, add all dates between the selected date and the first date

      // Contains the date to start the date range with
      let startDate = this.selectedDates[0]
      // Contains the date to end the date range with
      let endDate = day.date
      // Date to be used within the loop
      let loopDate: Date = startDate

      // Check if the last selected date is before the first selected date
      if (this.selectedDates[0].getTime() > day.date.getTime()) {
        startDate = day.date
        endDate = this.selectedDates[0]
      }

      this.selectedDates = []
      loopDate = startDate

      while (loopDate.getTime() <= endDate.getTime()) {
        this.selectedDates.push(loopDate)
        // Increment the date by a day
        loopDate = addDay(loopDate)
      }
    }

    const sortDates = (a: Date, b: Date) => a.getTime() - b.getTime()
    const dates = this.selectedDates.sort(sortDates)

    this.$emit("dateSelected", {
      allDates: this.selectedDates as Array<Date>,
      startDate: dates.sort(sortDates)[0] as Date,
      endDate: dates[dates.length - 1] as Date
    })
  }

  isDateSelected(day: Day): boolean {
    return (
      this.selectedDates.filter((item) => item.getTime() === day.date.getTime())
        .length > 0
    )
  }

  moveToCurrentMonth(): void {
    this.month = _todayComps.month
    this.year = _todayComps.year
  }

  moveToNextMonth(): void {
    const { month, year } = this.nextMonthComps
    this.month = month
    this.year = year
  }

  moveToPreviousMonth(): void {
    const { month, year } = this.previousMonthComps
    this.month = month
    this.year = year
  }

  moveToNextYear(): void {
    // Increment the year
    this.year++
  }

  moveToPreviousYear(): void {
    // Decrement the year
    this.year--
  }

  // Whether or not we are currently in a leap year
  get isLeapYear(): boolean {
    return (
      (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
    )
  }

  // Data components for the previous month
  get previousMonthComps(): OtherDateComp {
    // Check if date is first month of the year
    if (this.month === 1) {
      return {
        year: this.year - 1,
        month: 12,
        days: _daysInMonths[11]
      }
    }

    // Otherwise, return the previous month of the same year
    return {
      year: this.year,
      month: this.month - 1,
      days:
        this.month === 2 && this.isLeapYear
          ? 29
          : _daysInMonths[this.monthIndex - 1]
    }
  }

  // Data components for the next month
  get nextMonthComps(): OtherDateComp {
    // Check if date is first month of the year
    if (this.month === 12) {
      return {
        year: this.year + 1,
        month: 1,
        days: _daysInMonths[0]
      }
    }

    // Otherwise, return the next month of the same year
    return {
      year: this.year,
      month: this.month + 1,
      days:
        this.month === 2 && this.isLeapYear
          ? 29
          : _daysInMonths[this.monthIndex + 1]
    }
  }

  // The component exposes month as 1-based, but sometimes we need 0-based
  get monthIndex(): number {
    return this.month - 1
  }

  // State referenced by the header
  get months(): Array<LabelsObj> {
    return _monthLabels.map((label: string, index: number) => {
      return {
        label: label,
        label_1: label.substring(0, 1),
        label_2: label.substring(0, 2),
        label_3: label.substring(0, 3),
        number: index + 1
      }
    })
  }

  // State referenced for weekday headers
  get weekdays(): Array<LabelsObj> {
    return _weekdayLabels.map((label: string, index: number) => {
      return {
        label: label,
        label_1: label.substring(0, 1),
        label_2: label.substring(0, 2),
        label_3: label.substring(0, 3),
        number: index + 1
      }
    })
  }

  // State for the calendar header
  get header(): Header {
    // Stores the current month object
    const month: LabelsObj = this.months[this.monthIndex]
    // Stores the current year as a string
    const year: string = this.year.toString()

    return {
      month,
      year,
      shortYear: year.substring(2, 4),
      label: `${month.label} ${this.year}`
    }
  }

  // Returns number for first weekday (1-7), starting from Sunday
  get firstWeekdayInMonth(): number {
    return new Date(this.year, this.monthIndex, 1).getDay() + 1
  }

  // Returns number of days in the current month
  get daysInMonth(): number {
    // If it's February on a leap year, return 29
    if (this.month === 2 && this.isLeapYear) return 29

    // Otherwise, return the number of days of the normal month
    return _daysInMonths[this.monthIndex]
  }

  get weeks(): Array<Array<Day>> {
    // Stores all weeks for the specified month
    const allWeeks: Array<Array<Day>> = []
    // Whether or not it is currently the previous month
    let isPreviousMonth: boolean = true
    // Whether or not it is currently this month (current month)
    let isCurrentMonth: boolean = false
    // Whether or not it is currently the next month
    let isNextMonth: boolean = false
    // Current day in the month loop
    let day: number =
      this.previousMonthComps.days - this.firstWeekdayInMonth + 2
    // Current month in the loop
    let month = this.previousMonthComps.month
    // Current year in the loop
    let year = this.previousMonthComps.year

    // Loop through each week in the month, up to 6 total
    for (let currentWeek = 1; currentWeek <= 6 && !isNextMonth; currentWeek++) {
      const currentWeekdays: Array<Day> = []

      // Loop through each weekday in the current week in the parent loop
      for (let currentDay = 1; currentDay <= 7; currentDay++) {
        // Check when to start counting actual month days (not previous or next month's days)
        if (isPreviousMonth && currentDay >= this.firstWeekdayInMonth) {
          // Reset day/month/year counters
          day = 1
          month = this.month
          year = this.year

          // And flag that we're tracking current month days
          isPreviousMonth = false
          isCurrentMonth = true
        }

        // Create the day info Object
        const dayInfo: Day = {
          label: day ? day.toString() : "",
          day,
          weekday: currentDay,
          week: currentWeek,
          month,
          year,
          date: new Date(year, month - 1, day),
          isPreviousMonth,
          isNextMonth,
          isCurrentMonth,
          isToday:
            day === _todayComps.day &&
            month === _todayComps.month &&
            year === _todayComps.year,
          isFirstDay: isCurrentMonth && day === 1,
          isLastDay: isCurrentMonth && day === this.daysInMonth,
          isSelected: false
        }

        // Trigger the configure day event
        this.$emit("configureDay", dayInfo)

        // Append the day onto the current week
        currentWeekdays.push(dayInfo)

        // Check if we've hit the last day of the month
        if (isCurrentMonth && day >= this.daysInMonth) {
          isCurrentMonth = false
          isNextMonth = true
          day = 1
          month = this.nextMonthComps.month
          year = this.nextMonthComps.year
        } else {
          // Otherwise, we're still in the middle of the current month
          // So increment the day
          day++
        }
      } // End - Days loop

      // Append the week info for the month
      allWeeks.push(currentWeekdays)
    } // End - Weeks loop

    return allWeeks
  } // End - Weeks computed property
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/globals.scss";

.calendar-container {
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "header"
    "weekdayLabels"
    "days";
  user-select: none;
}

.header {
  grid-area: header;
  justify-self: stretch;
  color: #000;
  cursor: pointer;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 0.1fr 0.1fr auto 0.1fr 0.1fr;
  grid-template-areas: auto;
}

.arrow {
  color: #000;
  cursor: pointer;
  padding: 0 0.4em 0.2em 0.4em;
  font-size: 1.8em;
  font-weight: 500;
  place-self: center;
}

.title {
  cursor: pointer;
  font-size: 1.2em;
  text-align: center;
  place-self: center;
}

.weekday-labels-container {
  grid-area: weekdayLabels;
  display: grid;
  grid-template-columns: repeat(7, 14.2857%);
  grid-template-rows: auto;
}

.weekday-label {
  justify-self: stretch;
  align-self: stretch;
  text-align: center;
  padding: 0.4em 0;
  color: #000;
  font-weight: bold;
  box-sizing: border-box;
}

.week-container {
  display: grid;
  grid-template-columns: repeat(7, 14.2857%);
  grid-template-rows: repeat(6, auto);
}

.day {
  height: 50px;
  color: #000;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
}

.day-label {
  /* Center the text in the parent element (.day) */
  margin: auto;
  box-sizing: border-box;
}

.today {
  font-weight: 500;
  color: #fff;

  .day-label {
    background: $primary;
    padding: 10px;
    border-radius: 20px;
  }
}

.selected {
  color: #fff;
  background: primaryColor(0.5);
  padding-top: 5px;
  border-bottom: 5px solid secondaryColor(0.75);
}

.previous-months-day,
.next-months-day {
  color: $faded;
}
</style>
