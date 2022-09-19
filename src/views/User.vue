<template>
  <Header />
  <LocalBackground />
  <div style="display: flex;margin-top: 20px;margin-left: 60px;flex: 0 0 auto;background-color: white">
    <CenterMenu/>
    <router-view />
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header";
import LocalBackground from "@/components/LocalBackground";
import CenterMenu from "@/components/CenterMenu";
import Footer from "@/components/Footer";

export default {
  name: "User",
  components:{Header,LocalBackground,Footer,CenterMenu}
}
</script>

<style scoped>

</style>