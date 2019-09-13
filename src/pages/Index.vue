<template>
  <q-page>
    <q-markdown class="q-ma-xl" :src="readme" />
  </q-page>
</template>

<script>
import readme from '../../README.md'

export default {
  name: 'Readme',
  data() {
    return {
      readme
    }
  }
}
</script>

