<template>
  <div class="crawler">

    <b-container fluid="md" class="p-3">

      <!--      CRAWLER-->

      <b-card class="rounded-lg"
              bg-variant="light"
              header-class="card_header"
      >
        <div>
          <b-card-header
              header-class="card_header rounded-lg">
            Crawler
          </b-card-header>
          <br>

          <b-form-input v-model="products.name" placeholder="Sisesta toode" @keyup="checkButton(products.name)">
            <b-icon icon="basket3"></b-icon>
          </b-form-input>
          <hr>
        </div>


      </b-card>

      <!-- KAARDID -->


      <b-row align-v="center" class="g-0">
        <b-card
            v-for="(result, index) in results"
            class="itemcard"
            v-bind:img-src="result.imgUrl"
            img-top>

          <p>{{ result.name }}</p>
          <hr>
          <b-button
              v-on:click="postOstukorv(result.id)"
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
               :fields="fields"
      >
        <template v-slot:cell(-)="data">
          <b-button v-on:click="deleteOstukorvItem(data.item.descriptionId)" size="sm">Kustuta</b-button>
        </template>
      </b-table>

      <hr>

      <b-button variant="dark" href="#" align-v="center" id="nupp" v-on:click="deleteOstukorv()">
        <b-icon icon="trash"></b-icon>
        Kustuta ostukorv
      </b-button>

      <hr>


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

let checkButton = function (word) {
  if (word.length >= 3) {
    this.postData()
  }
}

let postData = function () {
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

let postOstukorv = function (productid) {

  let ostukorvData = {
    descriptionId: productid,
    sessionId: this.$session.id()
  }
  this.$http.post('http://localhost:8080/crawler/cart', ostukorvData)
      .then(response => this.ostukorv = response.data)
      .catch(response => console.log(response))
}

let deleteOstukorvItem = function (productid) {

  let ostukorvData = {
    descriptionId: productid,
    sessionId: this.$session.id()
  }
  this.$http.post('http://localhost:8080/crawler/deleteitem', ostukorvData)
      .then(response => this.ostukorv = response.data)
      .catch(response => console.log(response))
}

let deleteOstukorv = function () {

  let ostukorvData = {
    sessionId: this.$session.id()
  }
  this.$http.post('http://localhost:8080/crawler/deletecart', ostukorvData)
      .then(response => this.ostukorv = response.data)
      .catch(response => console.log(response))
}


export default {
  name: 'Crawler',

  data: function () {
    return {
      algne: 0,
      ostukorv: [],
      results: [],
      products: {},
      fields: [
        {
          key: "name",
          sortable: true,
          showTitle: true
        },
        {
          key: "prismaPrice",
          showTitle: true
        },
        {
          key: "coopPrice",
          showTitle: true
        },
        {
          key: "selverPrice",
          showTitle: true
        },
        {
          key: "-",
          showTitle: false
        }

      ]

    }
  },

  methods: {
    getData,
    postData,
    postOstukorv,
    deleteOstukorvItem,
    deleteOstukorv,
    checkButton
  },

  mounted() {
    this.$session.start()
  }
}

</script>

<style scoped>

img {
  max-height: 50%;
  width: auto;
  margin-top: 5px
}

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

.card_header {
  font-family: "Monoton";
  font-size: 3rem;

}


</style>