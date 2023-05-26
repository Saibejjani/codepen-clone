import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [JS, setJS] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
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
  return (
    <>
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
