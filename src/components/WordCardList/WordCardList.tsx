import React from "react";

import WordCard from "./WordCard";

interface WordCardListProps {
  words: string[];
}

function WordCardList({ words = [] }: WordCardListProps) {
  return (
    <section className="word-card-list row margin-top--lg">
      {words.map((word, i) => (
        <article key={i} className="col col--6 margin-bottom--lg">
          <WordCard word={word} />
        </article>
      ))}
    </section>
  );
}

export default WordCardList;
