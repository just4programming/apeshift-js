const axios = require('axios')

async function getMempoolAddresses(blk) {
  var url = `https://api.blockcypher.com/v1/${blk}/main/txs`

  const { data } = await axios.get(url)
  let addresses = []

  data.forEach(txn => {
    if (!txn.outputs)
      return

    txn.outputs.forEach(output => {
      if (!output.addresses)
        return

      addresses = [...addresses,...output.addresses]
    })
  })

  return addresses
}

module.exports = { getMempoolAddresses }