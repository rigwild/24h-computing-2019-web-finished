<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template
        v-for="aField in fields"
        #[aField.key]="row"
      >
        <slot :name="aField.key" :row="row"></slot>
      </template>
      <!--
      <template slot="name" slot-scope="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>
      -->
    </b-table>

    <b-row>
      <b-col class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
          style="justify-content: center;"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // items: [
      //   { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
      //   { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } }
      // ],
      // fields: [
      //   { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
      //   { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
      //   { key: 'isActive', label: 'is Active' },
      //   { key: 'actions', label: 'Actions' }
      // ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 30, 50],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
