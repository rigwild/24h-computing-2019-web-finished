<template>
  <div>
    <coffee-map v-if="areCountriesLoaded" />
    <coffee-list v-if="areCountriesLoaded" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoffeeMap from '@/components/CoffeeMap'
import CoffeeList from '@/components/CoffeeList'

export default {
  name: 'Home',
  components: {
    CoffeeMap,
    CoffeeList
  },
  computed: {
    ...mapGetters(['areCountriesLoaded'])
  }
}
</script>
