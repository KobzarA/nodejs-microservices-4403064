const axios = require("axios");
const config = require("../config");

class ServiceClient {
  static async getService(servicename) {
    try {
      const response = await axios.get(
        `${config.registry.url}/find/${servicename}/${config.registry.version}`
      );
      if (!response.data.ip) {
        throw new Error(
          `Couldn't find ${servicename}:${config.registry.version}`
        );
      }
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.data.errorMessage) ||
        error.message;

      throw new Error(errorMessage);
    }
  }

  static async callService(servicename, reqOptions) {
    const { ip, port } = await this.getService(servicename);
    // eslint-disable-next-line no-param-reassign
    reqOptions.url = `http://${ip}:${port}${reqOptions.url}`;
    try {
      const response = await axios.request(reqOptions);
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.data.errorMessage) ||
        error.message;

      throw new Error(errorMessage);
    }
  }
}

module.exports = ServiceClient;
