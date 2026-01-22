// Exports promises, not the actual data; Need to be resolved by importing modules
import * as d3 from 'd3';
import { lists } from '@/assets/data/listData';

const industriesObj = lists.industries.reduce((acc, v) => {
  // 0 is for "all industries"; should not be included in the industry list
  if (v.industry_code != 0) acc[v.industry_code] = v.industry;
  return acc;
}, {});

const dataProm = d3
  // .csv(require('@/assets/data/20190430_complete.csv'))
  .csv(require('@/assets/data/20190430_complete.csv'))
  .then(data => {
    // Convert to correct data types and make other changes before returning the data
    data.forEach(el => {
      // el.company = el.company.replace(
      //   // todo: Remove all suffixes to save space; eventually, do this on the data file.
      //   /\s(plc|PLC|Plc|Corp|CORP|corp|Inc|INC|inc|Ltd|LTD|AG|Ag|ag|Co|CO|Co Ltd|CO LTD| CO Ltd)\.*\s*$/,
      //   '',
      // );
      el.assets = +el.assets;
      el.sales = +el.sales;
      el.rdex = +el.rdex;
      el.capex = +el.capex;
      el.ebitda = +el.ebitda;
      el.year = +el.year;
      el.patentcount = +el.patentcount;
      el.industry = industriesObj[el.industry_code];
    });

    return data;
  });

const yearIndustryDataProm = d3
  .csv(require('@/assets/data/20190430_year_industry.csv'))
  .then(data => {
    data.forEach(el => {
      el.industry = industriesObj[el.industry_code];
    });
    return data;
  });

const yearRegionDataProm = d3
  .csv(require('@/assets/data/20190430_year_region.csv'))
  .then(data => {
    data.forEach(el => {
      el.industry = industriesObj[el.industry_code];
    });
    return data;
  });

const company1980to89DataProm = d3.csv(
  require('@/assets/data/20190505_df_companytotals_1980to89.csv'),
);

const company2007to16DataProm = d3.csv(
  require('@/assets/data/20190505_df_companytotals_2007to16.csv'),
);
const regionIndustryDataProm = d3.csv(
  require('@/assets/data/20190430_region_industry.csv'),
);

const top10CompaniesDataProm = d3
  .csv(require('@/assets/data/20190505_df_2007to16_top10.csv'))
  .then(data => {
    data.forEach(el => {
      el.assets = +el.assets;
      el.sales = +el.sales;
      el.rdex = +el.rdex;
      el.capex = +el.capex;
      el.ebitda = +el.ebitda;
      el.year = +el.year;
      el.patentcount = +el.patentcount;
    });
    return data;
  });

// Not used
// const fieldNamesProm = d3
//   .csv(require('@/assets/data/FieldNamesMapped.csv'))
//   .then(data => {
//     data.forEach(row => {
//       return data;
//     });
//   });

export {
  dataProm,
  industriesObj,
  yearIndustryDataProm,
  yearRegionDataProm,
  company1980to89DataProm,
  company2007to16DataProm,
  regionIndustryDataProm,
  top10CompaniesDataProm,
};
