<template>
  <div class="crawler">

    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Link 1</b-nav-item>
          <b-nav-item href="#">Link 2</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <b-container fluid="md" class="p-3">
    <div>
      <b-jumbotron header="Crawler" lead="Sisesta andmed:"
                   border-variant="dark"
                   bg-variant="light"
      >
        <div>
          <b-form-tags
              input-id="tags-separators"
              v-model="value"
              separator=",;"
              placeholder="Sisesta toiduained siia, eralda komaga"
              no-add-on-enter
          ></b-form-tags>
          <p class="mt-2">Value: {{ value }}</p>
        </div>
        <b-button variant="primary" href="#" align-v="center">Päring</b-button>
      </b-jumbotron>
    </div>
  </b-container>


  </div>
</template>

<script>
export default {
  name: 'Crawler'
}
</script>

<style scoped>

</style>