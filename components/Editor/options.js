// Editor options
export const options = {
  placeholder: "Content goes here",
  autofocus: true,

  /**
   * onReady callback
   */
  onReady: () => {
    console.count("READY callback");
  },

  /**
   * onChange callback
   */
  onChange: () => {
    console.count("CHANGE callback");
  },
};
