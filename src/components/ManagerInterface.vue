<template>
    <div class="Card">
      <canvas id="moodsChart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        moodsData: []
      };
    },
    async mounted() {
      await this.fetchMoods();
      this.createChart();
    },
    methods: {
        async fetchMoods() {
        const token = '8104b7a598979da05b13bfe5ebae2517b274c08a5a4e3e1571f92c5ab58a1e5892946ac83b97dad88a312616909fd555fbeab6dfaf806fd2db5722e2c881b2ff623f437405d5b8e9186c54739fb22ea10fca3de1789258c89f49b6a9e081c86bd3c8f64c7fcd2789139f12a99c505e2b1ebc946454a6f5bdaf0cc2922ddedcc5';
        try {
            const response = await fetch('http://localhost:1337/api/moods', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch moods');
            }
            const responseData = await response.json();
            // Extraire les attributs de chaque élément
            this.moodsData = responseData.data.map(item => item.attributes);
            this.moodsData.sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (error) {
            console.error('Error fetching moods:', error);
        }
        },
      createChart() {
        // Trier et grouper les données par date
        const groupedData = this.groupMoodsByDate(this.moodsData);
        // Créer les labels et les données pour le graphique
        const chartLabels = Object.keys(groupedData);
        const chartData = Object.values(groupedData).map(moods => {
          const total = moods.reduce((acc, mood) => acc + mood.mood, 0);
          return total / moods.length; // Calculer la moyenne
        });
  
        new Chart(document.getElementById('moodsChart'), {
          type: 'line',
          data: {
            labels: chartLabels,
            datasets: [{
              label: 'Tendance',
              data: chartData,
              fill: false,
              borderColor: '#5F41B2',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      groupMoodsByDate(moodsData) {
        return moodsData.reduce((acc, mood) => {
            const date = new Date(mood.date).toLocaleDateString();
            if (!acc[date]) {
            acc[date] = [];
            }
            acc[date].push(mood);
            return acc;
        }, {});
        }
    }
  };
  </script>

  <style scoped>
  /* #moodsChart {
    padding: 0;
    margin: 0;
  } */
</style>