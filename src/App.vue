<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
body::-webkit-scrollbar{
  display: none;
}
#app {
  font-family: Montserrat, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  scroll-behavior: smooth;

  button{
    &:focus{
      outline: unset;
    }
   
    
  }
   #brand{
     font-size: 2.0rem;
      font-weight: bold;
      color: #D2FDFF;
      font-style: italic;
    }
}
@media only screen and (max-width: 426px) {
   #app  #brand{
    font-size: 1.5rem;
  }
 
}


</style>
