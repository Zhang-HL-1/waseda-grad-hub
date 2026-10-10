#!/bin/bash
# 本地预览服务管理（可选工具）
#   ./tools/serve.sh start      启动，默认端口 8788
#   ./tools/serve.sh stop       关闭
#   ./tools/serve.sh status     查看状态
#   ./tools/serve.sh restart    重启
#   ./tools/serve.sh start 9000 指定端口
#
# 不依赖这个脚本也能手动开关，见 README「运行」一节。

set -u
PORT="${2:-8788}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PIDFILE="/tmp/waseda-grad-hub-serve-${PORT}.pid"
LOGFILE="/tmp/waseda-grad-hub-serve-${PORT}.log"

pids_on_port() { lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN -t 2>/dev/null; }

case "${1:-status}" in
  start)
    if [ -n "$(pids_on_port)" ]; then
      echo "端口 ${PORT} 已被占用（PID: $(pids_on_port | tr '\n' ' ')），未重复启动。"
      exit 1
    fi
    cd "${ROOT}" || exit 1
    nohup python3 -m http.server "${PORT}" --bind 127.0.0.1 >"${LOGFILE}" 2>&1 &
    echo $! >"${PIDFILE}"
    sleep 1
    if curl -sS -m 4 -o /dev/null "http://127.0.0.1:${PORT}/"; then
      echo "✅ 已启动：http://127.0.0.1:${PORT}/   （PID $(cat "${PIDFILE}")，日志 ${LOGFILE}）"
      echo "   关闭：./tools/serve.sh stop"
    else
      echo "❌ 启动失败，请查看日志：${LOGFILE}"
      exit 1
    fi
    ;;
  stop)
    found=0
    if [ -f "${PIDFILE}" ]; then
      kill "$(cat "${PIDFILE}")" 2>/dev/null && found=1
      rm -f "${PIDFILE}"
    fi
    for p in $(pids_on_port); do kill "${p}" 2>/dev/null && found=1; done
    sleep 1
    [ "${found}" = "1" ] && echo "✅ 已关闭端口 ${PORT} 上的预览服务" || echo "ℹ️ 端口 ${PORT} 上没有正在运行的服务"
    ;;
  restart)
    "$0" stop "${PORT}" >/dev/null 2>&1
    "$0" start "${PORT}"
    ;;
  status)
    p="$(pids_on_port)"
    if [ -n "${p}" ]; then
      echo "🟢 运行中：http://127.0.0.1:${PORT}/   PID $(echo "${p}" | tr '\n' ' ')"
    else
      echo "⚪️ 未运行（端口 ${PORT} 空闲）"
    fi
    ;;
  *)
    echo "用法：$0 {start|stop|restart|status} [端口]"; exit 1;;
esac
