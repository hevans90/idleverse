// https://github.com/apollographql/apollo-cache-persist/issues/361#issuecomment-912545495

import { makeVar, ReactiveVar } from '@apollo/client';

const getCleanValueForStorage = (value: unknown) =>
  typeof value === 'string' ? value : JSON.stringify(value);

export const makeVarPersisted = <T>(
  initialValue: T,
  storageName: string
): ReactiveVar<T> => {
  let value = initialValue;

  // Try to fetch the value from local storage
  const previousValue = localStorage.getItem(storageName);
  if (previousValue !== null) {
    try {
      const parsed = JSON.parse(previousValue);
      value = parsed;
    } catch {
      // It wasn't JSON, assume a valid value
      value = previousValue as unknown as T;
    }
  }

  // Create a reactive var with stored/initial value
  const rv = makeVar<T>(value);

  const onNextChange = (newValue: T | undefined) => {
    try {
      // Try to add the value to local storage
      if (newValue === undefined) {
        localStorage.removeItem(storageName);
      } else {
        localStorage.setItem(storageName, getCleanValueForStorage(newValue));
      }
    } catch {
      // ignore
    }

    // Re-register for the next change
    rv.onNextChange(onNextChange);
  };

  // Register for the first change
  rv.onNextChange(onNextChange);

  return rv;
};

export const toSnakeCase = (str: string) =>
  str
    .replace(/([A-Z])/g, '_$1') // Insert an underscore before all uppercase letters
    .replace(/^_/, '') // Remove the underscore from the start (if any)
    .toLowerCase(); // Convert the entire string to lowercase
