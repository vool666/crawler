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

          <b-form-input v-model="products.name" placeholder="Sisesta toode">
            <b-icon icon="basket3"></b-icon>
          </b-form-input>
          <hr>
          {{ products }}
        </div>
        <b-button variant="dark" href="#" align-v="center" id="nupp" v-on:click="postDataHtml()">
          <b-icon icon="search"></b-icon>
          Päring
        </b-button>&nbsp;
        <b-button v-b-toggle.sidebar-right>
          <b-icon icon="filter" aria-hidden="true"></b-icon>
          Filtreeri
        </b-button>

      </b-card>

      <!-- KAARDID -->


      <b-row align-v="center" class="g-0">
        <b-card
            v-for="(result, index) in results"
            class="itemcard"
        >
          <p>{{ result.name }}</p>
          <p>Kogus: {{ result.quantity }}</p>

          <hr>
          <b-button
              v-on:click="postOstukorvHtml(result.id)"
              size="sm">Lisa ostukorvi
          </b-button>
        </b-card>
      </b-row>

      <!--      OSTUKORV-->

      <hr>
      <b-table class="rounded-lg"
               bg-variant="light"
               title="Ostukorv"
               striped
               hover
               :items="ostukorv"
               :fields="fields">
      </b-table>

      <hr>

      <!--      SIDEBAR-->

      <div>
        <b-sidebar id=" sidebar-right
      " title="Filtreeri" right shadow>
      <div class="px-3 py-2">

        <h3 class="mt-2">Pood</h3>

      </div>

      <h3 class="mt-2">Toode</h3>


      <h3 class="mt-2">Kategooria</h3>


      <h3 class="mt-2">Hind</h3>

      </b-sidebar>
  </div>


  <!--FOOTER-->

  <footer class="footer px-4">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © <a href="#" class="font-weight-bold ml-1" target="_blank">Dream Team 2021</a>
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

let postDataJs = function () {
  let postData = {
    name: this.products.name
  }
  console.log(postData)
  console.log(this.products.productid)
  this.$http.post('http://localhost:8080/crawler/list', postData)
      .then(response => this.results = response.data)
      .catch(response => console.log(response));
}

let getData = function () {
  this.$http.post('http://localhost:8080/crawler/list')
      .then(response => this.results = response.data)
      .catch(response => console.log(response))
}

let postOstukorvJs = function (productid) {

  let ostukorvData = {
    descriptionId: productid,
    sessionId: this.$session.id()
  }
  this.$http.post('http://localhost:8080/crawler/cart', ostukorvData)
      .then(response => this.ostukorv = response.data)
      .catch(response => console.log(response))
}

import Card from '@/components/Cards.vue';

export default {
  name: 'Crawler',
  components: {"product-card": Card},

  data: function () {
    return {
      algne: 0,
      ostukorv: [],
      results: [],
      products: {},
      fields : [
        {
          key: "name",
          sortable: true
        },
        {
          key: "prismaPrice",

        },
        {
          key: "coopPrice"
        },
        {
          key: "selverPrice"
        }
      ]

    }
  },

  methods: {
    getData: getData,
    postDataHtml: postDataJs,
    postOstukorvHtml: postOstukorvJs
  },

  mounted() {

    this.$session.start();
    this.$http.post('http://localhost:8080/crawler/cart', ostukorvData)
        .then(response => this.ostukorv = response.data)
        .catch(response => console.log(response))
    /*this.getData();
    this.$http.get("http://localhost:8080/crawler/list").then(response => {
      this.results = response.data
    })
  }*/
  },


  computed: {
    /*    lisaKorvi: function () {
          return this.results.reduce(
              function (acc, element) {
                if (element.price) {
                  return acc + element.price
                }
                return acc
              }, 0)
        }*/


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

.itemcard {
  margin: 1rem;
  width: 15rem;
}


</style>