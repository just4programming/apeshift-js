const axios = require('axios')

class ApeApi {
  constructor(authkey, url = "https://apeshift.com/mq/") {
    this.authkey = authkey
    this.url = url
  }

  async request(method, data) {
    try {
      const url = `${this.url}/${method}`

      const { data: response } = await axios({
        method: 'POST',
        headers: { ApeToken: this.authkey },
        url, 
        data
      })

      return response
    }
    catch (exc) {
      console.log(exc)
      throw new Error('Error getting ApeShift response')
    }
  }

  async addAddress(address, blk) {
    const data = {
      network: blk,
      address: address
    }

    return this.request("add_address", data);
  }
}

module.exports = ApeApi