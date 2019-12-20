import Vue from "vue"
import Vuex from "vuex"
import * as moment from "moment"
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
    startDate: null as moment.Moment | null,
    endDate: null as moment.Moment | null
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
    UPDATE_START_DATE(state: any, newDate: moment.Moment): void {
      state.startDate = newDate
    },
    /**
     *Updates the Vuex state's end date property
     *
     * @param {*} state Vuex state Object
     * @param {moment.Moment} newDate Date to update the store with
     */
    UPDATE_END_DATE(state: any, newDate: moment.Moment): void {
      state.endDate = newDate
    }
  },
  actions: {
    /**
     *Runs the mutation to update the Vuex state's location Object with a condensed version
     *
     * @param {*} { commit }
     * @param {ApiCity} newLocation Location Object to update the store with
     */
    updateLocation({ commit }, newLocation: ApiCity): void {
      const formattedLocation: City = {
        fullName: newLocation.name,
        city: newLocation.name.split(", ")[0],
        state: getState(newLocation),
        lat: parseFloat(newLocation.lat),
        long: parseFloat(newLocation.lon)
      }

      commit("UPDATE_LOCATION", formattedLocation)
    },
    updateDate({ commit }, { type, date }): void {
      // Check if updating the state date
      if (type === "start") {
        // Update the Vuex state's start date
        commit("UPDATE_START_DATE", date)
      }
      // Otherwise, check if updating the end date
      else if (type === "end") {
        // Update the Vuex state's end date
        commit("UPDATE_END_DATE", date)
      } else {
        // Otherwise, throw an error
        console.error(
          `[Error] Invalid Prop:\n
          Could not update "${type}" date. First item in parameter must be "start" or "end"`
        )
      }
    }
  },
  modules: {}
})
