<template>
  <div>
    <img src="../images-icons/Microsoft.png" @click="loginWithMicrosoft"/>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithMicrosoft() {
      // URL de connexion Strapi avec Microsoft
      const strapiMicrosoftLoginUrl = 'http://localhost:1337/api/connect/microsoft';

      // Rediriger l'utilisateur vers la page de connexion Microsoft
      window.location.href = strapiMicrosoftLoginUrl;
    }
  }
};
</script>

<style scoped >
img {
  width: 80%;
  cursor: pointer;
}
</style>