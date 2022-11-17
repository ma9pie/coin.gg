import ReconnectingWebSocket from "reconnecting-websocket";

const webSocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
let webSocket = {
  ws: {
    readyState: null,
  },
  coinMarketCode: null,
  connectionStartTime: null,
  connectionEndTime: null,
};
const options = {
  WebSocket: undefined, // WebSocket 생성자가 제공되지 않은 경우 기본값은 전역 WebSocket
  maxReconnectionDelay: 10000, // 재연결 최대 지연시간
  minReconnectionDelay: 1000, // 재연결 최소 지연시간
  reconnectionDelayGrowFactor: 1, // 재연결 지연 증가 인자
  minUptime: 5000, // 최소 가동시간
  connectionTimeout: 4000, // 연결시간 초과
  maxRetries: Infinity, // 최대 재시도 횟수
  maxEnqueuedMessages: Infinity, // 재연결될 때까지 버퍼링 메시지 수
  startClosed: false, // CLOSED 상태에서 websocket을 시작하고 reconnect()를 호출하여 연결
  debug: false, // 디버그 활성화
};

webSocket.onCreate = (callback) => {
  if (webSocket.ws.readyState !== 1) {
    webSocket.ws = new ReconnectingWebSocket(webSocketUrl, [], options);
    webSocket.ws.binaryType = "arraybuffer";
    console.log("📡소켓생성");
    if (callback) callback();
  }
};

webSocket.onOpen = (callback) => {
  webSocket.ws.onopen = (e) => {
    console.log("🧲소켓연결");
    if (callback) callback();
  };
};

webSocket.onSend = (msg) => {
  if (webSocket.ws.readyState === 1) {
    webSocket.ws.send(msg);
  }
};

webSocket.onMessage = (callback) => {
  webSocket.ws.onmessage = (e) => {
    const res = webSocket.converter(e);
    if (callback) callback(res);
  };
};

webSocket.converter = (e) => {
  let enc = new TextDecoder("utf-8");
  let arr = new Uint8Array(e.data);
  let str_d = enc.decode(arr);
  let d = JSON.parse(str_d);
  return d;
};

webSocket.onClose = (callback) => {
  webSocket.ws.onclose = (error) => {
    console.log("🔌소켓연결해제");
    if (callback) callback();
  };
};

webSocket.onError = () => {
  webSocket.ws.onerror = (error) => {
    console.log("🚫소켓에러 " + webSocketUrl);
    console.log(error);
  };
};

export default webSocket;
