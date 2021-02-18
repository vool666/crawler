<template>
  <div id="app">
    <div id="nav">

    </div>
    <router-view/>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(#DCEED1, #FFFFFF);

}
body {
  background: #FFFFFF;
  font-family: 'Rajdhani'
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
