  <template>
    <div id="templ">
        <p>Votre humeur du jour : </p>
        <div class="emoji-display">
          <img :src="selectedEmojiSrc" alt="Votre humeur sélectionnée">
        </div>
          <div class="list flex-container">
            <div v-for="number in 5" :key="number" class="img">
              <ion-button fill="clear" @click="selectMood(number)">
                <img :src="getEmojiSrc(number)" :alt="`Humeur ${number}`"
                :class="{ selected: mood === number }" class="Emote">
              </ion-button>
            </div>
            <ion-alert-controller></ion-alert-controller>
          </div>
        <ion-button @click="submitMood">Soumettre</ion-button>
        </div>
    
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton
    },
    
    data() {
      return {
        mood: null // Aucun émoji n'est sélectionné par défaut
      };
    },

    computed: {
      selectedEmojiSrc() {
        // Mettez à jour le chemin si nécessaire pour correspondre à l'emplacement de vos images
        return this.mood ? `src/images-icons/emoji/emoji${this.mood}.png` : 'src/images-icons/emoji/emoji4.png';
      }
    },
    
    methods: {
      selectMood(number) {
        this.mood = this.mood === number ? null : number;
      },
      getEmojiSrc(number) {
        // Mettez à jour le chemin si nécessaire pour correspondre à l'emplacement de vos images
        return `src/images-icons/emoji/emoji${number}.png`;
      },
      submitMood() {
        console.log('Humeur soumise:', this.mood);
  // Ici, vous mettriez la logique pour envoyer le vote au serveur...

  // Après avoir soumis le vote
      this.presentAlert();
      }
    }
  };
  
  </script>
  
  <style scoped>
  .emoji-display {
    text-align: center; /* Centre l'émoji principal */
    margin-bottom: 20px; /* Espace entre l'émoji principal et la liste de sélection */
    margin-top: 50px;
    size: 205%;
  }
  
  .emoji-display img {
    width: 35%; /* Ou la taille que vous souhaitez pour l'émoji principal */
    height: auto;
  }


  .selected {
  
  display: inline-block; /* Permet d'appliquer le padding et d'autres styles de boîte */
  padding: 5px; /* Ajustez selon la taille désirée pour le cercle */
  border-radius: 50%; /* Cela crée la forme circulaire */
  background-color: #CDDECC; /* Couleur de fond bleu clair avec transparence */
  transition: background-color 0.5s; /* Animation douce pour le changement de fond */
}

/* Styles supplémentaires pour l'image pour s'assurer qu'elle s'affiche correctement dans le cercle */
.selected img {
  display: block;
  max-width: 45%;
  height: auto;
}

.emote {
  width: 30%; /* Ou la taille que vous souhaitez pour l'émoji principal */
  height: auto;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > div {
  text-align: center;
}

.ion-button {
  text-align: center;
}
#templ{
  background-color: white;
  margin: 0;
  align-items: center;
  margin-top: 10%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #FFF;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1%;
  padding-top: 1%;
  border-radius: 20px;
}
  </style>
  