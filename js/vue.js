new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function(){
           var damage = this.calculate(10, 3);
           this.turns.unshift({
               isPlayer: true,
               text: 'player hit the moster for ' + damage
           });
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return;
            }
            this.mosterAttack()
        },

        specialAttack: function(){
            var damage = this.calculate(20, 10);
            this.turns.unshift({
                isPlayer: true,
                text: 'player hits hard for ' + damage
            });
            this.monsterHealth -= damage
            if(this.checkWin()){
                return;
            }
            this.mosterAttack();

        },

        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'player heals for 10'
            });
        },

        giveUp: function(){
            this.gameIsRunning = false
        },

        mosterAttack: function(){
            var damage = this.calculate(12, 5);
            this.turns.unshift({
                isPlayer: false,
                text: 'moster hits player for ' + damage
            });
            this.playerHealth -= damage;
            this.checkWin();
        },

        calculate: function(max, min){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin: function(){
            if(this.monsterHealth <= 0){ 
                if(confirm('you won! New Game')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true
            }else if(this.playerHealth <= 0){
                if(confirm('you lost! New Game')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false
                }
                return true;
            }
            return false;
        },

    }

    
})