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
    };
  },
  methods: {
    handleAttackMonster() {
      this.round++;
      const dmg = controlRandom(5, 12);
      this.monsterHealth -= dmg;
      this.handleAttackPlayer();
    },
    handleAttackPlayer() {
      const dmg = controlRandom(8, 15);
      this.playerHealth -= dmg;
    },
    handleSpecialAttackMonster() {
      this.round++;
      this.specialRoundUsed = this.round;
      const dmg = controlRandom(10, 25);
      this.monsterHealth -= dmg;
      this.handleAttackPlayer();
    },
    handleHeal() {
      this.round++;
      const heal = controlRandom(6, 18);
      this.playerHealth += heal;
      this.handleAttackPlayer();
    },
  },
  computed: {
    allowSpecial() {
      return this.round - this.specialRoundUsed < 3;
    },
  },
});
app.mount("#game");
