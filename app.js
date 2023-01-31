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
      const dmg = controlRandom(10, 25);
      this.monsterHealth -= dmg;
      this.handleAttackPlayer();
    },
  },
});
app.mount("#game");
