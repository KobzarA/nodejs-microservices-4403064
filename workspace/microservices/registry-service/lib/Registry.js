const semver = require("semver");

class Registry {
  constructor() {
    this.services = [];
    this.timeout = 15;
  }

  // eslint-disable-next-line class-methods-use-this
  getKey(name, version, ip, port) {
    return name + version + ip + port;
  }

  get(name, version) {
    const candidates = Object.values(this.services).filter((service) => {
      return (
        service.name === name && semver.satisfies(service.version, version)
      );
    });

    return candidates[Math.floor(Math.random * candidates.length)];
  }

  register(name, version, ip, port) {
    const key = this.getKey(name, version, ip, port);
    if (!this.services[key]) {
      this.services[key] = {
        name,
        version,
        ip,
        port,
        timestamp: Math.floor(new Date() / 1000)
      };
      console.log("Added service", this.services[key]);
    }
    this.services.timestamp = Math.floor(new Date() / 1000);
    console.log("Updated service", this.services[key]);
    return key;
  }

  unregister(name, version, ip, port) {
    const key = this.getKey(name, version, ip, port);
    delete this.services[key];
    console.log("Deleted service", key);
    return key;
  }
}

module.exports = Registry;
