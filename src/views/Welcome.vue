<template>
  <div class="welcome">
    <h1>The Welcome page</h1>

    <base-button
      text="Get Start"
      class="full-width"
      @click="$router.push({ name: 'city' })"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from "vue-property-decorator"
import moment from "moment"
import BaseButton from "@/components/BaseButton.vue"
import { City, ApiCity } from "@/types/city"

@Component({
  components: {
    BaseButton
  }
})
export default class Welcome extends Vue {}
</script>
