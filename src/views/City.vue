<template>
  <div class="city">
    <autocomplete
      :items="cities"
      :is-async="true"
      results-class="results-container"
      classes="text-field full-width"
      placeholder="Search worldwide cities..."
      @onSelect="citySelected"
      @onChange="fetchCities"
    >
      <template v-slot:results-item="{ item, isActive, onSelect }">
        <li
          class="results-item"
          :class="{ 'results-item-active': isActive }"
          @click="onSelect(item)"
        >
          {{ getFormattedName(item) }}
        </li>
      </template>
    </autocomplete>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { Action } from "vuex-class"
import axios from "axios"
import { ApiCity } from "@/types/city"
import Autocomplete from "@/components/Autocomplete.vue"
import getState from "@/assets/helpers"

@Component({
  components: {
    Autocomplete
  }
})
export default class City extends Vue {
  cities: Array<ApiCity> = []
  maxResults: number = 5

  @Action("updateLocation") updateLocation!: Function

  /**
   *Get the city + U.S. state abbreviation/country
   *
   * @param {ApiCity} item City to be formatted
   * @returns {string} Formatted city/state name
   */
  getFormattedName(item: ApiCity): string {
    const city: string = item.name.split(", ")[0]
    const state: string = getState(item)

    return `${city}, ${state}`
  }

  /**
   *Triggered when the user selects a city from the results
   *
   * @param {ApiCity} city City the user has selected
   */
  citySelected(city: ApiCity): void {
    // Update the Vux store with the selected city
    this.updateLocation(city)

    // Push the user to the next page (dates)
    this.$router.push({ name: "dates" })
  }

  /**
   *Fetch the city from the City Geo-Location Lookup API server
   *
   * @param {string} query Query string to fetch the cities with
   */
  async fetchCities(query: string): Promise<any> {
    try {
      // Attempt to fetch the results from the API server and store them in `response`
      const response = await axios({
        method: "GET",
        url:
          "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
          "x-rapidapi-key": "120eed9909mshad67747bfdf2b8dp1c9a97jsn5858371c3f8f"
        },
        params: {
          location: query
        }
      })

      // Update the local cities Array, but limit it based on the set max limit
      this.cities = response.data.Results.slice(0, this.maxResults)
    } catch (error) {
      console.error(
        `[Error] There was an error fetching the cities from the API\n
        ${error}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/globals.scss";

.results-container {
  position: absolute;
  background: $translucent-white;

  .results-item {
    border: none;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 0px;
    padding-left: 10px;
    width: 100%;
    text-align: left;
  }

  .results-item-active {
    background-color: $primary;
    color: white;
  }
}
</style>
