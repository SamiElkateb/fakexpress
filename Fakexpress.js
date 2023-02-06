const http = require("http");

class Fakexpress {
  #middlewares = [];

  constructor() {
    const instance = this.constructor.instance;
    if (instance) return instance;
    this.#init();
    this.constructor.instance = this;
  }

  #init() {
    this.httpServer = http.createServer((req, res) => {
      this.#manage(req, res);
    });
  }

  listen(port) {
    this.httpServer.listen(port);
    console.log(`Server listening on port ${port}...`);
  }

  async #manage(req, res) {
    const nextLoop = async (middlewaresStack) => {
      if (middlewaresStack.length === 0) return;
      const next = () => {
        nextLoop(middlewaresStack.slice(1));
      };

      const middleware = middlewaresStack[0];
      const isCurrentPath =
        req.url.replace(middleware.path, "") === "" ||
        typeof middleware.path === "undefined" ||
        middleware.path === "*";
      const isCurrentMethod =
        middleware.method === req.method ||
        typeof middleware.method === "undefined";

      if (isCurrentPath && isCurrentMethod) {
        await middleware.callback(req, res, next);
        return;
      }

      next();
    };

    nextLoop(this.#middlewares);
  }

  use(path, callback) {
    this.#middlewares.push({
      path,
      callback,
    });
  }

  get(path, callback) {
    this.#middlewares.push({
      path,
      method: "GET",
      callback,
    });
  }

  post(path, callback) {
    this.#middlewares.push({
      path,
      method: "POST",
      callback,
    });
  }

  delete(path, callback) {
    this.#middlewares.push({
      path,
      method: "DELETE",
      callback,
    });
  }

  put(path, callback) {
    this.#middlewares.push({
      path,
      method: "PUT",
      callback,
    });
  }

  patch(path, callback) {
    this.#middlewares.push({
      path,
      method: "PATCH",
      callback,
    });
  }

  static(path, callback) {
    this.#middlewares.push({
      method: "GET",
      callback : callback.bind(null, path)
    });
  }
}

module.exports = Fakexpress;
