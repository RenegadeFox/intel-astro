<template>
  <footer>
    <div class="resources">
      <span>Resources</span>
      <ul>
        <li>
          <a href="https://github.com/rootr/intel-astro">Github</a> - Open
          source project
        </li>
        <li>
          <a href="https://github.com/mourner/suncalc">SunCalc</a> - Calculating
          astro data
        </li>
        <li>
          <a href="https://www.typescriptlang.org/">TypeScript</a> - Programming
          Language
        </li>
        <li><a href="https://vuejs.org/">Vue.js</a> - Core framework</li>
        <li>
          <a href="https://choosealicense.com/licenses/mit/">MIT</a> - License
        </li>
      </ul>
    </div>
    <div class="copyright">
      &#169; {{ thisYear }} - Martin Cox | Hosted with
      <a href="https://firebase.google.com/">Google Firebase</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class BaseHeader extends Vue {
  thisYear: string = new Date().getFullYear().toString()
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/globals";

footer {
  display: grid;
  background: rgba(69, 67, 67, 1);
  color: #fff;
  box-sizing: border-box;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "resources"
    "copyright";

  .resources {
    padding: 10px;

    span {
      margin: 0px;
      font-size: 20px;
      padding-bottom: 0px;
      text-decoration: underline;
    }

    ul {
      padding-left: 20px;
      padding-top: 10px;
      margin: 0px;
      list-style-type: none;

      li {
        padding-top: 5px;
      }
    }
  }

  .copyright {
    grid-area: copyright;
    border-top: 1px solid $faded;
    padding: 10px;
  }
}
</style>
