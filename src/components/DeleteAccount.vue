<template>
    <div>
      <img src="../images-icons/DeleteAccount.png" @click="deleteAccount"/>
    </div>
  </template>

  <script>
  export default {
    methods: {
      async deleteAccount() {
        try {
          // Récupérer l'adresse e-mail du compte Microsoft de l'utilisateur
          const userEmail = await this.getMicrosoftAccountEmail();
          // Supprimer le compte utilisateur de Strapi
          await this.deleteStrapiAccount(userEmail);
          // Supprimer le token du localStorage
          localStorage.removeItem('access_token');
          // Rediriger l'utilisateur vers la page de connexion
          this.$router.push('/login');
        } catch (error) {
          console.error('Erreur lors de la suppression du compte:', error);
        }
      },
      async getMicrosoftAccountEmail() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access Token not found');
        }
        // Appeler Microsoft Graph pour obtenir les détails du compte
        const response = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to retrieve user data from Microsoft Graph API');
        }
        const userData = await response.json();
        return userData.mail || userData.userPrincipalName;
      },
      async deleteStrapiAccount(userEmail) {
        // Ici, vous devez remplacer 'api_token' par votre propre token d'API Strapi sécurisé
        // Trouver l'utilisateur dans Strapi en utilisant l'adresse e-mail
        const findUserResponse = await fetch(`http://localhost:1337/api/users?email=${userEmail}`, {
          headers: {
            'Authorization': `Bearer 8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5`
          }
        });
        const usersData = await findUserResponse.json();
        console.log("User :", usersData)
        if (!findUserResponse.ok || usersData.length === 0) {
          throw new Error('Failed to find Strapi account');
        }
        // Supprimer l'utilisateur de Strapi
        const userId = usersData[0].id;
        const deleteUserResponse = await fetch(`http://localhost:1337/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer 8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5`
          }
        });
        if (!deleteUserResponse.ok) {
          throw new Error('Failed to delete Strapi account');
        }
      },
    }
  };
  </script>