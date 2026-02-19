<script>
import { cross as d3Cross, format as d3Format } from 'd3';
import ChartStacked from '@/components/outputs/ChartStacked';
import ChartHeatmap from '@/components/outputs/ChartHeatmap';

import { lists } from '@/assets/data/listData';

const [chartStart, chartEnd] = lists.chartYearRange;

import {
  sectorsObj,
  regionSectorDataProm,
  yearRegionDataProm,
} from '@/assets/js/fetchData.js';

const regionList = ['Asia Pacific', 'Europe', 'North America'];
const regionObj = {
  'Asia Pacific': '#8e9fca',
  Europe: '#99c869',
  'North America': '#ffa23e',
  // Other: '#f5e480',
};
const sectorList = Object.values(sectorsObj);
const regionSectorCross = d3Cross(regionList, sectorList);
export default {
  components: {
    ChartStacked,
    ChartHeatmap,
  },
  data() {
    return {
      regionSectorHeatmapOpts: {
        series: [],
        xAxis: {
          categories: sectorList,
        },
        yAxis: {
          categories: regionList,
        },
        title: {
          text: `Region-Sector Heatmap (${chartStart}–${chartEnd})`,
        },
        tooltip: {
          style: {
            fontSize: '14px',
          },
          formatter() {
            return (
              '<i>' +
              this.series.xAxis.categories[this.point.x] +
              '</i> in <b>' +
              this.series.yAxis.categories[this.point.y] +
              '</b><br /> <b>' +
              d3Format(',')(this.point.value) +
              '</b> Patents'
            );
          },
        },
      },
      yearRegionColumnOpts: {
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

          text: `Regional Share of Patents by Year (${chartStart}–${chartEnd})`,
        },
      },
      yearRegionStreamOpts: {
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
           text: `Number of Patents by Region and Year (${chartStart}–${chartEnd})`,
        },
      },
    };
  },
  beforeCreate() {
    const vm = this;
    regionSectorDataProm.then(data_ => {
      const seriesData = regionSectorCross.map(el => {
        const matchedRow = data_.find(
          row => row.region == el[0] && row.sector == el[1],
        );
        const returnObj = {
          x: sectorList.indexOf(el[1]),
          y: regionList.indexOf(el[0]),
        };

        if (matchedRow == undefined) {
          returnObj['value'] = 0;
        } else {
          returnObj['value'] = +matchedRow.count_patents;
        }
        return returnObj;
      });
      vm.regionSectorHeatmapOpts.series.push({
        data: seriesData,
      });
    });

    yearRegionDataProm.then(data_ => {
      regionList.forEach(region => {
        const filteredData = data_
          .filter(row => row.region == region)
          .map(row => +row.count_patents);
        const seriesItem = {
          data: filteredData,
          name: region,
          color: regionObj[region],
        };
        vm.yearRegionColumnOpts.series.push(seriesItem);
        vm.yearRegionStreamOpts.series.push(seriesItem);
      });
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-section-muted
  main.uk-container
    h1.uk-heading-small The Rise of Asia
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top Until the late 1970s, it was mostly U.S. companies that filed patent applications with the USPTO. That changed around the 1980s when both European and Asian companies started to seek U.S. patent protection for their innovations with growing interest. In the subsequent years, Asian companies as a whole far surpassed Europe and challenged the prominence of North America.
        p.uk-text-large.uk-text-meta Hover over the charts to get more details.
      div(class="uk-width-2-3@s")
        chart-stacked(:custom-options="yearRegionColumnOpts")
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top The recent decades saw an explosion of patent grants. The streamgraph here shows the changes in regional distribution within the context of that growth. Between 2013 and 2022 (the last ten full years for which we have data), more than 2.3 million USPTO patents were granted and assigned to publicly listed companies.
      div(class="uk-width-2-3@s")
        chart-stacked(:custom-options="yearRegionStreamOpts")
    .uk-grid.uk-card-default.uk-padding
      div(class="uk-width-1-1@s")
        p.uk-margin-large-top It's notable, but perhaps not surprising, that the Asia Pacific region outshines North America in <i>Consumer Discretionary</i> — and trails closely behind it in <i>Information Technology</i>, the sector with by far the most patents.
        chart-heatmap(:custom-options="regionSectorHeatmapOpts")
</template>

<style lang="scss" scoped>
@media (width: 850px) {
  .uk-card-default,
  .uk-padding,
  .uk-container {
    padding: 0%;
  }
}
</style>
