import moment from "moment";
import "moment/locale/fr";
import "moment/locale/nl";

import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  table, template, textStyle
} from "suneditor/src/plugins";

const yesterday = "hier";
const sameDay = "H:mm";

// export const timeSince = (date) => {
//
//   let seconds = Math.floor((new Date() - date) / 1000);
//
//   let interval = seconds / 31536000;
//
//   if (interval > 1) {
//     return Math.floor(interval) + " years";
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return Math.floor(interval) + " months";
//   }
//   interval = seconds / 86400;
//   if (interval > 1) {
//     return Math.floor(interval) + " days";
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return Math.floor(interval) + " hours";
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return Math.floor(interval) + " minutes";
//   }
//   return Math.floor(seconds) + " seconds";
// };

const sameElse = function (now) {
  const diff = Math.ceil(this.diff(now, "years", true));
  return diff < 0 ? "MMM D YYYY" : "MMM D";
};

export const timeSince = (date) => moment(date).calendar(null, {
  lastDay: `[${yesterday}]`,
  sameDay,
  lastWeek: "dddd",
  sameElse,
});

// export const timeSince = (date) => moment(date).fromNow(true);

export const stripeTags = (str = "") => {
  return str.replace(/(<\/?[^>]+(>|$)|\&[\w]+\;)/g, "");
};

export const getSunEditorToolbarConfig = () => {
  return {
    resizingBar: true,
    showPathLabel: false,
    height: 'auto',
    stickyToolbar: -1,
    placeholder: "...",
    plugins: [
      align,
      font,
      fontColor,
      fontSize,
      formatBlock,
      hiliteColor,
      horizontalRule,
      lineHeight,
      list,
      table,
      template,
      textStyle
    ],
    buttonList: [
      ["undo", "redo"],
      ["font"],
      ["fontSize"],
      ["formatBlock"],
      [
        "bold",
        "underline",
        "italic",
        // "strike",
        // "subscript",
        // "superscript"
      ],
      ["align", "horizontalRule", "list", "lineHeight"],
    ],
    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    font: [
      "Arial",
      "Calibri",
      "Comic Sans",
      "Courier",
      "Garamond",
      "Georgia",
      "Impact",
      "Lucida Console",
      "Palatino Linotype",
      "Segoe UI",
      "Tahoma",
      "Times New Roman",
      "Trebuchet MS"
    ]
  };
};

export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};


