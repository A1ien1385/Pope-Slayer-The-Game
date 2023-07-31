function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
   data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      popePhoto: 'Cenzo1.jpg',
      counter: 0,
      winner: null
     
    };
   },

   computed: {
     monsterBarStyles() {
      return {width: this.monsterHealth + '%'}
     },

     playerBarStyles() {
      return {width: this.playerHealth + '%'}
     },
     
     mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0
     }

     
   },
   watch: {
     playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = 'draw';
      }else if (value <= 0) {
        //Player lost
        this.winner = 'monster';
      } 
     },
     monsterHealth(value) {
      if(value <=0 && this.playerHealth <= 0) {
        //A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        //Pope lost 
        this.winner = 'player';
      }
     }
   },

  methods: {
    attackMonster() {      
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.popeChangePhoto();

     
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.popeChangePhoto();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if(this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      }
      else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    popeChangePhoto() {
      this.counter++;
      if (this.counter === 2)
      {
        this.popePhoto = 'Cenzo2.jpg'
      }

      else if (this.counter === 4)
      {
        this.popePhoto = 'Cenzo3.jpg'
      }

      else if (this.counter === 6)
      {
        this.popePhoto = 'Cenzo4.jpg'
      }

      else if (this.counter === 8)
      {
        this.popePhoto = 'Cenzo4.jpg'
      }

      else if (this.counter === 10)
      {
        this.popePhoto = 'Cenzo5.jpg'
      }

    }

  }
});

app.mount('#game');