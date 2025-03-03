import { AppState } from "./stateTypes";

const STATE_STORAGE_KEY = "JOTLocalStorage";

function saveToLocalStorage(state: AppState) {
  localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
}

function loadFromStorage(): AppState | undefined {
  const savedValue = localStorage.getItem(STATE_STORAGE_KEY);
  if (savedValue === null) {
    return undefined;
  }
  return JSON.parse(savedValue);
}

export { saveToLocalStorage, loadFromStorage };
