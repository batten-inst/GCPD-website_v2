<script>
import Vue from 'vue';
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

import VueSelect from 'vue-select';
// uikit doesn't have a good slider input; so a separate component
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: {
    VueSlider,
    VueSelect,
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
      selectedYear: null,
    };
  },
  computed: {
    years() {
      const years = [];
      for (let i = this.minYear; i <= this.maxYear; i++) {
        years.push(i);
      }
      return years;
    },
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
      if (newValue[0] === newValue[1]) {
        this.selectedYear = newValue[0];
      } else {
        this.selectedYear = null;
      }
      FilterBus.$emit('change-rangeyears', newValue);
    },
    selectedYear(newValue) {
      if (newValue) {
        this.rangeYears = [newValue, newValue];
      }
    },
  },
};
</script>

<template lang="pug">
  div.uk-padding-small.uk-box-shadow-small.bg-orange-fade-out-9.uk-box-shadow-hover-medium
    span.uk-text-meta Select a range of years 
    vue-slider(
      v-model="rangeYears" 
      :lazy="true"
      :min="minYear" 
      :max="maxYear"
      :contained="true"
      :enableCross="false"
      tooltip="always"
      )
    div.uk-margin-small-bottom
      span.uk-text-meta Select a single year
      vue-select.param-select.uk-text-small(
        :options="years" 
        v-model="selectedYear" 
        :clearable="true" 
        maxHeight="300px"
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
