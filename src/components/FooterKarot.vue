<!-- ------------------------------
  Karot_2.0 - FooterKarot.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the footer of the website. 
  It is displayed on every page of the website.
------------------------------ -->

<template>
  <!-- Footer of the website -->
  <footer>
    <img :src="logo" alt="logo" />
    <p>© 2024 Mathias BENOIT – Adam CHABA – Eva MAROT – Sacha PORTAL</p>
  </footer>
</template>

<script>
import logo from "@/assets/logo_header.svg";

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
/* Style for the footer */
footer {
  background-color: white;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}

footer p {
  font-family: Inter;
  font-size: 0.7em;
  font-weight: 400;
  color: black;
  margin-bottom: 1em;
  text-align: center;
  padding: 0 1em;
  margin-bottom: 1em;
}

footer img {
  height: 2em;
  width: auto;
  margin-top: 0.8em;
  margin-bottom: 0.3em;
}
</style>
