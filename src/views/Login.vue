<template>
  <ion-page class="gradient-background">
    <img src="../images-icons/moodly-title.png" class="title"/>
    <img src="../images-icons/moodly-logo.png" class="logo"/>
    <LoginContainer class="Button"/>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginContainer from '@/components/LoginContainer.vue';
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(180deg, rgba(186,207,255,1) 0%, rgba(243,247,255,1) 100%);
  height: 100%;
  position: relative;
}
.logo {
  width: 60%;
  position: absolute;
  align-self: center;
  margin-top: 60%;
  margin-bottom: 50%;
}
.Button {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 17%;
}
.title{
  position: absolute;
  width: 50%;
  align-self: center;
  top:10%;
}
</style>
