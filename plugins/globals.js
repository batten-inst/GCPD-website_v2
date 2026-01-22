import Highcharts from 'highcharts';

// To test out new plugins. This file is already registered with Nuxt (nuxt.config.js)
Highcharts.setOptions({
  plotOptions: {
    series: {},
  },
  chart: {
    style: {
      fontFamily: 'FranklinGothicURW',
    },
  },
  credits: {
    text: 'Source: UVA Darden Global Corporate Patent Dataset, 2019',
    href: 'https://patents.darden.virginia.edu',
    style: {
      fontSize: '9px',
      color: '#999999',
    },
  },
  colors: [
    '#e4cbb0',
    '#88aee1',
    '#cee8c2',
    '#d9bfdb',
    '#92c7b4',
    '#e9aeae',
    '#8cd1e5',
    '#b4bd9d',
    '#b3bddc',
    '#c5eceb',
    '#9db7b1',
    '#aacdd4',
  ],
});
