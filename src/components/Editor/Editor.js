import React, { useState } from 'react';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
// import moment from "moment";
// import 'moment/locale/fr';
// import 'moment/locale/en-gb';
// import 'moment/locale/nl';
import {getSunEditorToolbarConfig} from "../../utils";
import styles from "./Editor.module.scss";
import {ExpandIcon} from "../icons";
import cx from "classnames";

const Editor = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {lng, onChange, onFocus, content, onClick} = props;
  // moment.locale(lng);

  return <div className={cx(styles.editor, {
    [styles.isEditorExpanded]: isExpanded
  })}>
    <div className={styles.expandIcon} onClick={() => setIsExpanded(prev => !prev)}>
      <ExpandIcon/>
    </div>
    <SunEditor
      autoFocus={true}
      lang={lng}
      setOptions={getSunEditorToolbarConfig()}
      onFocus={onFocus}
      onChange={onChange}
      defaultValue={content}
      setContents={content}
      onClick={onClick}
    />
    </div>
};

export default Editor;
