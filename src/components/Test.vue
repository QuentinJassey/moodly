<template>
    <div>
      <canvas v-if="loaded" ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import moment from 'moment';
  import { ref, onMounted } from 'vue';
  
  Chart.register(...registerables);
  
  export default {
    setup() {
      const canvas = ref(null);
      const loaded = ref(false);
  
      const fetchMoods = async () => {
        try {
          const response = await fetch('http://localhost:1337/api/moods', {
            headers: {
              Authorization: `Bearer 8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5`
            }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
  
          if (!Array.isArray(result.data)) {
            throw new Error('Expected an array of moods');
          }
  
          const moods = result.data.map(item => item.attributes);
  
          const filteredMoods = moods.filter(mood => {
            return moment(mood.date).isAfter(moment().subtract(30, 'days'));
          });
  
          let moodGroups = {};
          filteredMoods.forEach(mood => {
            const day = moment(mood.date).format('YYYY-MM-DD');
            if (!moodGroups[day]) {
              moodGroups[day] = [];
            }
            moodGroups[day].push(mood.mood);
          });
  
          let chartData = {
            labels: [],
            datasets: [{
              label: 'Mood Average',
              backgroundColor: '#f87979',
              data: []
            }]
          };
  
          for (let day in moodGroups) {
            const moods = moodGroups[day];
            const averageMood = moods.reduce((acc, val) => acc + val, 0) / moods.length;
            chartData.labels.push(day);
            chartData.datasets[0].data.push(averageMood);
          }
  
          loaded.value = true;
  
          // Créer le graphique une fois les données chargées
          if (loaded.value && canvas.value) {
            new Chart(canvas.value.getContext('2d'), {
              type: 'line',
              data: chartData,
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    min: 1,
                    max: 5
                  },
                  x: {
                    type: 'time',
                    time: {
                      unit: 'day',
                      tooltipFormat: 'LL'
                    }
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error('Error fetching moods:', error);
        }
      };
  
      onMounted(() => {
        fetchMoods();
      });
  
      return {
        canvas,
        loaded
      };
    }
  };
  </script>