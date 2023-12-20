<template>
    <div>Authenticating...</div>
  </template>
  
  <script>
  export default {
    name: 'MicrosoftAuthHandler',
    created() {
      this.handleAuthentication();
    },
    methods: {
      async handleAuthentication() {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
  
        if (accessToken) {
          // Stockez le token dans un endroit sécurisé
          localStorage.setItem('access_token', accessToken);
  
          // Récupérez les informations de l'utilisateur depuis Microsoft
          const userData = await this.fetchMicrosoftUserData(accessToken);
  
          if (userData && userData.username && userData.email) {
            // Vérifiez si l'utilisateur existe déjà dans Strapi et créez-le si nécessaire
            await this.createUserInStrapi(userData);
  
            // Redirigez l'utilisateur vers la page d'accueil
            this.$router.push('/tabs/tab1');
          } else {
            console.error('Échec de la récupération des données utilisateur de Microsoft');
            this.$router.push('/login');
          }
        } else {
          // Gérer les cas d'erreur, par exemple, redirection vers la page de connexion
          this.$router.push('/login');
        }
      },
      async fetchMicrosoftUserData(accessToken) {
        try {
          const response = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données depuis Microsoft Graph API');
          }
          const userData = await response.json();
          return {
            username: userData.userPrincipalName, // ou un autre champ unique
            email: userData.mail || userData.userPrincipalName,
            password: 'un_mot_de_passe_sécurisé_ici' // Générer un mot de passe sécurisé
          };
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur de Microsoft:', error);
          return null;
        }
      },
      async createUserInStrapi(userData) {
        try {
          const response = await fetch('http://localhost:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userData.username,
              email: userData.email,
              password: userData.password
            })
          });
  
          if (!response.ok) {
            throw new Error("Échec de la création de l'utilisateur dans Strapi");
          }
  
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Erreur lors de la création de l'utilisateur dans Strapi:", error);
        }
      }
    }
  };
  </script>