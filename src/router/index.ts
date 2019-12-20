import Vue from "vue"
import VueRouter from "vue-router"
import Welcome from "../views/Welcome.vue"
import City from "../views/City.vue"
import Dates from "../views/Dates.vue"
import AstroData from "../views/AstroData.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome
  },
  {
    path: "/city",
    name: "city",
    component: City
  },
  {
    path: "/dates",
    name: "dates",
    component: Dates
  },
  {
    path: "/astro-data",
    name: "astro-data",
    component: AstroData
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
