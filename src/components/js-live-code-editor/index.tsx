// Inspired by https://github.com/FormidableLabs/prism-react-renderer/blob/v1.3.5/src/components/Highlight.js
import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Editor from "react-simple-code-editor";
import inspect from "object-inspect";
import { Prism } from "prism-react-renderer";
import darkCodeTheme from "prism-react-renderer/themes/vsDark";

import clsx from "clsx";
import normalizeTokens from "./normalizeTokens";
import themeToDict from "./themeToDict";

import "./styles.scss";
const themeDict = themeToDict(darkCodeTheme, "javascript");

if (ExecutionEnvironment.canUseDOM) {
  (typeof global !== "undefined" ? global : window).Prism = Prism;
}

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

const getLineProps = ({ key, className, style, line, ...rest }: any) => {
  const output = {
    ...rest,
    className: "token-line",
    style: undefined,
    key: undefined,
  };

  if (themeDict !== undefined) {
    output.style = themeDict.plain;
  }

  if (style !== undefined) {
    output.style =
      output.style !== undefined ? { ...output.style, ...style } : style;
  }

  if (key !== undefined) output.key = key;
  if (className) output.className += ` ${className}`;

  return output;
};

export type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

const getStyleForToken = ({ types, empty }: Token) => {
  const typesSize = types.length;
  if (themeDict === undefined) {
    return undefined;
  } else if (typesSize === 1 && types[0] === "plain") {
    return empty ? { display: "inline-block" } : undefined;
  } else if (typesSize === 1 && !empty) {
    return themeDict[types[0]];
  }

  const baseStyle = empty ? { display: "inline-block" } : {};
  const typeStyles = types.map((type) => themeDict[type]);
  return Object.assign(baseStyle, ...typeStyles);
};

const getTokenProps = ({ key, className, style, token, ...rest }: any) => {
  const output = {
    ...rest,
    className: `token ${token.types.join(" ")}`,
    children: token.content,
    style: getStyleForToken(token),
    key: undefined,
  };

  if (style !== undefined) {
    output.style =
      output.style !== undefined ? { ...output.style, ...style } : style;
  }

  if (key !== undefined) output.key = key;
  if (className) output.className += ` ${className}`;

  return output;
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
      <div className="shadow--md thin-scrollbar">
        <Editor
          className="editor"
          textareaClassName="codeArea"
          style={darkCodeTheme.plain}
          padding={10}
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => {
            const tokens = normalizeTokens(
              Prism.tokenize(code, Prism.languages.javascript, "javascript")
            );
            return tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="editorLineNumber">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ));
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
        <BrowserOnly fallback={<> </>}>
          {() => <>{output === "" ? " " : output}</>}
        </BrowserOnly>
      </div>
    </section>
  );
}
