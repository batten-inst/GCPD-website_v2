<script>
// This is a computaton component; not for presentation. It does all the heavylifting and emits events to update states of the presentation components.

import Crossfilter from 'crossfilter';

import { dataProm } from '@/assets/js/fetchData';
import { lists } from '@/assets/data/listData';

// import components; FilterBus is an event bus
import { FilterBus } from '@/assets/js/FilterBus';

export default {
  data() {
    return {
      calculating: false,
      // geography: '',
      // industry: '',
      // rangeYears: [],
      geography: 'All Countries',
      industry: 'All Industries',
      rangeYears: [2010, 2017],
    };
  },
  created() {
    dataProm.then(data => {
      this.showMessageCalculating(1500);
      //:: Initialize crossfilter with data and its dimensions and groups :://
      this.cf = Crossfilter(data);
      this.companyDim = this.cf.dimension(d => d.company);
      this.industryDim = this.cf.dimension(d => d.industry);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearsDim = this.cf.dimension(d => d.year);

      this.companyGrp = this.companyDim.group();
      this.countryGrp = this.countryDim.group();
      this.industryGrp = this.industryDim.group();
      this.regionGrp = this.regionDim.group();
      this.yearGrp = this.yearsDim.group();

      // reduceSum gets an accessor function telling which field to sum
      function reduceInitial() {
        // construct an object with initial values

        // values will be mean; except patentcount, which will be sum
        let obj = [
          'patentcount',
          'assets',
          'capex',
          'rdex',
          'sales',
          'ebitda',
        ].reduce((acc, v) => {
          acc[v] = 0;
          return acc;
        }, {});

        // intermediate values to compute mean
        obj.counts = ['assets', 'capex', 'rdex', 'sales', 'ebitda'].reduce(
          (acc, v) => {
            acc[v] = 0;
            return acc;
          },
          {},
        );

        obj.totals = ['assets', 'capex', 'rdex', 'sales', 'ebitda'].reduce(
          (acc, v) => {
            acc[v] = 0;
            return acc;
          },
          {},
        );

        obj.gvkey = '';
        obj.city = '';
        obj.country = '';
        obj.region = '';
        obj.industry = '';

        return obj;
      }
      function reduceAdd(p, v) {
        p.gvkey = v.gvkey;
        p.city = v.city;
        p.country = v.country;
        p.region = v.region;
        p.industry = v.industry;
        p.patentcount += v.patentcount;

        ['assets', 'capex', 'rdex', 'sales', 'ebitda'].forEach(dim => {
          [p.totals[dim], p.counts[dim]] = reduceAvgAdd(p, v, dim);
          p[dim] = p.totals[dim] / p.counts[dim];
        });

        return p;
      }
      function reduceAvgAdd(p, v, dim) {
        // Checks if values is missing;
        if (v[dim]) {
          p.counts[dim] += 1;
          p.totals[dim] += v[dim];
        }
        return [p.totals[dim], p.counts[dim]];
      }
      function reduceAvgRemove(p, v, dim) {
        // Checks if values is missing;
        if (v[dim]) {
          p.counts[dim] -= 1;
          p.totals[dim] -= v[dim];
        }
        return [p.totals[dim], p.counts[dim]];
      }

      function reduceRemove(p, v) {
        p.patentcount -= v.patentcount;
        ['assets', 'capex', 'rdex', 'sales', 'ebitda'].forEach(dim => {
          [p.totals[dim], p.counts[dim]] = reduceAvgRemove(p, v, dim);
          p[dim] = p.totals[dim] / p.counts[dim];
        });
        return p;
      }
      this.companyGrp.reduce(reduceAdd, reduceRemove, reduceInitial);

      this.countryGrp.reduceSum(d => d.patentcount);
      this.industryGrp.reduceSum(d => d.patentcount);
      this.regionGrp.reduceSum(d => d.patentcount);
      this.yearGrp.reduceSum(d => d.patentcount);

      // Initiate view with default values
      this.changeGeography(this.geography);
      this.changeIndustry(this.industry);
      this.changeYears(this.rangeYears);
      this.emitData();

      //::: Listening for changes ::://
      FilterBus.$on('change-geography', payload => {
        this.geography = payload;
        this.showMessageCalculating();
        // Note: Although country and region are separate fields in the data,
        // they're in the same "geography" list in the UI (to simplify the UI).
        this.changeGeography(payload);
        this.emitData();
      });

      FilterBus.$on('change-industry', payload => {
        this.industry = payload;
        this.showMessageCalculating();
        this.changeIndustry(payload);
        this.emitData();
      });

      FilterBus.$on('change-rangeyears', payload => {
        this.rangeYears = payload;
        this.showMessageCalculating();
        this.changeYears(payload);
        this.emitData();
      });

      FilterBus.$on('reset-data', () => {
        this.changeGeography('All Countries');
        this.changeIndustry('All Industries');
        this.changeYears([2010, 2017]);
        this.emitData();
      });
      //-- ends listneing for changes --//
    });
  },
  methods: {
    changeGeography(payload) {
      switch (payload) {
        case 'All Countries':
          // Remove both region and country filters
          this.regionDim.filter(null);
          this.countryDim.filter(null);
          break;
        case 'North America':
        case 'Europe':
        case 'Asia Pacific':
        case 'Other':
          // Case: One of the regions. First remove current country filter
          this.countryDim.filter(null);
          // Then apply region filter
          this.regionDim.filter(payload);
          break;
        default:
          // Prior cases not hitting means it's a country and not a region.
          // So remove region filter and apply country filter.
          this.regionDim.filter(null);
          this.countryDim.filter(payload);
      }
    },
    changeIndustry(payload) {
      // Apply new industry filter unless payload is "all industries"
      if (payload !== 'All Industries') {
        this.industryDim.filter(payload);
      } else {
        this.industryDim.filter(null);
      }
    },
    changeYears(payload) {
      this.yearsDim.filter([payload[0], payload[1] + 1]);
    },

    showMessageCalculating(duration = 2000) {
      this.calculating = true;
      setTimeout(() => {
        this.calculating = false;
      }, duration);
    },
    emitData() {
      FilterBus.$emit('new-data', {
        industry: this.industry,
        geography: this.geography,
        rangeYears: this.rangeYears,
        cf: this.cf,
        companyGrp: this.companyGrp,
        industryGrp: this.industryGrp,
        countryGrp: this.countryGrp,
        regionGrp: this.regionGrp,
        yearGrp: this.yearGrp,
      });
    },
  },
};
</script>

<template lang="pug">
div.uk-position-absolute.uk-position-top-center(v-if="calculating")
  span.uk-text-large Computing
  span.uk-padding-large(uk-spinner="ratio:2.5")

</template>
