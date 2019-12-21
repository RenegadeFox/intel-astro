import Vue from "vue"
import Vuex from "vuex"
import getState from "@/assets/helpers"
import { City, ApiCity } from "@/types/City"

interface Messages<TValue> {
  [index: string]: TValue
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {
      fullName: "",
      city: "",
      state: "",
      lat: 0,
      long: 0
    } as City,
    dateRange: [] as Array<Date>,
    page: "welcome" as string,
    messages: {
      welcome: "Easily get up to date astronomical weather data",
      city: "In what city should I get astro data?",
      dates: "On which date should I get astro data?",
      endDate: "Until which date?",
      "astro-data":
        "Showing astro data for\n{city}\n from {startDate} until {endDate}"
    } as Messages<string>
  },
  getters: {
    getPageMessage(state: any): string {
      return state.messages[state.page]
    }
  },
  mutations: {
    /**
     *Updates the Vuex state's location Object
     *
     * @param {*} state Vuex state Object
     * @param {City} newLocation Location to update the store with
     */
    UPDATE_LOCATION(state: any, newLocation: City): void {
      state.location = newLocation
    },
    /**
     *Updates the Vuex state's start date property
     *
     * @param {*} state Vuex state Object
     * @param {moment.Moment} newDate Date to update the store with
     */
    UPDATE_DATE_RANGE(state: any, newDates: Array<Date>): void {
      state.dateRange = newDates
    },
    /**
     *Updates the Vuex state's page property
     *
     * @param {*} state
     * @param {string} newPage Page to update the store with
     */
    UPDATE_PAGE(state: any, newPage: string): void {
      state.page = newPage
    }
  },
  actions: {
    /**
     *Runs the mutation to update the Vuex state's location Object with a condensed version
     *
     * @param {*} { commit }
     * @param {ApiCity} newLocation Location Object to update the store with
     */
    updateLocation({ commit }: any, newLocation: ApiCity): void {
      const formattedLocation: City = {
        fullName: newLocation.name,
        city: newLocation.name.split(", ")[0],
        state: getState(newLocation),
        lat: parseFloat(newLocation.lat),
        long: parseFloat(newLocation.lon)
      }

      commit("UPDATE_LOCATION", formattedLocation)
    },
    /**
     *Runs the mutation to update the Vuex state's dateRange Array
     *
     * @param {*} { commit }
     * @param {Array<Date>} newDates New Array of dates to be added as the date range
     */
    updateDateRange({ commit }: any, newDates: Array<Date>): void {
      commit("UPDATE_DATE_RANGE", newDates)
    },

    /**
     *Runs the mutation to update the Vuex store's page string
     *
     * @param {*} { commit }
     * @param {string} newPage New page to update the store with
     */
    updatePage({ commit }: any, newPage: string): void {
      commit("UPDATE_PAGE", newPage)
    }
  },
  modules: {}
})
