export interface KeyboardItem {
  value: string;
  isDown: boolean;
  isUp: boolean;
  unsubscribe: () => void;
  press?: () => void;
  holdDown?: () => void;
  release?: () => void;
  downHandler?: (event: any) => void;
  upHandler?: (event: any) => void;
}

export const keyboard = ({
  value,
  press,
  release,
  holdDown,
}: {
  /**
   * This function will be called upon pressing the key.
   */
  value: string;
  /**
   * This function will be called upon pressing the key.
   */
  press: () => void;
  /**
   * This function will be called upon releasing the key. Will cancel any `holdDown` logic.
   */
  release: () => void;
  /**
   * This function will be called every `17`ms until the `release` function is called.
   */
  holdDown?: () => void;
}): KeyboardItem => {
  const key: Partial<KeyboardItem> = {
    value,
    isDown: false,
    isUp: true,
    press,
    release,
    holdDown,
  };

  let holdDownHandler: NodeJS.Timer;

  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();

        if (key.holdDown) {
          holdDownHandler = setInterval(
            () => (key.holdDown ? (key.holdDown() as any) : undefined),
            17
          );
        }
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();

        if (key.holdDown) {
          clearInterval(holdDownHandler);
        }
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key as KeyboardItem;
};
