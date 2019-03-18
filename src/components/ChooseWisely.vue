<template>
  <div>
    <h1>{{ 'CHOOSE WISELY!!!!' }}</h1>
    <router-link to="/lol" class="rlink">LINK TO CONTENT</router-link>
    <router-link to="/register" class="rlink2">LINK TO REGISTRATION</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .rlink, .rlink2 {
    text-decoration: none;
    padding: 10px;
    background-color: rgb(110, 30, 30);
    border: none;
    font-size: 15px;
    color: #FFFFFF;
    text-align: center;
    transition-duration: 0.4s;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .rlink {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 19%;
  }

  .rlink2 {
    position: absolute;
    top: 50%;
    right: 20%;
    width: 19%;
  }

  .rlink:hover {
    left: 15%;
    width: 24%;
  }

  .rlink2:hover {
    right: 15%;
    width: 24%;
  }

</style>
