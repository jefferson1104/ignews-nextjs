import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isTextInvisible, setIsTextInvisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
      setIsTextInvisible(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello World!</div>
      { isButtonVisible && <button>Button</button> }

      { !isTextInvisible && <p>Text example</p> }
    </div>
  )
}
