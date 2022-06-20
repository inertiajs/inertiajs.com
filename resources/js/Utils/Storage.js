export default {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {};
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {};
  }
}
