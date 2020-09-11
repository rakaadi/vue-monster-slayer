new Vue({
    el: "#app",
    data: {
        playerHp: 100,
        monsterHp: 100,
        gameIsRunning: false,
        actions: []

    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHp = 100;
            this.monsterHp = 100;
            this.actions = [];
        },
        playerAttack: function () {
            // Player attack
            let damage = this.calculateDamage(3, 10);
            this.monsterHp -= damage;
            this.actions.unshift({
                isPlayer: true,
                log: `Player deals ${damage} damage to Monster`
            })

            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function () {
            // Player attack
            let damage = this.calculateDamage(9, 18);;
            this.monsterHp -= damage;
            this.actions.unshift({
                isPlayer: true,
                log: `Player deals ${damage} damage to Monster`
            })

            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        monsterAttack: function () {
            // Monster attack
            let damage = this.calculateDamage(6, 12);
            this.playerHp -= damage;
            this.checkWin();
            this.actions.unshift({
                isPlayer: false,
                log: `Monster deals ${damage} damage to Player`
            })
        },
        heal: function () {
            let healing = 10;
            if (this.playerHp <= 90) {
                this.playerHp += healing;
            } else {
                this.playerHp = 100;
            }

            this.actions.unshift({
                isPlayer: true,
                log: `Player heal for ${healing}`
            })
            this.monsterAttack();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkWin: function () {
            if (this.monsterHp <= 0) {
                if (confirm("You won! The monster has been slain... Start a new game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return;
            } else if (this.playerHp <= 0) {
                if (confirm("Slain... Try again?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            }
        }
    }
});