<template>
  <ion-page class="gradient-background">
        <img src="../images-icons/CombinedLogo.png" class="Logo"/>
        <UserProfile class="Name"/>
        <ProfileCard class="Card"/>
        <div class="Buttons">
        <LogoutContainer class="Logout"/>
        <DeleteAccount class="Delete"/>
      </div>
  </ion-page>
</template>

<script setup lang="ts">
import ProfileCard from '@/components/ProfileCard.vue';
import LogoutContainer from '@/components/LogoutContainer.vue';
import UserProfile from '@/components/UserProfile.vue';
import DeleteAccount from '@/components/DeleteAccount.vue';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonToggle,
    IonToolbar,
    IonTitle,
  } from '@ionic/vue';
</script>

<style scoped>
.gradient-background {
  background-color: #FFF;
  height: 100%;
  width: 100%;
  position: relative;
  justify-content:flex-start;
  align-items: center;
} 
.Logo {
  width: 55%;
  margin-top: 17%;
  align-self: center;
  margin-bottom: 0;
}
.Card {
  justify-content: end;
  margin-top: 5%;
  width: 90%;
}

.Name {
  align-self: center;
  margin-top: 10%;
}
.Buttons {
  width: 90%;
  position: absolute;
  bottom: 2%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
</style>