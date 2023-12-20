<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-list :inset="true">
        <ion-item>
          <ion-label label="Prenom" placeholder="Jean">Prénom: Jean </ion-label>
        </ion-item>
        <ion-item>
          <ion-input label="Nom" placeholder="Du Jardin"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Role" placeholder="Admin"></ion-input>
        </ion-item>
        <ion-item>
          <ion-toggle>
            <ion-label>Allow Notifications</ion-label>
            <ion-note color="medium">Unsubscribe at any time</ion-note>
          </ion-toggle>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-textarea label="Comments" label-placement="floating" rows="5"></ion-textarea>
        </ion-item>
      </ion-list>

      <ion-note color="medium" class="ion-margin-horizontal">
        Your comments will be kept anonymous and will only be used to improve the reliability of our products.
      </ion-note>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
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
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
