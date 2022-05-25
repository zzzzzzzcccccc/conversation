const SESSION_DATA_KEY = '__CONVERSATION_ACCESS_TOKEN__';
const ex = 3 * 60 * 60 * 1000;

function getSessionAccessToken() {
  if (window.localStorage) {
    const sessionData = localStorage.getItem(SESSION_DATA_KEY)
    if (sessionData) {
      try {
        return JSON.parse(sessionData) || {}
      } catch (e) {
        return {}
      }
    }
    return {}
  } else {
    return {}
  }
}

function getAccessToken() {
  return getSessionAccessToken().token  ? `Bearer ${getSessionAccessToken().token}` : undefined
}

function validateToken() {
  const sessionData = getSessionAccessToken();

  if (!sessionData.token || !sessionData.time) {
    clearAccessToken()
    return false
  }

  if (sessionData.time) {
    const diffEx = Date.now() - (+sessionData.time)
    const active = diffEx < ex

    if (!active)
      clearAccessToken()

    return active
  } else {
    clearAccessToken()
    return false
  }
}

function clearAccessToken() {
  localStorage.removeItem(SESSION_DATA_KEY);
}

function setAccessToken(token: string) {
  if (window.localStorage) {
    localStorage.setItem(SESSION_DATA_KEY, JSON.stringify({ time: Date.now(), token }))
  }
}

export {
  getSessionAccessToken,
  getAccessToken,
  setAccessToken,
  validateToken,
  clearAccessToken,
}
