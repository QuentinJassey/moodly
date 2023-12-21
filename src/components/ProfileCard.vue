<template>
  <ion-list :inset="true">
    <ion-item>
      <ion-label v-if="userNameSurname">Prénom: {{ userNameSurname }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label v-if="userNameFamily">Nom: {{ userNameFamily }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label v-if="userMail">Mail: {{ userMail }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label v-if="userRole">Role: {{ userRole }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-toggle>
        <ion-label>Allow Notifications</ion-label>
        <ion-note color="medium">Unsubscribe at any time</ion-note>
      </ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
export default {
  name: 'UserGreeting',
  data() {
    return {
      userNameFamily: '',
      userNameSurname: '',
      userMail: '',
      userRole: '',
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
          this.userNameFamily = userData.surname; // Nom de famille de l'utilisateur
          this.userNameSurname = userData.givenName; // Prénom de l'utilisateur
          this.userMail = userData.mail; // Mail de l'utilisateur
          // Après avoir récupéré les données de l'utilisateur, récupérez son rôle
          await this.fetchUserRole(userData.userPrincipalName);
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      }
    },
    async fetchUserRole(email) {
      // Remplacez 'your_api_token' par le token d'API de Strapi
      const apiToken = '8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5';
      try {
        const response = await fetch(`http://localhost:1337/api/users?email=${email}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to retrieve user role from Strapi');
        }
        const users = await response.json();
        if (users.length > 0 && users[0].role2) {
          this.userRole = users[0].role2; // Assurez-vous que vous accédez à la propriété correcte pour le rôle
        } else {
          throw new Error('User not found in Strapi');
        }
      } catch (error) {
        console.error('Error fetching user role from Strapi:', error);
      }
    }
  }
};
</script>