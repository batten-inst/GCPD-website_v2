<script>
import Vue from 'vue';
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

// uikit doesn't have a good slider input; so a separate component
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: {
    VueSlider,
  },
  props: {
    rangeYears_: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      rangeYears: this.rangeYears_,
      minYear: lists.defaultYearRange[0],
      maxYear: lists.defaultYearRange[1],
    };
  },
  computed: {
    startYear: {
      get() {
        return this.rangeYears[0];
      },
      set(newValue) {
        Vue.set(this.rangeYears, 0, +newValue);
      },
    },
    endYear: {
      get() {
        return this.rangeYears[1];
      },
      set(newValue) {
        Vue.set(this.rangeYears, 1, +newValue);
      },
    },
  },
  watch: {
    rangeYears(newValue) {
      FilterBus.$emit('change-rangeyears', newValue);
    },
  },
};
</script>

<template lang="pug">
  div.uk-padding-small.uk-box-shadow-small.bg-orange-fade-out-9.uk-box-shadow-hover-medium
    span Select years. 
    span.uk-text-meta Patents counted by grant year.
    vue-slider(
      v-model="rangeYears" 
      :lazy="true"
      :min="minYear" 
      :max="maxYear"
      :contained="true"
      :enableCross="false"
      tooltip="always"
      )
</template>

<style lang="scss">
#year-input {
  width: 70px;
}
.vue-slider-dot-tooltip-inner,
.vue-slider-dot-tooltip-inner-top {
  background-color: #232d4b;
  border-color: #232d4b;
}
.vue-slider-process {
  background-color: #8f9ecb;
}
</style>
