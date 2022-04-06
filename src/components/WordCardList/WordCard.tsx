import React, { useEffect, useState } from "react";

interface Meaning {
  partOfSpeech: string;
  definitions: Array<{ definition: string; synonyms: string[] }>;
}

interface WordResponse {
  word: string;
  phonetics: Array<{ audio: string; text?: string }>;
  meanings: Array<Meaning>;
}

const DICT_API_ENPOINT = "https://api.dictionaryapi.dev/api/v2/entries/en/";
function queryWord(word: string = "default"): Promise<WordResponse> {
  const URL = `${DICT_API_ENPOINT}${word}`;
  return fetch(URL)
    .then((res) => res.json())
    .then((res) => res[0]);
}

function playAudio(audioUrl = "") {
  const audio = new Audio(audioUrl);
  audio.play();
}

function WordCard({ word = "" }) {
  const [data, setData] = useState<WordResponse>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (word) {
      setLoading(true);
      queryWord(word)
        .then((res) => setData(res))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [word]);

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }
  console.log(data);

  return data ? (
    <div className="card shadow--md">
      <div className="card__header">
        <h3>{data.word}</h3>
      </div>
      <div className="card__body">
        {data.meanings.map((meaning, i) => (
          <div key={i}>
            <i>{meaning.partOfSpeech}</i>

            <ol>
              {meaning.definitions.map(({ definition }, i) => (
                <li key={i}>{definition}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      {data.phonetics.length === 0 ? null : (
        <div className="card__footer">
          <div className="button-group button-group--block">
            {data.phonetics.map((phonetic, i) => (
              <button
                key={i}
                className="button button--secondary button--block"
                onClick={() => playAudio(phonetic.audio ?? "")}
                disabled={!Boolean(phonetic.audio)}
              >
                {phonetic.text || "No Phonetic Found"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <p>
      Cannot find definitions for "<b>{word}</b>".
    </p>
  );
}

export default WordCard;
