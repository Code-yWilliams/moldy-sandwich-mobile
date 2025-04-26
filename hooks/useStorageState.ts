import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

type StateValue<T> = T | null;
type AsyncStateValue<T> = [boolean, StateValue<T>];
type UseStateHook<T> = [AsyncStateValue<T>, (value: StateValue<T>) => void];

const useAsyncState = <T>(
  initialValue: AsyncStateValue<T> = [true, null]
): UseStateHook<T> => {
  return useReducer(
    (
      _: AsyncStateValue<T>,
      action: StateValue<T> = null
    ): AsyncStateValue<T> => [false, action],
    initialValue
  ) as UseStateHook<T>;
};

export const setStorageItemAsync = async <T>(key: string, value: T | null) => {
  const storedValue = JSON.stringify(value);

  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, storedValue);
  }
};

export const useStorageState = <T>(key: string): UseStateHook<T> => {
  const [state, setState] = useAsyncState<T>();

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(JSON.parse(value ? JSON.parse(value) : null));
    });
  }, [key]);

  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
};
