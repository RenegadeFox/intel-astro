<template>
  <div class="card-container">
    <div class="card-header">
      <div class="year">
        {{ date.getFullYear() }}
      </div>
      <div class="month">
        {{ formattedDate }}
      </div>
    </div>

    <div class="sunrise card-row">
      <astro-icon icon="sunrise" />

      <div class="title">
        Sunrise
      </div>

      <div class="value">
        {{ getFormattedTime(sun.rise) }}
      </div>
    </div>

    <div class="sunset card-row">
      <astro-icon icon="sunset" />

      <div class="title">
        Sunset
      </div>

      <div class="value">
        {{ getFormattedTime(sun.set) }}
      </div>
    </div>

    <div class="bmnt card-row">
      <astro-icon icon="bmnt" />

      <div class="title">
        BMNT
      </div>

      <div class="value">
        {{ getFormattedTime(sun.bmnt) }}
      </div>
    </div>

    <div class="eent card-row">
      <astro-icon icon="eent" />

      <div class="title">
        EENT
      </div>

      <div class="value">
        {{ getFormattedTime(sun.eent) }}
      </div>
    </div>

    <div class="moonrise card-row">
      <astro-icon icon="moonrise" />

      <div class="title">
        Moonrise
      </div>

      <div class="value">
        {{ moonrise }}
      </div>
    </div>

    <div class="moonset card-row">
      <astro-icon icon="moonset" />

      <div class="title">
        Moonset
      </div>

      <div class="value">
        {{ moonset }}
      </div>
    </div>

    <div class="illumination card-row">
      <astro-icon icon="illumination" />

      <div class="title">
        Illumination
      </div>

      <div class="value">
        {{ illumination }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import AstroIcon from "@/components/AstroIcon.vue"
import { SunTimes, MoonTimes, AstroCard } from "@/types/AstroTimes"

@Component({
  components: {
    AstroIcon
  }
})
export default class Card extends Vue {
  @Prop() date!: Date
  @Prop() sun!: SunTimes
  @Prop() moon!: MoonTimes

  get illumination(): string {
    return `${Math.round(this.moon.illumination * 100)}%`
  }

  get formattedDate(): string {
    return `${this.date.toLocaleString("default", {
      month: "short"
    })} ${this.date.getDate()}`
  }

  get moonrise(): string {
    if (typeof this.moon.rise === "undefined") {
      return "Rises next day"
    } else {
      return this.getFormattedTime(this.moon.rise)
    }
  }

  get moonset(): string {
    if (typeof this.moon.set === "undefined") {
      return "N/A"
    } else {
      return this.getFormattedTime(this.moon.set)
    }
  }

  getFormattedTime(date: Date): string {
    return `${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/globals.scss";

.card-container {
  background: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  @include elevation(3);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "header"
    "bmnt"
    "sunrise"
    "sunset"
    "eent"
    "moonrise"
    "moonset"
    "illumination";

  .card-row {
    display: grid;
    grid-template-columns: 30px auto auto;
    grid-template-rows: auto;
    grid-template-areas: "icon title value";
    padding-top: 10px;
    border-bottom: 1px solid $faded-2;

    .icon {
      grid-area: icon;
    }

    .title {
      grid-area: title;
      justify-self: start;
      align-self: center;
      text-align: left;
    }

    .value {
      grid-area: value;
      justify-self: end;
      align-self: center;
      text-align: right;
    }
  }

  .card-header {
    grid-area: header;
    border-bottom: 1px solid $faded;
    text-align: left;
    align-self: center;

    .year {
      color: $faded;
    }

    .month {
      font-size: 24px;
      font-weight: bolder;
    }
  }

  .sunrise {
    grid-area: sunrise;
  }

  .sunset {
    grid-area: sunset;
  }

  .bmnt {
    grid-area: bmnt;
  }

  .eent {
    grid-area: eent;
  }

  .moonrise {
    grid-area: moonrise;
  }

  .moonset {
    grid-area: moonset;
  }

  .illumination {
    grid-area: illumination;
  }
}
</style>
