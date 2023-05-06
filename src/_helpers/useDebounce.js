import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (callback, delay) => {
    const debouncedFn = useCallback(
        debounce((...args) => callback(...args), delay),
        [delay]
    );
    return debouncedFn;
};

/*
- call this to use debounce for search directly to server
- setInputValue() is the hook to store onChange function of input
- nextValue is the event.target.value from input field

const debounceSave = useDebounce((nextValue) => setInputValue(nextValue), 1000);

- then call this function inside onChnage input field

debouncedSave(e);
*/