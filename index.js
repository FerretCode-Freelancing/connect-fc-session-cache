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

    get(sid, callback) {
      fetch(`${this.url}/get`, {
        body: JSON.stringify({ cookie: sid }),
      })
        .then(async (response) => {
          if (response.status !== 200) {
						const text = await response.text();

						callback(null, text);
					};

          const json = await response.json();

					console.log(json);

          callback(err, sess);
        })
        .catch((err) => callback(err, null));
    }

    set(sid, session, callback) {
			fetch(`${this.url}/put`, {
        method: "POST",
        body: JSON.stringify({
          cookie: sid,
          session,
        }),
      })
        .then(async (response) => {
          const text = response.text();

          callback(null, text);
        })
        .catch((err) => callback(err, null));
    }

    destroy(callback) {
      fetch(`${this.url}/remove`, {
        method: "DELETE",
      })
        .then(async (response) => {
					const text = response.text();

          callback(null, text);
        })
        .catch((err) => callback(err, null));
    }
	}

  return CacheStore;
};
