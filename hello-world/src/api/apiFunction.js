export default {
  async getData(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("getData (x) : " + x);
        resolve(x);
      }, 2000);
    });
  },
};
