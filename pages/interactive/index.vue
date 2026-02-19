<script>
import introJs from 'intro.js';

import { FilterBus } from '@/assets/js/FilterBus.js';
import { lists } from '@/assets/data/listData';

import ComputeData from '@/components/ComputeData';

import SelectParameter from '@/components/inputs/SelectParameter';
import InputRange from '@/components/inputs/InputRange';

import ListTopCompaniesInteractive from '@/components/outputs/ListTopCompaniesInteractive';
import MapWithCircles from '@/components/outputs/MapWithCircles';

let keyCounter = 0;
// default parameters
const defaultCountry = 'All Countries';
const defaultSector = 'All Sectors';
const defaultRangeYears = lists.defaultYearRange;

export default {
  components: {
    SelectParameter,
    InputRange,
    ListTopCompaniesInteractive,
    MapWithCircles,
    ComputeData,
  },
  data() {
    return {
      defaultCountry,
      defaultSector,
      defaultRangeYears,
      yearsComponentKey: `years-${keyCounter}`,
      sectorComponentKey: `sector-${keyCounter}`,
      countryComponentKey: `country-${keyCounter}`,
      listComponentKey: `list-${keyCounter}`,
      listLength: 10,
    };
  },
  mounted() {
    this.startGuide();
  },
  methods: {
    resetData() {
      keyCounter += 1;
      this.yearsComponentKey = `years-${keyCounter}`;
      this.countryComponentKey = `country-${keyCounter}`;
      this.sectorComponentKey = `sector-${keyCounter}`;
      this.listComponentKey = `list-${keyCounter}`;
      this.$nextTick(() => {
        FilterBus.$emit('reset-data');
      });
    },
    startGuide() {
      introJs().start();
    },
  },

  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css',
        },
      ],
    };
  },
};
</script>

<template lang="pug">
div.uk-section.uk-padding-remove-vertical.uk-margin-medium
  div.uk-container.uk-container-expand
    div.uk-heading-small(
      data-intro="Use this tool to explore the Global Corporate Patent Dataset across years, sectors and countries."
    ) Explore the World of Corporate Patents
      
    div.uk-grid.uk-margin-remove(uk-grid)
      div(class="uk-width-3-4@m uk-flex-last@m")
        div.uk-grid.uk-flex-bottom(uk-grid)
          div(
            class="uk-width-1-4@m"
            data-step=2
            data-intro="Select a region/country or a sector. <br><br> The data and visuals will change to reflect your selection."
            )
            div.uk-padding-small.uk-box-shadow-small.bg-orange-fade-out-9.uk-box-shadow-hover-medium
              select-parameter(
                :key="countryComponentKey"
                :selected_="defaultCountry"
                param-list="countries" 
                )
              br
              select-parameter(
                :key="sectorComponentKey"
                :selected_="defaultSector"
                param-list="sectors" 
                )

          div(
            class="uk-width-1-2@m"
            data-step=3 
            data-intro="Filter the data by years. Select a range of years or a single year."
            )
            input-range(
              :key="yearsComponentKey"
              :rangeYears_="defaultRangeYears"
              )
          
          div(
            class="uk-width-1-4@m"
            data-step=7 
            data-intro="You can again start this guide from here. <br><br>At any point, you can set everything on the page to its beginning state using the reset button."
            )
              button.my-text-tiny.uk-button.uk-button-small.uk-margin-small.bg-orange-100.fg-blue(
                @click="startGuide"
                ) Guide
              br
              button.my-text-tiny.uk-button.uk-button-small.bg-orange-100.fg-blue(
                @click="resetData"
                ) Reset Data &amp; Map
        hr    
        p(class="uk-hidden@s").uk-padding-small This page works better on a larger screen. On a small screen, you can see other regions of the map by dragging it. 
        .uk-card.uk-card-small.uk-width-1-1#map-card(
            data-step=4 
            data-intro="The circles on the map show total patent counts by country. To see the data for a country, hover over its circle. <br><br> Double click to zoom and drag to pan. Get back to full view using the reset button.<br><br> When the data changes, the circles rescale based on the then current minimum and maximum."
            )

          p.uk-h5.uk-padding-tiny.uk-margin-remove Global ranking by countries' total patents in the selected sector(s) and year(s)
          
          map-with-circles.uk-align-center
          
          //- .uk-card-footer
          p.uk-margin-small.uk-text-meta.uk-padding-small
            | Click on a circle to see that country's top companies. Circle sizes rescale based on selected data. You can zoom in by double clicking and pan by dragging the map. Use the reset button to get back to full view. See sector classification details <nuxt-link to="/data-highlights/note-sector-classification">here </nuxt-link>
 
      div(class="uk-width-1-4@m")
        compute-data
        list-top-companies-interactive.uk-box-shadow-small.uk-animation-slide-left(
          :key="listComponentKey"
          :listLength="listLength" 
          data-position="auto" 
          data-scrollTo="#top" 
          data-step=6 
          data-intro="List of the most innovative companies within the selected sector, region, and period."
          )
        
</template>

<style scoped>
#map-card {
  cursor: grab;
  border-left: 1px solid gray;

}
.introjs-button {
  font-size: 1.1em !important;
}
.introjs-skipbutton {
  color: #000000 !important;
}
.introjs-tooltiptext {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
