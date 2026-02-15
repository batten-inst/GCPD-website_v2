<script>
import GetDataText from '@/content/GetDataText.md';

export default {
  components: { GetDataText},
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-small
    .uk-card.uk-card-default.uk-card-body.bg-blue-fade-out-9
      get-data-text
    .uk-container.uk-container-small.uk-margin-large-top
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSerZc3kWlpCRYTvCjI8P2PVRTh11SNS1l3-tGicR2FQo-Fvpg/viewform?embedded=true" width="400" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
</template>
