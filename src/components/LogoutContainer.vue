<template>
    <div>
        <img src="../images-icons/Logout.png" @click="logout"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LogoutButton',
    methods: {
      logout() {
        // Supprimer le token d'accès du stockage local
        localStorage.removeItem('access_token');
        // Rediriger vers la page de connexion ou la page d'accueil, selon votre cas
        this.$router.push('/login'); // Remplacez '/login' par l'URL de votre page de connexion
      }
    }
  };
  </script>
  