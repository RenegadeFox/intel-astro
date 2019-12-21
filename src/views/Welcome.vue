<template>
  <div class="welcome">
    <base-button
      text="Get Started"
      class="full-width"
      @click="$router.push({ name: 'city' })"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from "vue-property-decorator"
import BaseButton from "@/components/BaseButton.vue"
import { City, ApiCity } from "@/types/city"

@Component({
  components: {
    BaseButton
  }
})
export default class Welcome extends Vue {}
</script>

<style lang="scss" scoped>
.welcome {
  padding: 50px 20px;
}
</style>
