import React, { useEffect } from "react";
import Toggle from "react-toggle";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../modules"
import { setDark } from "../../modules/dark"

const DARK_CLASS = "dark";

export const DarkToggle = () => {
  const dark = useSelector((state: RootState) => state.dark.dark);
  const dispatch = useDispatch()

  /*
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      dispatch(setDark(prefersDark))
    }
  );
  */

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [dark]);

  return (
    <Toggle
      className="DarkToggle"
      checked={dark}
      onChange={toggleEvent => dispatch(setDark(toggleEvent.target.checked))}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode"
    />
  );
};