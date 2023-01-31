const HEALTH = 100;
const controlRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: HEALTH,
      monsterHealth: HEALTH,
      round: 0,
      specialRoundUsed: 0,
      winner: null,
      logMsgs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.specialRoundUsed = 0;
      this.winner = null;
      this.logMsgs = [];
    },
    handleAttackMonster() {
      this.round++;
      const dmg = controlRandom(5, 12);
      this.monsterHealth -= dmg;
      this.addLogMsg("player", "attack", dmg);
      this.handleAttackPlayer();
    },
    handleAttackPlayer() {
      const dmg = controlRandom(8, 15);
      this.playerHealth -= dmg;
      this.addLogMsg("monster", "attack", dmg);
    },
    handleSpecialAttackMonster() {
      this.round++;
      this.specialRoundUsed = this.round;
      const dmg = controlRandom(10, 25);
      this.monsterHealth -= dmg;
      this.addLogMsg("player", "attack", dmg);

      this.handleAttackPlayer();
    },
    handleHeal() {
      this.round++;
      const heal = controlRandom(6, 18);
      if (this.playerHealth + heal > 100) this.playerHealth = 100;
      else {
        this.playerHealth += heal;
      }
      this.addLogMsg("player", "heal", heal);

      this.handleAttackPlayer();
    },
    handleSurrender() {
      this.playerHealth -= 999;
    },
    addLogMsg(who, what, value) {
      this.logMsgs.unshift({
        actionBy: who,
        type: what,
        actionValue: value,
      });
    },
  },
  computed: {
    allowSpecial() {
      return this.round - this.specialRoundUsed < 3;
    },
    monsterBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
  },
});
app.mount("#game");
