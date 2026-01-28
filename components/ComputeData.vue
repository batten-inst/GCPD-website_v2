<script>
// This is a computaton component; not for presentation. It does all the heavylifting and emits events to update states of the presentation components.

import Crossfilter from 'crossfilter';

import { dataProm } from '@/assets/js/fetchData';
import { FilterBus } from '@/assets/js/FilterBus';

export default {
  data() {
    return {
      calculating: false,
      geography: 'All Countries',
      sector: 'All Sectors',
      rangeYears: [2010, 2017],
    };
  },
  created() {
    dataProm.then(data => {
      this.showMessageCalculating(1500);
      //:: Initialize Crossfilter with the loaded `data`.
      // Crossfilter provides in-memory filtering and fast aggregations
      // by creating dimensions (ways to slice the data) and groups
      // (aggregations over those slices).
      this.cf = Crossfilter(data);
      console.log('Crossfilter initialized with data', data);
      // Dimensions: each dimension lets us filter/partition the dataset
      // by a particular key. Filters applied to a dimension affect all
      // groups derived from the Crossfilter instance (global filtering).
      this.companyDim = this.cf.dimension(d => d.company);
      this.sectorDim = this.cf.dimension(d => d.sector);
      this.countryDim = this.cf.dimension(d => d.country);
      this.regionDim = this.cf.dimension(d => d.region);
      this.yearsDim = this.cf.dimension(d => d.year);

      // Groups: simple group() creates bins keyed by the dimension value.
      // We'll attach reducers to groups where we need custom aggregations.
      this.companyGrp = this.companyDim.group();
      this.countryGrp = this.countryDim.group();
      this.sectorGrp = this.sectorDim.group();
      this.regionGrp = this.regionDim.group();
      this.yearGrp = this.yearsDim.group();

      // reduceSum gets an accessor function telling which field to sum
      // Custom reducer functions for `companyGrp`:
      // We need more than a simple sum: keep totals and counts for several
      // numeric fields so we can compute means on the fly while also
      // summing `patentcount`.
      function reduceInitial() {
        // Create an object holding aggregate values and helpers.

        // Initialize numeric aggregate placeholders (will hold means except patentcount).
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

        // `counts` tracks how many non-missing values contributed to each mean.
        obj.counts = ['assets', 'capex', 'rdex', 'sales', 'ebitda'].reduce(
          (acc, v) => {
            acc[v] = 0;
            return acc;
          },
          {},
        );

        // `totals` stores running totals for mean calculation.
        obj.totals = ['assets', 'capex', 'rdex', 'sales', 'ebitda'].reduce(
          (acc, v) => {
            acc[v] = 0;
            return acc;
          },
          {},
        );

        // Preserve some identifying metadata for the company group.
        obj.gvkey = '';
        obj.city = '';
        obj.country = '';
        obj.region = '';
        obj.sector = '';

        return obj;
      }

      // Add: incorporate a new record `v` into the aggregator `p`.
      function reduceAdd(p, v) {
        p.gvkey = v.gvkey;
        p.city = v.city;
        p.country = v.country;
        p.region = v.region;
        p.sector = v.sector;
        // Sum patents (we want total patents per group)
        p.patentcount += v.patentcount;

        // For each metric compute running totals and counts, then update mean.
        ['assets', 'capex', 'rdex', 'sales', 'ebitda'].forEach(dim => {
          [p.totals[dim], p.counts[dim]] = reduceAvgAdd(p, v, dim);
          p[dim] = p.counts[dim] ? p.totals[dim] / p.counts[dim] : 0;
        });

        return p;
      }

      // Helper: update totals/counts when adding a value (skip missing values).
      function reduceAvgAdd(p, v, dim) {
        if (v[dim]) {
          p.counts[dim] += 1;
          p.totals[dim] += v[dim];
        }
        return [p.totals[dim], p.counts[dim]];
      }

      // Helper: update totals/counts when removing a value (skip missing values).
      function reduceAvgRemove(p, v, dim) {
        if (v[dim]) {
          p.counts[dim] -= 1;
          p.totals[dim] -= v[dim];
        }
        return [p.totals[dim], p.counts[dim]];
      }

      // Remove: remove record `v` from aggregator `p` (used when filters change).
      function reduceRemove(p, v) {
        p.patentcount -= v.patentcount;
        ['assets', 'capex', 'rdex', 'sales', 'ebitda'].forEach(dim => {
          [p.totals[dim], p.counts[dim]] = reduceAvgRemove(p, v, dim);
          p[dim] = p.counts[dim] ? p.totals[dim] / p.counts[dim] : 0;
        });
        return p;
      }

      // Attach the custom reducer to the company group so each company
      // aggregates patents (sum) and computes means for financials.
      this.companyGrp.reduce(reduceAdd, reduceRemove, reduceInitial);

      // For simple groups where only patent totals are needed we can use
      // the built-in `reduceSum` helper to sum `patentcount` per key.
      this.countryGrp.reduceSum(d => d.patentcount);
      this.sectorGrp.reduceSum(d => d.patentcount);
      this.regionGrp.reduceSum(d => d.patentcount);
      this.yearGrp.reduceSum(d => d.patentcount);

      // Initiate view with default values
      this.changeGeography(this.geography);
      this.changeSector(this.sector);
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

      FilterBus.$on('change-sector', payload => {
        this.sector = payload;
        this.showMessageCalculating();
        this.changeSector(payload);
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
        this.changeSector('All Sectors');
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
    changeSector(payload) {
      // Apply new sector filter unless payload is "all sectors"
      if (payload !== 'All Sectors') {
        this.sectorDim.filter(payload);
      } else {
        this.sectorDim.filter(null);
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
        sector: this.sector,
        geography: this.geography,
        rangeYears: this.rangeYears,
        cf: this.cf,
        companyGrp: this.companyGrp,
        sectorGrp: this.sectorGrp,
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
