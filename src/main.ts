import Vue from "vue"
import App from "./App.vue"
import firebase from "firebase"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyB2xbebdE64zWt556mtSuwY_Dy1TUx-Sr4",
  authDomain: "intel-apps.firebaseapp.com",
  databaseURL: "https://intel-apps.firebaseio.com",
  projectId: "intel-apps",
  storageBucket: "intel-apps.appspot.com",
  messagingSenderId: "1062671776788",
  appId: "1:1062671776788:web:ac2334c2a6fb0c6f757b01",
  measurementId: "G-MZGMJQJ4DD"
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
