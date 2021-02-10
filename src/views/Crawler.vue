<template>
  <div class="crawler">

    <b-container fluid="md" class="p-3">

<!--NAVBAR-->

      <b-navbar toggleable type="light" variant="light" class="rounded-lg">
        <b-navbar-brand href="#">Navigation</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">Kontakt</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <hr>

<!--      CRAWLER-->

      <b-card class="rounded-lg"
              bg-variant="light"
              title="Crawler"
              img-top>
        <div>
          <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="basket3"></b-icon>
          </b-input-group-prepend>
          <b-form-tags
              input-id="tags-separators"
              v-model="value"
              separator=",;"
              placeholder="Sisesta ostukorv siia, eralda komaga"
              no-add-on-enter
          >
          </b-form-tags>
          </b-input-group>
          <hr>
        </div>
        <b-button variant="dark" href="#" align-v="center" id="nupp" v-on:click="päringHtml()"><b-icon icon="search"></b-icon>Päring</b-button>&nbsp;
        <b-button v-b-toggle.sidebar-right><b-icon icon="filter" aria-hidden="true"></b-icon>Filtreeri</b-button>

      </b-card>

<!--      SIDEBAR-->

      <div>
        <b-sidebar id="sidebar-right" title="Filtreeri" right shadow>
          <div class="px-3 py-2">

            <h3 class="mt-2">Pood</h3>
            <div class="form-check" v-for="(pood, index) in pood">
              <input class="form-check-input" type="checkbox" :value="index" :id="'pood'+index" v-model="selected.pood">
              <label class="form-check-label" :for="'pood' + index">
                {{ pood.name }} ({{ price.products_count }}) mis siia?
              </label>
            </div>

            <h3 class="mt-2">Toode</h3>
            <div class="form-check" v-for="(toode, index) in toode">
              <input class="form-check-input" type="checkbox" :value="toode.id" :id="'toode'+index" v-model="selected.toode">
              <label class="form-check-label" :for="'category' + index">
                {{ toode.name }} ({{ category.products_count }})
              </label>
            </div>

            <h3 class="mt-2">Kategooria</h3>
            <div class="form-check" v-for="(kategooria, index) in kategooria">
              <input class="form-check-input" type="checkbox" :value="kategooria.id" :id="'kategooria'+index" v-model="selected.kategooria">
              <label class="form-check-label" :for="'kategooria' + index">
                {{ kategooria.name }} ({{ manufacturer.products_count }})
              </label>
            </div>

            <h3 class="mt-2">Hind</h3>
            <div class="form-check" v-for="(hind, index) in hind">
              <input class="form-check-input" type="checkbox" :value="hind.id" :id="'hind'+index" v-model="selected.hind">
              <label class="form-check-label" :for="'hind' + index">
                {{ hind.name }} ({{ manufacturer.products_count }})
              </label>
            </div>
          </div>
        </b-sidebar>
      </div>

      <!-- PÄRING -->
      <b-row>
        <b-col>
          <b-table striped hover :items="päring">
          </b-table>
        </b-col>
        <b-col>

        </b-col>
      </b-row>


<!--FOOTER-->

      <footer class="footer px-4">
        <b-row align-v="center" class="justify-content-lg-between">
          <b-col lg="6">
            <div class="copyright text-center text-lg-left text-muted">
              © <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Dream Team 2021</a>
            </div>
          </b-col>
          <b-col lg="6">
            <b-nav align="center" class="nav-footer justify-content-lg-end">
              <b-nav-item href="#" target="_blank">
                About Us
              </b-nav-item>
              <b-nav-item href="#" target="_blank">
                License
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </footer>


    </b-container>
  </div>
</template>

<script>

let getData = function () {
  this.$http.get('http://localhost:8080/')
      .then(response => this.päring = response.data)
      .catch(response => console.log(response))

}

export default {
  name: 'Crawler',

  data: function () {
    return {
      päring: [],
      pood: [],
      toode: [],
      kategooria: [],
      hind: [],
      loading: true,
      selected : {
        pood: [],
        toode: [],
        kategooria: [],
        hind: []
      }
    }
  }, methods: {
    getData: getData
  },
  mounted() {
    this.getData();
    this.getPood();
    this.getToode();
    this.getKategooria();
    this.getHind();
  },

  watch: {
    selected: {
      handler: function () {
        this.getPood();
        this.getToode();
        this.getKategooria();
        this.getHind();
      },
      deep: true
    }
  }
}
</script>

<style scoped>


.p-3 {
  text-align: left;

}

.rounded-lg {
  border: 2px solid #AAC0AA;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #FFFFFF;
  color: black;
  text-align: center;
}


</style>