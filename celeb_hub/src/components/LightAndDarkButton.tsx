import { useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
export const LightAndDarkButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const clickHandler = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className=" cursor-pointer fixed right-6 top-4">
      <div className=" text-primary" onClick={clickHandler}>
        {isDarkMode ? <BsSun size="30px" /> : <BsMoonStars size="30px" />}
      </div>
    </div>
  );
};