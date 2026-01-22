<script>
import GetDataText from '@/content/GetDataText.md';
import DataCitation from '@/content/DataCitation.md';

export default {
  components: { GetDataText, DataCitation },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-small
    .uk-card.uk-card-default.uk-card-body.uk-box-shadow-small
      get-data-text
      <iframe src="https://virginia.az1.qualtrics.com/jfe/form/SV_9B2ivuARIUgDgC9" height="1000px" title="Short form before download"></iframe>
</template>
