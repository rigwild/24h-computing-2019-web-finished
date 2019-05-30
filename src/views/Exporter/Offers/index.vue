<template>
  <div>
    <b-card header="Your coffee offers">
      <Promised v-if="offersPromise" :promise="offersPromise">
        <template v-slot:pending>
          <Loader />
        </template>
        <template v-slot="data">
          <div class="container">
            <DataTable
              :fields="[
                { key: 'coffeeType', label: 'Type of coffee', sortable: true, class: 'text-center' },
                { key: 'originCountryCode', label: 'Country of origin', sortable: true, class: 'text-center' },
                { key: 'orderable', label: 'Orderable bags', sortable: true, class: 'text-center' },
                { key: 'real', label: 'Real bags stock', sortable: true, class: 'text-center' },
                { key: 'bagPrice', label: 'Bag price (60kg)', sortable: true, class: 'text-center' },
                { key: 'active', label: 'Offer is active', sortable: true, class: 'text-center' },
              ]"
              :items="data"
            >
              <template #coffeeType="{ row }">
                <!-- Type of coffee -->
                <span class="text-capitalize">{{ row.value }}</span>
              </template>
              <template #originCountryCode="{ row }">
                <!-- Country of origin of the product -->
                <b-img
                  :src="`https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/${row.value}.svg`"
                  :title="row.value"
                  class="flag-icon"
                />
              </template>
              <template #orderable="{ row }">
                <!-- Orderable stock -->
                {{ row.value }} bags
              </template>
              <template #real="{ row }">
                <!-- Real stock -->
                {{ row.value }} bags
              </template>
              <template #bagPrice="{ row }">
                <!-- Bag price -->
                ${{ row.value }}
              </template>
              <template #active="{ row }">
                <!-- Is the offer actively listed -->
                {{ row.value }}
              </template>
            </DataTable>
          </div>
        </template>
        <template v-slot:rejected="error">
          <b-alert v-text="error.message" dismissible show class="mt-3" variant="danger" />
        </template>
      </Promised>

      <div class="text-center mt-3">
        <b-button :to="{ name: 'ExporterCreateOffer' }" class="add-btn btn-pink">Add an offer</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import DataTable from '@/components/DataTable'
import apiWrapper from '@/apiWrapper'

export default {
  name: 'ExporterOffers',
  components: {
    Loader,
    DataTable
  },
  data() {
    return {
      offersPromise: null
    }
  },
  mounted() {
    this.offersPromise = apiWrapper.Exporter.getOffers()
  }
}
</script>

<style scoped>
.flag-icon {
  max-height: 30px;
}
</style>
