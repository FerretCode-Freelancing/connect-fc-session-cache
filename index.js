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
          if (response.status !== 200) callback(null);

          const json = await response.json();

          callback(json, null);
        })
        .catch((err) => callback(null, err));
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
          if (response.status !== 200) callback(null);

          const json = response.json();

          callback(json, null);
        })
        .catch((err) => callback(null, err));
    }

    remove(callback) {
      fetch(`${this.url}/remove`, {
        method: "DELETE",
      })
        .then(async (response) => {
          if (response.status !== 200) callback(null);

          const text = response.text();

          callback(text, null);
        })
        .catch((err) => callback(null, err));
    }

		touch(sid, session, callback) {
			this.get(sid, (_, err) => {
				if (err != null) 
					return callback(null, err);

				this.set(
					sid,
					JSON.stringify(session),
					(res, err) => {
						if (err != null)
							return callback(null, err);

						callback(res, err);
					}
				)
			});	
		}
  }

  return CacheStore;
};
