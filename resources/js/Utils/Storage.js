export default {
  get(key) {
    try {
      localStorage.getItem(key);
    } catch (e) {};
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {};
  }
}
