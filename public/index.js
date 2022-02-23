let ws = null;
onmessage = (e) => {
  console.log("INSIDE THE WEB WORKER", e.data);
  if (e.data.type === "trial") {
    ws = connectWS();
  }
  console.log("WEBSOCKET WS", ws);
  if (e.data.type === "get_data") {
    console.log("HERE", e.data);
    sendEvent(JSON.stringify(e.data));
  }
  ws.onmessage = (e) => {
    postMessage(e.data);
  };
};

const connectWS = () => {
  console.log("ws", ws);
  if (ws === null || ws.readyState === 3) {
    ws = new WebSocket(`ws://10.0.0.67:3050`);
  }
  messages = [];
  return ws;
};

const sendEvent = (data) => {
  // messages.push(data)
  if (ws !== null) {
    if (ws.readyState !== 1) {
      messages.push(data);
    } else {
      console.log("HERE");
      ws.send(data);
    }
    ws.onopen = () => {
      messages.forEach((message) => {
        ws.send(JSON.stringify(message));
      });
    };

    ws.onclose = () => {};
    ws.onerror = (err) => {
      if (ws.code !== 4000) {
        setTimeout(function () {
          connectWS();
        }, 2000);
      }
    };
    return ws;
  } else {
    connectWS();
  }
};
const closeWS = (token) => {
  if (ws) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ type: "close-connection" }));
      ws.close();
      ws = null;
      //  connectWS(token)
    }
  }
};
