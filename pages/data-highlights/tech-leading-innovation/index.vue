<script>
import { format as d3Format } from 'd3';

import ChartStacked from '@/components/outputs/ChartStacked';

import { lists } from '@/assets/data/listData';

const [chartStart, chartEnd] = lists.chartYearRange;

import {
  sectorsObj,
  yearSectorDataProm,
} from '@/assets/js/fetchData.js';

export default {
  components: {
    ChartStacked,
  },
  data() {
    return {
      yearSectorColumnOpts: {
        plotOptions: {
          series: {
            stacking: 'percent',
          },
        },
        series: [],
        chart: {
          type: 'column',
        },
        yAxis: {
          labels: {
            format: '{value}%',
          },
          title: {
            text: '% of Total Patents',
          },
        },
        title: {
          text: `Sector Share of Patents by Year (${chartStart}–${chartEnd})`,
        },
      },
      yearSectorStreamOpts: {
        series: [],
        chart: {
          type: 'streamgraph',
        },
        yAxis: {
          labels: {
            formatter() {
              return d3Format('~s')(this.value).replace('-', '');
            },
          },
          title: {
            text: 'Number of Patents',
          },
        },
        title: {
          text: `Number of Patents by Sector and Year (${chartStart}–${chartEnd})`,
        },
      },
    };
  },
  beforeCreate() {
    const vm = this;

    yearSectorDataProm.then(data_ => {
      Object.keys(sectorsObj).forEach(sector_code => {
        const filteredData = data_
          .filter(row => row.sector_code == sector_code)
          .map(row => +row.count_patents);
        const seriesItem = {
          data: filteredData,
          name: sectorsObj[sector_code],
        };
        vm.yearSectorColumnOpts.series.push(seriesItem);
        vm.yearSectorStreamOpts.series.push(seriesItem);
      });
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-section-muted
  main.uk-container 
    h1.uk-heading-small Technology Sector Leading in Innovation
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top Consistent with broader trends in business and society, innovation now more often takes place in technology-focused companies — those with a significant technological component in their business operations and products — than in any other sector.
        p.uk-text-meta We use the Global Industry Classification Standard (GICS), developed in 1999 by S&P Dow Jones Indices and MSCI.&nbsp;
          nuxt-link(to="/data-highlights/note-sector-classification") See details here.
        br
        p.uk-text-large Hover over the charts for more details.
      div(class="uk-width-2-3@s")
        chart-stacked(:custom-options="yearSectorColumnOpts")
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top The chart above does not capture the fast growth in annual patent grants during this period. When put in that context, as is done in the streamgraph here, the surge of patents in the technology sector is even more striking. 
      div(class="uk-width-2-3@s")
         chart-stacked(:custom-options="yearSectorStreamOpts") 

</template>
