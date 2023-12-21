<template>
  <ion-page class="gradient-background">
    <img src="../images-icons/CombinedLogo.png" class="Logo"/>
    <UserProfile class="Name"/>
    <div class="Scroll">
    <Documentation class="Doc"/>
  </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import UserProfile from '@/components/UserProfile.vue';
import Documentation from '@/components/Documentation.vue'
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(180deg, rgba(186,207,255,1) 0%, rgba(255,255,255,1) 100%);
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
.Doc {
  margin-top: 10%;
  background-color: #FFF;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1%;
  padding-top: 1%;
  border-radius: 20px;

}
.Scroll {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>