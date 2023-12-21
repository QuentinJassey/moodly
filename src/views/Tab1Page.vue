<template>
  <ion-page class="gradient-background">
    <img src="../images-icons/CombinedLogo.png" class="Logo"/>
    <UserProfile class="Name"/>
      <!-- <div v-if="!isManager"> -->
      <div id="container">
        <div id="mood">
          
          <VoteMood name="Vote"/>
        </div>
        <div v-if="isManager" id="graph">  
          <p> L'humeur de votre équipe ces 30 derniers jours :</p>
          <ManagerInterface name="Manager" />
          
        </div>
      </div>
  </ion-page>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg } from '@ionic/vue';
import ManagerInterface from '@/components/ManagerInterface.vue';
import VoteMood from '@/components/VoteMood.vue';
import UserProfile from '@/components/UserProfile.vue';
// Importez les composants Ionic nécessaires
// ...

const isManager = ref(false);

const fetchUserRole = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    try {
      // Obtenez l'e-mail de l'utilisateur via Microsoft Graph
      const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const graphData = await graphResponse.json();
      const userEmail = graphData.mail || graphData.userPrincipalName;

      // Obtenez la liste des utilisateurs de Strapi
      const strapiResponse = await fetch('http://localhost:1337/api/users', {
        headers: {
          Authorization: `Bearer 8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5`
        }
      });
      if (!strapiResponse.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs depuis Strapi");
      }
      const usersData = await strapiResponse.json();

      // Trouvez l'utilisateur correspondant par e-mail et récupérez son rôle
      const user = usersData.find(u => u.email === userEmail);
      if (user && user.role2 === 'Manager') {
        isManager.value = true;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle de l'utilisateur:", error);
      // Gérer les erreurs, par exemple en déconnectant l'utilisateur
    }
  }
};

onMounted(() => {
  fetchUserRole();
});
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(180deg, rgba(186,207,255,1) 0%, rgba(243,247,255,1) 100%);
  height: 100%;
  position: relative;
  justify-content: flex-start;
}
.Logo {
  width: 55%;
  margin-top: 17%;
  align-self: center;
  margin-bottom: 0;
}
.Name {
  align-self: center;
  margin-top: 10%;
}

#container{
  display: grid;
  grid-gap: 10px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#graph{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 90%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1%;
  padding-top: 1%;
  border-radius: 20px;
  margin-bottom: 15%;
}
#mood{
  
}
</style>