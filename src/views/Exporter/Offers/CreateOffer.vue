<template>
  <div>
    <div class="container">
      <b-card header="Create an offer">
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="coffeeType">
            <b-form-select
              v-model="form.coffeeType"
              :options="[{ value: 'robusta', text: 'Robusta' }, { value: 'arabica', text: 'Arabica' }]"
              :disabled="!!loadingMessage"
            />
          </b-form-group>

          <b-form-group id="originCountryCode">
            <b-form-select
              v-if="areCountriesLoaded"
              v-model="form.originCountryCode"
              :options="selectCountries"
              :disabled="!!loadingMessage"
            />
            <Loader v-else message="Loading countries list" />
          </b-form-group>

          <b-form-group id="input-group-2">
            <b-form-input
              id="amount"
              v-model.number="form.amount"
              type="number"
              required
              placeholder="Bag amount"
              :disabled="!!loadingMessage"
            />
          </b-form-group>

          <b-form-group id="bagPrice">
            <b-form-input
              id="bagPrice"
              v-model.number="form.bagPrice"
              type="number"
              required
              placeholder="Bag price in USD (60kg)"
              :disabled="!!loadingMessage"
            />
          </b-form-group>

          <ButtonLoading :loading="loadingMessage" type="submit">Create offer</ButtonLoading>
        </b-form>

        <b-alert v-text="alertMessage" dismissible :show="alertMessage" fade class="mt-3" :variant="alertType" />
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Loader from '@/components/Loader'
import ButtonLoading from '@/components/ButtonLoading'
import apiWrapper from '@/apiWrapper'

export default {
  name: 'ExporterCreateOffer',
  components: {
    ButtonLoading,
    Loader
  },
  data() {
    return {
      form: {
        coffeeType: 'robusta',
        originCountryCode: null,
        amount: null,
        bagPrice: null
      },

      loadingMessage: null,
      alertMessage: null,
      alertType: 'danger'
    }
  },
  computed: {
    ...mapState(['countries']),
    ...mapGetters(['areCountriesLoaded']),

    selectCountries() {
      return this.countries.map(x => ({ value: x.countryCode, text: `${x.countryCode} - ${x.name}` }))
    }
  },
  methods: {
    async onSubmit() {
      this.loadingMessage = 'Creating the offer...'
      this.alertMessage = null
      try {
        const res = await apiWrapper.Exporter.createOffer(this.form.coffeeType, this.form.originCountryCode, this.form.amount, this.form.bagPrice)
        this.alertType = 'success'
        this.alertMessage = `Your offer id=${res._id} was created.`
      }
      catch (err) {
        console.error('Failed to create the offer', err)
        this.alertType = 'danger'
        this.alertMessage = err.message
      }
      finally {
        this.loadingMessage = null
      }
    }
  }
}
</script>
