  <template>
    <div id="templ">
        <p>Votre humeur du jour : </p>
        <div class="emoji-display">
          <img :src="selectedEmojiSrc" alt="Votre humeur sélectionnée">
        </div>
          <div class="list flex-container">
            <div v-for="number in 5" :key="number" class="img">
              <ion-button fill="clear" @click="selectMood(number)" class="Emote">
                <img :src="getEmojiSrc(number)" :alt="`Humeur ${number}`"
                :class="{ selected: mood === number }">
              </ion-button>
            </div>
          </div>
        <div class="Button">  
        <img src="../images-icons/BoutonPush.png" @click="submitMood" class="BTN" />
      </div>
    </div>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton},
    
    data() {
      return {
        mood: null, // Aucun émoji n'est sélectionné par défaut
      };
      
    },

    computed: {
      selectedEmojiSrc() {
        return this.mood ? `src/images-icons/emoji/emoji${this.mood}.png` : 'src/images-icons/emoji/emoji4.png';
      }
    },
    
    methods: {
      selectMood(number) {
        this.mood = this.mood === number ? null : number;
      },

      getEmojiSrc(number) {
        return `src/images-icons/emoji/emoji${number}.png`;
      },

      async submitMood() {
      // Assurez-vous que la variable `mood` n'est pas nulle avant de soumettre
      if(this.mood === null) {
        alert("Veuillez sélectionner votre humeur avant de soumettre.");
        return;
      }

      try {
        const response = await fetch('http://localhost:1337/api/moods', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5`, // Supposons que vous avez un token d'auth
          },
          body: JSON.stringify({
            data: {
              mood: this.mood,
              date: new Date() // La date actuelle
            }
          })
        });

        if (!response.ok) {
          throw new Error("Échec de l'envoi de l'humeur");
        }

        const responseData = await response.json();
        // alert("Humeur soumise avec succès");
        console.log('Humeur soumise avec succès:', responseData);

        // Affichez le message de confirmation
        this.showConfirmation = true;
        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'humeur:", error);
      }
    }
  }
};
  
  </script>
  
  <style scoped>
  .emoji-display {
    text-align: center; /* Centre l'émoji principal */
    margin-bottom: 10px; /* Espace entre l'émoji principal et la liste de sélection */
    margin-top: 10px;
    size: 205%;
  }
  
  .emoji-display img {
    width: 28%; /* Ou la taille que vous souhaitez pour l'émoji principal */
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
  max-width: 55%;
  height: auto;
}

.emote {
  width: 40%; /* Ou la taille que vous souhaitez pour l'émoji principal */
  height: auto;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > div {
  text-align: center;
}

.BTN {
  text-align: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
  justify-self: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.Button {
  display: flex;
  justify-content: center;
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
.Emote {
    width: 120%;
}
  </style>
  