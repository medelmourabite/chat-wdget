import {useState, useEffect} from "react";
import moment from "moment";

import fr from "./fr";
import en from "./en";
import nl from "./nl";

let currentLanguage = "fr";
export const useTranslation = () => {
  const [lng, setLng] = useState(currentLanguage);

  useEffect(() => {
    currentLanguage = lng || "fr";
    moment.locale(lng);
  }, [lng]);
  let t;
  switch (lng) {
    case "fr":
      t = key => fr?.[key] || key;
      break;
    case "nl":
      t = key => nl?.[key] || key;
      break;
    default:
      t = key => en?.[key] || key;
  }
  return {lng, t, setLng};
};
