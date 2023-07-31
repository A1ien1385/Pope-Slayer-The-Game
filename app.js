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
      shionPhoto: 'shion1.jpg',
      counter: 0,
      winner: null,
      logMessages: []
     
    };
   },

   computed: {
  
     monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%'};
      }

      return {width: this.monsterHealth + '%'}
     },

     playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%'};
      }
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
    startGame(){
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.currentRound = 0,
      this.popePhoto = 'Cenzo1.jpg',
      this.winner = null,
      this.logMessages = []
    },

    attackMonster() {      
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessages('player', 'attack', attackValue);
      this.attackPlayer();
      this.popeChangePhoto();
      this.shionChangePhoto();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessages('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessages('player', 'attack', attackValue);
      this.attackPlayer();
      this.popeChangePhoto();
      this.shionChangePhoto()
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
      this.addLogMessages('player', 'heal', healValue);
      this.attackPlayer();
    },
    popeChangePhoto() {
      
      if (this.monsterHealth >= 91 && this.monsterHealth <= 100)
      {
        this.popePhoto = 'Cenzo1.jpg'
      }

      else if (this.monsterHealth >= 61 && this.monsterHealth <= 90)
      {
        this.popePhoto = 'Cenzo2.jpg'
      }

      else if (this.monsterHealth >= 30 && this.monsterHealth <= 60)
      {
        this.popePhoto = 'Cenzo3.jpg'
      }

      else if (this.monsterHealth >= 6 && this.monsterHealth <= 29)
      {
        this.popePhoto = 'Cenzo4.jpg'
      }

      else if (this.monsterHealth <= 0) {
        this.popePhoto = 'Cenzo5.jpg';
      }

    },


    shionChangePhoto(){

      if (this.playerHealth >= 1 && this.playerHealth <= 100)
      {
        this.shionPhoto = 'shion1.jpg'
      }

      else if (this.playerHealth <= 0) {
        this.shionPhoto = 'shion2.png';
      }

    },

    surrender() {
      this.winner = 'monster';
    },
    addLogMessages(who, what, value) {
       this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
       });
    }

  }
});

app.mount('#game');