<template>
  <div id="app">
    <!--router-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  watch: {
    // $route(to, from) {
    //   if(to.path !== '/login') {
    //     let obj = {
    //       name: to.name,
    //       title: to.meta.title
    //     }
    //
    //     this.$store.commit("addTabs", obj)
    //   }
    // }
  }

}
</script>

<style>

</style>
