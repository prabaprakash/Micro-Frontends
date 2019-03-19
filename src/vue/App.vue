<template>
  <div class="vue"><HelloWorld msg="I'm progressive, incrementally-adoptable JavaScript framework for building UI on the web."/></div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
.vue {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 3px solid green;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: 57px;
  margin-left: 57px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
