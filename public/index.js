let ws = null
let startTime = null
let intervalId = null
onmessage = (e) => {
  if (e.data.type === 'trial') {
    ws = connectWS()
  }
  if (e.data.type === 'get_data' && e.data.mode && e.data.timesMode && e.data.power) {
    e.data.mode = 'singleTrade'
    const types = ['MKT', 'FOK', 'RFQ']
    const sides = ['BUY', 'SELL']
    intervalId = setInterval(() => {
      startTime = Date.now()
      let random_type = types[Math.floor(Math.random() * types.length)]
      let random_side = sides[Math.floor(Math.random() * sides.length)]
      let random_product = e.data.products[Math.floor(Math.random() * e.data.products.length)]
      e.data.startTime = startTime
      e.data.filters = {
        types: [random_type],
        sides: [random_side],
        products: [random_product],
      }
      sendEvent(JSON.stringify(e.data))
    }, 1000)
  } else if (e.data.type === 'get_data' && !e.data.mode && e.data.timesMode && e.data.power) {
    e.data.mode = 'singleTrade'
    intervalId = setInterval(() => {
      startTime = Date.now()
      let newData = e.data
      newData.startTime = startTime
      sendEvent(JSON.stringify(newData))
    }, 2000)
  } else if (e.data.type === 'get_data') {
    sendEvent(JSON.stringify(e.data))
  }
  if (e.data.type === 'products') {
    sendEvent(e.data)
  }
  if (e.data.type === 'stopInterval') {
    clearInterval(intervalId)
  }
  ws.onmessage = (e) => {
    postMessage(e.data)
  }
}

const connectWS = () => {
  if (ws === null || ws.readyState === 3) {
    ws = new WebSocket(`ws://10.0.0.67:3050`)
  }
  messages = []
  return ws
}

const sendEvent = (data) => {
  // messages.push(data)
  if (ws !== null) {
    if (ws.readyState !== 1) {
      messages.push(data)
    } else {
      ws.send(data)
    }
    ws.onopen = () => {
      messages.forEach((message) => {
        ws.send(JSON.stringify(message))
      })
    }

    ws.onclose = () => {}
    ws.onerror = (err) => {
      if (ws.code !== 4000) {
        setTimeout(function () {
          connectWS()
        }, 2000)
      }
    }
    return ws
  } else {
    connectWS()
  }
}
const closeWS = (token) => {
  if (ws) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'close-connection' }))
      ws.close()
      ws = null
      //  connectWS(token)
    }
  }
}
