import { useSyncExternalStore } from "react";


function dispatchStorageEvent(key:string, newValue:string | null) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }))
}

export function useLocalStorage<T>(key:string, initialValue: T) {

  const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);

    return () => window.removeEventListener('storage', callback)
  } 

  const getSnapshot = () => {
    try {
      const value = localStorage.getItem(key);
      return value ? value : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  }

  const rawValue = useSyncExternalStore(subscribe, getSnapshot);
  const parsedValue: T = JSON.parse(rawValue)

  const setValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(parsedValue) : newValue;
      const stringifyValue = JSON.stringify(valueToStore)
      localStorage.setItem(key, stringifyValue)
      dispatchStorageEvent(key, stringifyValue)
    } catch (error) {
      console.log(`Error in localStorage save(key "${key}"): ${error}`);
    }
  }

  return [parsedValue, setValue] as const
}

