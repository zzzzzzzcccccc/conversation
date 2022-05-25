function getEnvByKey(key: string) {
  return window.env[key]
}

export function getEnv() {
  return getEnvByKey('ENV')
}

export function getApiGateWay() {
  return getEnvByKey('API_GATEWAY')
}

export function getSocketGateWay() {
  return getEnvByKey('SOCKET_GATEWAY')
}
