<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#889aa4',
    },
  },
  setup(props) {
    return {
      iconName: computed(() => `#icon-${props.icon}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`
        }
        return 'svg-icon'
      }),
    }
  },
})
</script>

<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  top: -0.1em;
  /* fill: currentColor; */
  /* stroke: currentColor; */
  vertical-align: middle;
}
</style>
