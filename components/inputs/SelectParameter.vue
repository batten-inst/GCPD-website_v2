<script>
// @import vSelect from 'vue-select`;
import VueSelect from 'vue-select';
// This component is used to select a country or an industry from their respective lists.
import { FilterBus } from '@/assets/js/FilterBus';
import { lists } from '@/assets/data/listData';

export default {
  components: {
    VueSelect,
  },
  props: {
    paramList: {
      type: String,
      default: '',
    },
    selected_: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // So that prop isn't modified directly
      selected: this.selected_,
      items: [],
      eventName: '',
    };
  },
  mounted() {
    if (this.paramList == 'countries') {
      this.items = lists.regionsCountries;
      this.eventName = 'change-geography';

      // For convenience show United States toward the top (in addition to its alphabetical place)
      // But first make sure it's not already there
      if (this.items.filter(el => el === 'United States').length === 1) {
        this.items.splice(5, 0, 'United States');
      }
      FilterBus.$on('circle-clicked', country => (this.selected = country));
    } else if (this.paramList == 'industries') {
      this.items = lists.industries.map(el => el.industry);
      this.eventName = 'change-industry';
    }
    // Event for computeData to listen for.
    FilterBus.$emit(this.eventName, this.selected);
  },
  updated() {
    // Event for computeData to listen for.
    FilterBus.$emit(this.eventName, this.selected);
  },
};
</script>

<template lang="pug">
    vue-select.param-select.uk-text-small(:options="items" v-model="selected" :clearable="false" maxHeight="300px")
</template>

<style lang="scss">
@import 'vue-select/dist/vue-select.css';

.param-select .vs__selected {
  font-family: Georgia, serif;
}
</style>
