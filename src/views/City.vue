<template>
  <div class="city">
    <autocomplete
      :items="cities"
      v-model="textFieldValue"
      id="text-field"
      :is-async="true"
      :autofocus="true"
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
    <svg
      style="width:24px;height:24px"
      viewBox="0 0 24 24"
      v-if="isGeoLocating && canGeoLocate"
      @click="getGeoLocation"
      class="location-icon"
    >
      <path
        fill="#000000"
        d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
      />
    </svg>
    <svg
      style="width:24px;height:24px"
      viewBox="0 0 24 24"
      v-if="!canGeoLocate"
      class="cannot-locate"
    >
      <path
        fill="#000000"
        d="M16.37,16.1L11.75,11.47L11.64,11.36L3.27,3L2,4.27L5.18,7.45C5.06,7.95 5,8.46 5,9C5,14.25 12,22 12,22C12,22 13.67,20.15 15.37,17.65L18.73,21L20,19.72M12,6.5A2.5,2.5 0 0,1 14.5,9C14.5,9.73 14.17,10.39 13.67,10.85L17.3,14.5C18.28,12.62 19,10.68 19,9A7,7 0 0,0 12,2C10,2 8.24,2.82 6.96,4.14L10.15,7.33C10.61,6.82 11.26,6.5 12,6.5Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { Action } from "vuex-class"
import axios from "axios"
import { ApiCity, GeoLoc, City } from "@/types/city"
import Autocomplete from "@/components/Autocomplete.vue"
import { getStateFromObj, getStateFromString } from "@/assets/helpers"
import token from "@/geoConfig"

@Component({
  components: {
    Autocomplete
  }
})
export default class CityPage extends Vue {
  cities: Array<ApiCity> = []
  maxResults: number = 5
  isGeoLocating: boolean = true
  canGeoLocate: boolean = true
  isLoading: boolean = false
  textFieldValue: string = ""

  @Action("updateLocation") updateLocation!: Function

  async getGeoLocation(): Promise<any> {
    this.isGeoLocating = false
    this.isLoading = true

    try {
      // Attempt to fetch the results from the API server and store them in `response`
      const response = await axios({
        method: "GET",
        url: "https://www.ipinfo.io",
        params: {
          token
        }
      })

      const location = response.data

      // Check if response is not empty
      if (location !== "") {
        const newLocation: City = {
          isSet: true,
          fullName: `${location.city}, ${location.region}`,
          city: location.city,
          state: location.region,
          lat: parseFloat(location.loc.split(",")[0]),
          long: parseFloat(location.loc.split(",")[1])
        }

        this.updateLocation(newLocation)

        // Update the value of the text field
        this.textFieldValue = newLocation.fullName

        // Push the user to the next page (dates)
        this.$router.push({ name: "dates" })
      } else {
        this.canGeoLocate = false
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `[Error] There was an error getting your current location\n
        ${error}`
      )
    }
  }

  /**
   *Get the city + U.S. state abbreviation/country
   *
   * @param {ApiCity} item City to be formatted
   * @returns {string} Formatted city/state name
   */
  getFormattedName(item: ApiCity): string {
    const city: string = item.name.split(", ")[0]
    const state: string = getStateFromObj(item)

    return `${city}, ${state}`
  }

  /**
   *Triggered when the user selects a city from the results
   *
   * @param {ApiCity} city City the user has selected
   */
  citySelected(city: ApiCity): void {
    // Set the new location
    const newLocation: City = {
      isSet: true,
      fullName: this.getFormattedName(city),
      city: city.name.split(", ")[0],
      state: city.name.split(", ")[1],
      lat: parseFloat(city.lat),
      long: parseFloat(city.lon)
    }
    // Update the Vux store with the selected city
    this.updateLocation(newLocation)

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
      // eslint-disable-next-line no-console
      console.error(
        `[Error] There was an error fetching the cities from the API\n
        ${error}`
      )
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/globals";
@import "@/assets/styles/breakpoints";

@include breakpoint(tablet) {
  .text-field {
    border-radius: 20px;
  }

  .results-container {
    border-radius: 10px;
    top: 50px;
  }
}

@include breakpoint(laptop) {
  .text-field {
    border-radius: 20px;
  }

  .results-container {
    border-radius: 10px;
    top: 50px;
  }
}

@include breakpoint(desktop) {
  .text-field {
    border-radius: 20px;
  }

  .results-container {
    border-radius: 10px;
    top: 50px;
  }
}

.cannot-locate {
  path {
    fill: maroon;
  }
}

.city {
  position: relative;
}

.location-icon,
.cannot-locate {
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
}

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
