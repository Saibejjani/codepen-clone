import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';

const Editor = (props) => {
  const [open, setOpen] = useState(true);
  const { displayName, value, language, onChange, download } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}

        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="btn-collapse"
        >
          {open ? 'X' : 'O'}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: 'material',
        }}
      />
    </div>
  );
};

export default Editor;
