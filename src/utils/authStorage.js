const USER_KEY = 'ofrehberi_user';

export function getStoredUser() {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

export function storeUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('ofrehberi-auth-changed'));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('ofrehberi-auth-changed'));
}
