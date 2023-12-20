<template>
    <div v-if="userName">
      Bonjour, {{ userName }} !
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserGreeting',
    data() {
      return {
        userName: ''
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            const response = await fetch('https://graph.microsoft.com/v1.0/me', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (!response.ok) {
              throw new Error('Échec de la récupération des données utilisateur');
            }
            const userData = await response.json();
            this.userName = userData.displayName;
          } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
          }
        }
      }
    }
  };
  </script>