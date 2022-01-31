import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import inspect from "object-inspect";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import clsx from "clsx";

import "./styles.scss";

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
      formatedLine = inspect(line);
    }
    result += `${idx + 1}:  ${formatedLine}\n`;
  });
  return result;
};

type JSEditorProps = {
  /**
   * The source code
   */
  children: string;
  /**
   * The title of the editor
   */
  title: string;
  /**
   * Run on mount?
   */
  run: boolean;
};

export default function JSEditor({
  children = "",
  title = "",
  run = true,
}: JSEditorProps) {
  const [code, setCode] = useState<string>(children);
  const [output, setOutput] = useState("");

  const handleRun = () => {
    setOutput("");
    const modifiedSourceCode = `
    const __results=[];
        
    try{
      (()=>{
        ${code}
      })();
    }catch(err){
      return {results: __results, err};
    }
      
    return {results: __results};`.replaceAll("console.log", "__results.push");
    console.log(`var output =  (()=>{
      ${modifiedSourceCode}
    })() `);

    try {
      const {
        results: outputLines,
        err,
      }: { results: string[]; err: Error | undefined } = new Function(
        modifiedSourceCode
      )();

      if (err) {
        setOutput(formatOutput([...outputLines, err]));
      } else {
        setOutput(formatOutput(outputLines));
      }
    } catch (err) {
      // Compile time error - cannot even execute the code
      setOutput(formatOutput([err]));
    }
  };

  const handleReset = () => {
    setCode(children);
    setOutput("");
  };

  useEffect(() => {
    if (run) handleRun();
  }, [run]);
  return (
    <section className="js-live-editor margin-bottom--md">
      <i>{title}</i>
      <div className="editorWrapper shadow--md thin-scrollbar">
        <Editor
          className="editor"
          textareaClassName="codeArea"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
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
      <div
        className={clsx(
          "outputArea",
          "shadow--md",
          "margin-top--md",
          "padding--sm"
        )}
      >
        {output === "" ? " " : output}
      </div>
    </section>
  );
}
