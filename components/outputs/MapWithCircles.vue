<script>
// todo: avoid rescaling of circles on new-data ? (perhaps not necessary if region-zoom implemented)
// todo: zoom in to region when selected; move circles to new x, y but don't zoom them. zoom only map (#paths-group)
// todo: highlight selected country's circle
// todo: add annotation for the first three countries
// todo: add legends for circle size
// todo: on hover show top five companies of the country
import * as d3 from 'd3';
import fetch from 'node-fetch';

import { formatNumber } from '@/assets/js/utility.js';
import { FilterBus } from '@/assets/js/FilterBus';

import { lists } from '@/assets/data/listData.js';
const regions = lists.regions;

const pathToCountryCentroidsData = '/data/20181210_country_centroids.csv';
const pathToGeoJsonData = '/data/world-110m.json';

const radScale = d3.scaleSqrt().range([0, 50]);

const projection = d3.geoMercator();

// attach path generator function to component and use it in the methods
const path = d3.geoPath().projection(projection);

const asiaCentroid = [87.331111, 43.681111];
const europeCentroid = [23.106111, 53.5775];
const northamericaCentroid = [-101.298376, 47.11453];

export default {
  props: {
    width: {
      type: Number,
      default: 900,
    },
    height: {
      type: Number,
      default: 500,
    },
    margin: {
      type: Object,
      default: () => ({
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      }),
    },
  },
  data() {
    return {
      paths: [],
      circles: [],
      currentZoom: Function,
      asiaCentroid,
      europeCentroid,
      northamericaCentroid,
    };
  },
  computed: {
    topCircles() {
      const circlesWithData = this.circles.filter(circle => circle.r > 0);
      return circlesWithData.length >= 3
        ? circlesWithData.slice(0, 3)
        : circlesWithData;
    },
  },
  created() {
    const centroidsPromise = d3.csv(pathToCountryCentroidsData);

    projection.translate([this.width / 2, this.height / 2 + 50]).scale(150);

    fetch(pathToGeoJsonData)
      .then(response => response.json())
      .then(geoJson => {
        this.$options.geoFeatures = geoJson.features;
        this.paths = this.makePaths(this.$options.geoFeatures);
      });

    FilterBus.$on('reset-data', () => {
      this.resetZoom('#svg', this.currentZoom);
      // todo: add reset data event listener for all other data resets
    });

    //:: Listen for new data from compute-data component :://
    FilterBus.$on('new-data', dataObj => {
      const { countryGrp, geography } = dataObj;
      // todo: if country changes then highlight country
      this.$options.countryData = countryGrp.top(Infinity);
      const maxValue = d3.max(this.$options.countryData, el => el.value);
      if (maxValue == 0) {
        // Remove all circle elements
        this.circles.length = 0;
        return;
      }
      radScale.domain([0, maxValue]);
      // todo: for other regions.
      // fix: currentZoom includes circles; can't avoid zooming circles
      // if (geography == 'Asia Pacific') {
      //   this.zoomOnRegion('#path-group', asiaCentroid, this.currentZoom);
      // } else {
      //   this.resetZoom('#path-group', this.currentZoom);
      // }

      centroidsPromise.then(centroids => {
        this.circles = this.$options.countryData.map(el => {
          el.r = radScale(el.value);

          let centroid = centroids.find(
            centroid_ => centroid_.country == el.key,
          );
          if (centroid) {
            const projectedCentroid = projection([+centroid.x, +centroid.y]);
            [el.cx, el.cy] = projectedCentroid;
          }
          return el;
        });
      });
    });
  },
  mounted() {
    // Store a reference to zoom action so that it can be reset or transformed later
    this.currentZoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', () => {
        this.applyZoom('#path-group', '#circle-group', '#text-group');
      });

    // Disable zooming with mouse wheel as it interferes with scrolling
    d3.select('#svg')
      .call(this.currentZoom)
      .on('wheel.zoom', null);
  },

  methods: {
    formatNumber,
    makePaths(features) {
      return features.map(el => path(el));
    },
    // The dots (...) group function arguments into an array
    applyZoom(...selectorArray) {
      selectorArray.forEach(selector => {
        d3.select(selector)
          .style('stroke-width', 1.5 / d3.event.transform.k + 'px')
          .attr('transform', d3.event.transform);
      });
    },
    resetZoom(selector, zoomToReset) {
      const selection = d3.select(selector);
      selection
        .transition()
        .duration(500)
        .call(zoomToReset.transform, d3.zoomIdentity);
    },
    // zoomOnRegion(selector, regionCoords, zoomToTransform) {
    //   const selection = d3.select(selector);
    //   const [x, y] = projection([regionCoords[0], regionCoords[1]]);
    //   // fix: transitions don't work
    //   selection
    //     .transition()
    //     .duration(250)
    //     .call(zoomToTransform.translateTo, x, y);
    //   selection
    //     .transition()
    //     .duration(250)
    //     .call(zoomToTransform.scaleBy, 2);
    // },
    onCircleClick(evt) {
      const countrySelected = evt.target.id;

      // For SelectParameter to listen for this event
      FilterBus.$emit('circle-clicked', countrySelected);

      evt.target.style.fill = 'darkred';
    },
    getRegion(country) {
      // Get the region of a country; to use as class name
      const matched = regionObj =>
        Object.values(regionObj)[0].includes(country);

      try {
        return Object.keys(regions.find(matched))[0]
          .toLowerCase()
          .replace(' ', '-');
      } catch {
        return 'no-match';
      }
    },
  },
};
</script>

<template lang="pug">
div

  svg#svg.uk-margin-remove.uk-padding-remove(
    :width="width" 
    :height="height"
    )
    g#path-group
      path(
        v-for="path in paths"
        :d="path" 
        class="path"
        )
    g#text-group
      text(
        v-for="(circle, i) in topCircles" 
        :x="circle.cx" 
        :y="circle.cy" 
        dx="-5" 
        dy="6" 
        class="text"
        ) {{ i + 1 }}
    g#circle-group
      circle(
        @click="onCircleClick"
        v-for="(circle, i) in circles" 
        :r="circle.r" 
        :cx="circle.cx" 
        :cy="circle.cy" 
        :id="circle.key" 
        :data-patent="circle.value" 
        :data-rank="i"
        :uk-tooltip="'title:' + String(Number(i)+1) + '. ' + circle.key + ': ' + formatNumber(circle.value) + '; animation:uk-animation-fade'"
        :class="'circle circle-' + getRegion(circle.key)" 
        )
</template>

<style lang="scss" scoped>
.path {
  fill: #5e7ace;
  opacity: 0.075;
  stroke: #000;
  stroke-width: 1px;
  transition: opacity 0.3s;
}

.path:hover {
  opacity: 0.2;
}

.circle {
  opacity: 0.5;
  transition: all 1.5s;
  stroke: #000;
  stroke-width: 0.5px;
}

.circle:hover {
  opacity: 0.7;
}

.text {
  font-size: 20px;
  transition: all 1s;
}

#svg {
  filter: drop-shadow(2px 2px 10px #777);
}

.uk-tooltip {
  font-size: 18px !important;
}
</style>
