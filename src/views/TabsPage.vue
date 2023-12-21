<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="Tab">
        <ion-tab-button tab="tab1" href="/tabs/tab1" class="BTN">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/tab2" class="BTN">
          <ion-icon aria-hidden="true" :icon="bookOutline" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3" class="BTN">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {personCircleOutline, homeOutline, bookOutline} from 'ionicons/icons';
import { logoIonic } from 'ionicons/icons';
import { defineComponent } from 'vue';

</script>

<style scoped>
.tab-bar-custom {
  background-color: red;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
}

ion-tab-button {
  color: #A58CB9; 
  position: relative;
  background-color: #ECE3F3;
}
ion-tab-button.tab-selected::after {
  content: '';
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 20%;
  height: 5px;
  background-color: #A58CB9;
  border-radius: 20%;
}
ion-tab-bar {
  border: none;
}
</style>