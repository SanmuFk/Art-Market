<template>
  <section class="section1">
<!--    下面就是显示路由对应的页面-->
    <router-view/>
  </section>
</template>

<script>
import Header from "@/components/Header";
import Index from "@/components/Index";
import Footer from "@/components/Footer";
import Works from "@/views/Works";
import Artworks from "@/views/Artworks";
import Work from "@/views/Work";
import Create from "@/views/Create";
import User from "@/views/User";
import ArtsMarket from "@/views/ArtsMarket";

export default {
  name: 'App',
  components: {Header,Index,Footer,Works,Work,Artworks,Create,User,ArtsMarket}
}
</script>

<style>
#app {
  height: 100%;
  width:100%;
}

.section1 {
  box-sizing: border-box;
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  background-color: white;
}

</style>
