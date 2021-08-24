const { getMempoolAddresses } = require('./blockcypher')
const ApeApi = require('./src/apeapi')
const ApeMQ = require('./src/apemq')


const KEY = "d475d43a-1052-4076-8024-a00a1c36723a"
const blk = 'ltc'

const apemq = new ApeMQ(KEY)
const apeapi = new ApeApi(KEY)

function customMsgHandler(msg) {
  console.log("NEW CONFIRMATION: '" + JSON.stringify(msg) + "'")
}

apemq.onmessage = customMsgHandler


async function startTest() {
  const addresses = await getMempoolAddresses(blk)
  
  apemq.start()

  //const r = await apeapi.addAddress(addresses[0], 'ltc')
  //console.log(r)
  
  addresses.forEach(async addr => {
    
    const resp = await apeapi.addAddress(addr, blk)
    console.log(`Added ${addr} : Received token ${resp}`)
  })
  
}

startTest()

//apemq.start()