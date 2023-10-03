import React, { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";

export const LightAndDarkButton: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "lofi";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const clickHandler = () => {
    setTheme((prevTheme) => (prevTheme === "lofi" ? "luxury" : "lofi"));
  };

  const isDarkMode = theme === "luxury";

  return (
    <div className="cursor-pointer fixed right-6 top-4" onClick={clickHandler}>
      <div className="text-primary">
        {isDarkMode ? <BsSun size={30} /> : <BsMoonStars size={30} />}
      </div>
    </div>
  );
};
