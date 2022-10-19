const axios = require("axios").default;

module.exports = function (session) {
  const Store = session.Store;

  class CacheStore extends Store {
    constructor(options) {
      super(options);

      if (!options.url)
        throw new Error(
          "You need to provide the URL to the fc-session-cache API!"
        );

      this.url = options.url;
    }

    get(sid) {
      axios.get(`${this.url}/get`, {});
    }
  }
};
