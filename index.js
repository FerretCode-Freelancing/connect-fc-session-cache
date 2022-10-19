const { default: fetch } = require("node-fetch");

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
      return new Promise(async (reject, resolve) => {
        const response = await fetch(this.url, {
          body: JSON.stringify({ cookie: sid }),
        }).catch((err) => {
          reject(err);
        });

        json = await response.json().catch((err) => {
          reject(err);
        });

        resolve(json);
      });
    }

    set(sid, session) {
      args = [sid];

      let value;
      try {
        value = this.serializer.stringify(value);
      } catch (err) {}
    }
  }
};
