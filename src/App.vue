<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Butcherman' rel='stylesheet'>
    <header>
      <div>Project &#8810;GOLIATH&#8811;</div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="gridItem">
        <a href="https://www.codewars.com/users/Menark" target="_blank"><img src="../src/images/CodewarsMark.png" alt="CODEWARS ACCOUNT" class="linkToSocial"></a>
        <p>CodeWars account</p>
      </div>
      <div class="gridItem">
        <a href="https://github.com/Menark" target="_blank"><img src="../src/images/GitHubMark.png" alt="GITHUB ACCOUNT" class="linkToSocial"></a>
        <p>Github account</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  header {
    font-family: 'Butcherman';
    font-size: 30px;
    text-align: center;
    background-color: rgb(231, 114, 114);
    position: absolute;
    top: 0;
    width: 100%;
    height: 8%;
    border-radius: 0;
  }

  header div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  footer {
    background-color: rgb(90, 167, 170);
    border-radius: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8%;
    box-sizing: border-box;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-gap: 50px;
    justify-content: center;
    align-content: center;
  }

  .linkToSocial {
    width: 40px;
    height: 40px;
  }

  .gridItem {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    justify-self: center;
    align-self: center;
    transform: scale(0.8);
  }

  .gridItem a, .gridItem p {
    float: left;
    line-height: 50%;
    padding: 5px;
  }
</style>
