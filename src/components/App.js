import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [JS, setJS] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [title, setTitle] = useLocalStorage('title', 'Edit this title');
  const [isEditing, setIsEditing] = useState(false);

  const downloadFile = () => {
    const extension = 'html';
    const text = srcDoc;
    const filename = title;
    const data = `data:text/${extension};charset=utf-8,${encodeURIComponent(
      text
    )}`;
    const link = document.createElement('a');
    link.href = data;
    link.download = `${filename}.${extension}`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
      <body>
      ${html}
      </body>
      <style>${css}</style>
      <script>${JS}</script>
      </html>`);
    }, 250);
  }, [html, css, JS]);
  const handleBlur = () => {
    setIsEditing(false);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div>
        <header className="navbar">
          <div
            className="title"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              title
            )}
          </div>
          <div className="btn-download" onClick={downloadFile}>
            ↓
          </div>
        </header>
      </div>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={JS}
          onChange={setJS}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          frameBorder="0"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default App;
