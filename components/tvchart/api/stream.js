import historyProvider from "./historyProvider.js"
import Cookies from "js-cookie"
import FilterUtils from "@/utils/FilterUtils"

const webSocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL

let _subs = []
let processId = -1

const methods = {
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    symbolInfo = symbolInfo
    subscriberUID = subscriberUID

    const newSub = {
      subscriberUID,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: onRealtimeCallback,
    }
    _subs.push(newSub)

    const socket = new WebSocket(webSocketUrl)

    socket.onopen = (e) => {
      console.log("socket connected")
      socket.send(
        JSON.stringify({
          wsTypeCode: "TRADE",
          wsSubCode: "ENTER",
          accessToken: Cookies.get("accessToken"),
        })
      )
    }

    socket.onclose = (e) => {
      console.log("socket disconnected")
      console.log(e)
    }
    socket.onerror = (e) => {
      //TODO reconnect (오류날때마다 5회)
      console.log("connection error " + webSocketUrl)
      console.log(e)
    }

    socket.onmessage = (e) => {
      const res = JSON.parse(e.data)
      const { wsCode, wsSubCode } = res
      const rcvdArr = res.data
      switch (wsCode) {
        case "COIN_TRADE":
          if (symbolInfo.name !== res.coinMarketCode) {
            break
          }
          const { tradePrice, tradeQuantity } = rcvdArr[0]
          const time = new Date(FilterUtils.utcToKst(rcvdArr[0].tradeAt))
          const data = {
            ts: time.getTime(),
            volume: tradeQuantity,
            price: tradePrice,
          }

          const sub = _subs.find((item) => item.subscriberUID === subscriberUID)

          if (sub) {
            if (data.ts < sub.lastBar.time / 1000) {
              return
            }

            const _lastBar = updateBar(data, sub)
            sub.listener(_lastBar)
            sub.lastBar = _lastBar
          }
          break

        default:
          break
      }
    }

    // 차트 자동 그리기
    if (processId === -1) {
      periodicUpdateBar(subscriberUID, onRealtimeCallback)
      processId = setInterval(() => {
        periodicUpdateBar(subscriberUID, onRealtimeCallback)
      }, 10 * 1000)
    }
  },
  unsubscribeBars: (subscriberUID) => {
    var subIndex = _subs.findIndex(
      (item) => item.subscriberUID === subscriberUID
    )
    if (subIndex === -1) {
      console.log("No subscription found for ", subscriberUID)
      return
    }
    _subs.splice(subIndex, 1)
  },
}

const updateBar = (data, sub) => {
  let lastBar = sub.lastBar
  let resolution = sub.resolution
  if (resolution.includes("D")) {
    resolution = 1440
  } else if (resolution.includes("W")) {
    resolution = 10080
  } else if (resolution.includes("M")) {
    resolution = 43200
  }
  let second = resolution * 60
  let rounded = Math.floor(data.ts / second) * second
  let lastBarSec = lastBar.time
  let _lastBar

  if (rounded > lastBarSec) {
    _lastBar = {
      time: rounded,
      low: lastBar.close,
      high: lastBar.close,
      open: lastBar.close,
      close: data.price,
      volume: data.volume,
    }
  } else {
    if (data.price < lastBar.low) {
      lastBar.low = data.price
    } else if (data.price > lastBar.high) {
      lastBar.high = data.price
    }

    lastBar.volume += data.volume
    lastBar.close = data.price
    _lastBar = lastBar
  }
  return _lastBar
}

// 가장 마지막 bar의 종가 기준으로 bar 생성
const periodicUpdateBar = (subscriberUID, onRealtimeCallback) => {
  const time = new Date()
  const sub = _subs.find((item) => item.subscriberUID === subscriberUID)
  if (sub) {
    let _lastBar = sub.lastBar
    _lastBar = {
      time: time.getTime(),
      low: sub.lastBar.close,
      high: sub.lastBar.close,
      open: sub.lastBar.close,
      close: sub.lastBar.close,
      volume: 0,
    }
    onRealtimeCallback(_lastBar)
  }
}

export default methods
