import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-coy.css";
import clsx from "clsx";

import "./styles.css";

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

const formatOutput = (outputLines: any[]) => {
  let result = "";
  outputLines.forEach((line, idx) => {
    let formatedLine = line;
    // @ts-ignore
    if (line !== window) {
      formatedLine = JSON.stringify(line);
    }
    result += `${idx + 1} ${formatedLine}\n`;
  });
  return result;
};

export default function JSEditor({ children }) {
  const [code, setCode] = useState<string>(children);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const handleRun = () => {
    setError(null);
    setOutput("");
    const modifiedSourceCode =
      `const results=[]; ${code} ;return results;`.replaceAll(
        "console.log",
        "results.push"
      );

    try {
      const outputLines: string[] = new Function(modifiedSourceCode)();

      setOutput(formatOutput(outputLines));
    } catch (err) {
      setError(err);
      setOutput(err);
    }
  };

  const handleReset = () => {
    setCode(children);
  };

  useEffect(() => {
    handleRun();
  }, []);

  return (
    <section className="js-live-editor">
      <div
        className="editorWrapper"
        style={{ maxHeight: "300px", overflow: "auto" }}
      >
        <Editor
          className="editor shadow--md"
          textareaClassName="codeArea"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
          }}
        />
      </div>
      <button
        className="button button--primary margin-top--md margin-right--xs"
        onClick={handleRun}
      >
        Run
      </button>
      <button
        className="button button--secondary margin-top--md"
        onClick={handleReset}
      >
        Reset
      </button>
      <textarea
        value={output}
        readOnly
        className={clsx(
          "outputArea",
          "shadow--md",
          "margin-top--md",
          "padding--sm",
          {
            error: error !== null,
          }
        )}
      />
    </section>
  );
}
