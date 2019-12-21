import Vue from "vue"
import Vuex from "vuex"
import getState from "@/assets/helpers"
import { City, ApiCity } from "@/types/City"

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
    dateRange: [] as Array<Date>
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
    }
  },
  modules: {}
})
