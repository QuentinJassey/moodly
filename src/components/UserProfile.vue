<template>
    <div class="Container">
      <img src="../images-icons/UserProfile.png" class="Icon"/>
      <div class="Text">
        <p class="Name">Bonjour, {{ firstName }}</p>
        <p class="Mood">Suivi de l'humeur depuis 28 jours</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '', // Prénom initialisé à une chaîne vide
      };
    },
    async created() {
      await this.fetchMicrosoftUserData();
    },
    methods: {
      async fetchMicrosoftUserData() {
        const accessToken = localStorage.getItem('access_token'); // Récupérez le token depuis le localStorage
        if (!accessToken) {
          console.error('Access Token not found');
          return;
        }
  
        try {
          const response = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to retrieve user data from Microsoft Graph API');
          }
  
          const userData = await response.json();
          this.firstName = userData.givenName; // Mettez à jour le prénom avec la donnée récupérée
        } catch (error) {
          console.error('Error fetching user data from Microsoft:', error);
        }
      }
    }
  };
  </script>
  
 <style scoped>
 .Container {
    display: flex;
    height: 6%;
    width: 90%;
    gap: 5%;
    justify-content: center;
    align-items: center;
 }
.Icon {
    height: 100%;
}
.Name {
    font-weight: bold;
    color: black;
    display: flex;
    margin: 0;
    margin-bottom: 2%;
}
.Mood {
    color: #686868;
    margin: 0;
}
.Text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>