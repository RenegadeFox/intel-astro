<template>
  <!--
  ⟩ -------
  ⟩ SUNRISE
  ⟩ ⬇︎-⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-if="icon === 'sunrise'"
    width="22"
    height="24"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 14.1667l4.6667 4-.8284.71-3.255-2.795v7.085h-1.1666v-7.085l-3.2609 2.79-.8225-.705 4.6667-4zM11 4.95c3.31 0 6 2.69 6 6a5.9848 5.9848 0 01-.275 1.7984L16.638 13H22v1H0v-1l5.3607.0011A5.9773 5.9773 0 015 10.95c0-3.31 2.69-6 6-6zm-8 5v2H0v-2h3zm19 0v2h-3v-2h3zM3.96 2.5l1.8 1.79L4.34 5.7 2.55 3.91 3.96 2.5zm14.08 0l1.41 1.41-1.79 1.79-1.41-1.41 1.79-1.79zM12 0v2.95h-2V0h2z"
      :fill="fill"
      fill-rule="nonzero"
    />
  </svg>

  <!--
  ⟩ -------
  ⟩ SUN SET
  ⟩ ⬇︎-⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'sunset'"
    width="22"
    height="24"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5833 14.1667v7.085l3.255-2.795.8284.71-4.6667 4-4.6667-4 .8225-.705 3.2609 2.79v-7.085h1.1666zM11 4.95c3.31 0 6 2.69 6 6a5.9848 5.9848 0 01-.275 1.7984L16.638 13H22v1H0v-1l5.3607.0011A5.9773 5.9773 0 015 10.95c0-3.31 2.69-6 6-6zm-8 5v2H0v-2h3zm19 0v2h-3v-2h3zM3.96 2.5l1.8 1.79L4.34 5.7 2.55 3.91 3.96 2.5zm14.08 0l1.41 1.41-1.79 1.79-1.41-1.41 1.79-1.79zM12 0v2.95h-2V0h2z"
      fill="#000"
      fill-rule="nonzero"
    />
  </svg>

  <!--
  ⟩ -----
  ⟩ BMNT
  ⟩ ⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'bmnt'"
    width="22"
    height="19"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        id="a"
        d="M11 14.1667l4.6667 4-.8284.71-3.255-2.795v7.085h-1.1666v-7.085l-3.2609 2.79-.8225-.705 4.6667-4zM11 9.95c2.2382 0 4.1928 1.23 5.224 3.0498L22 13v1H0v-1l5.776-.0003C6.8072 11.18 8.7619 9.95 11 9.95zM3.96 7.5l1.8 1.79-1.42 1.41-1.79-1.79L3.96 7.5zm14.08 0l1.41 1.41-1.79 1.79-1.41-1.41 1.79-1.79zM12 5v2.95h-2V5h2z"
      />
    </defs>
    <use
      fill="#000"
      fill-rule="nonzero"
      xlink:href="#a"
      transform="translate(0 -5)"
    />
  </svg>

  <!--
  ⟩ -----
  ⟩ EENT
  ⟩ ⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'eent'"
    width="22"
    height="19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5833 9.1667v7.085l3.2609-2.79.8225.705-4.6667 4-4.6667-4 .8284-.71 3.255 2.795v-7.085h1.1666zM11 4.95c2.2382 0 4.1928 1.23 5.224 3.0498L22 8v1H0V8l5.776-.0003C6.8072 6.18 8.7619 4.95 11 4.95zM3.96 2.5l1.8 1.79L4.34 5.7 2.55 3.91 3.96 2.5zm14.08 0l1.41 1.41-1.79 1.79-1.41-1.41 1.79-1.79zM12 0v2.95h-2V0h2z"
      fill="#000"
      fill-rule="nonzero"
    />
  </svg>

  <!--
  ⟩ ---------
  ⟩ MOONRISE
  ⟩ ⬇︎-⬇︎-⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'moonrise'"
    width="18"
    height="18"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8104 0c3.2169 1.3722 5.4716 4.5638 5.4716 8.282 0 4.9706-4.0294 9-9 9-3.7182 0-6.9098-2.2547-8.282-5.4716 1.363.9289 3.0091 1.4716 4.782 1.4716 4.6945 0 8.5-3.8055 8.5-8.5 0-1.707-.5032-3.2965-1.3694-4.6283L11.8104 0zM5.6667 2l4.6666 4-.8283.71L6.25 3.915V11H5.0833V3.915l-3.2608 2.79L1 6l4.6667-4z"
      fill="#000"
      fill-rule="evenodd"
    />
  </svg>

  <!--
  ⟩ -------
  ⟩ MOONSET
  ⟩ ⬇︎-⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'moonset'"
    width="18"
    height="18"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8104 0c3.2169 1.3722 5.4716 4.5638 5.4716 8.282 0 4.9706-4.0294 9-9 9-3.7182 0-6.9098-2.2547-8.282-5.4716 1.363.9289 3.0091 1.4716 4.782 1.4716 4.6945 0 8.5-3.8055 8.5-8.5 0-1.707-.5032-3.2965-1.3694-4.6283L11.8104 0zM6.25 2v7.085L9.505 6.29l.8283.71-4.6666 4L1 7l.8225-.705 3.2608 2.79V2H6.25z"
      fill="#000"
      fill-rule="evenodd"
    />
  </svg>

  <!--
  ⟩ -------------
  ⟩ ILLUMINATION
  ⟩ ⬇︎-⬇︎-⬇︎-⬇︎-⬇︎-⬇︎-⬇︎
  -->
  <svg
    v-else-if="icon === 'illumination'"
    width="19"
    height="19"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fill-rule="evenodd">
      <path
        d="M9.282.282c4.9706 0 9 4.0295 9 9 0 4.9706-4.0294 9-9 9-1.0523 0-2.0625-.1806-3.0012-.5125 3.497-1.2353 6.0012-4.569 6.0012-8.4875 0-3.9181-2.5038-7.2515-5.9987-8.4874C7.2202.4626 8.23.282 9.282.282z"
        fill="#000"
      />
      <circle stroke="#000" stroke-width=".4" cx="9.282" cy="9.282" r="9" />
    </g>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Card extends Vue {
  @Prop() icon!: string
  @Prop({ default: "#000" }) fill!: string
}
</script>

<style lang="scss" scoped></style>
