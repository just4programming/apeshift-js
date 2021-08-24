const W3CWebSocket = require('websocket').w3cwebsocket;

class ApeMQ {
  constructor(authkey, url = 'wss://apeshift.com/mq/server_ws') {
    this.authkey = authkey
    this.url = url
  }

  onmessage(msg) {
    if (typeof msg === 'string') {
      console.log("Received: '" + msg + "'")
    }
  }

  onclose() {
    console.log('ApeMQ Closed. Reconnecting...')
    this.reconnect()
  }

  onopen() {
    console.log('ApeMQ Connected. Waiting...')
  }

  onerror() {
    console.log('Connection Error');
  }

  popMsg(msg) {
    if (!msg || !msg.dqcommand)
      return;

    this.client.send(msg.dqcommand)
  }

  start() {
    this.client = new W3CWebSocket(this.url, null, null, { "ApeToken": this.authkey });

    this.client.onerror = this.onerror

    this.client.onopen = this.onopen

    this.client.onclose = this.onclose

    this.client.onmessage = (e) => { 
      if (this.client.readyState === 1) { //OPEN

        const msg = JSON.parse(e.data)
        this.onmessage(msg)
        this.popMsg(msg)
      }
    }
  }

  close() {
    if (this.client.readyState !== 1)
      return
      
    this.client.close()
  }

  reconnect() {
    setTimeout(function() {
      this.start()
    }, 3000)
  }
}

module.exports = ApeMQ
