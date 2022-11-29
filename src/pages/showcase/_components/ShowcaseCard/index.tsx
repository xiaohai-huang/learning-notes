import React from "react";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";
import clsx from "clsx";

export type Case = {
  title: string;
  preview: string;
  description: string | React.ReactNode;
  website: string;
  source?: string;
  tags: string[];
};

function ShowCaseCard(props: Case) {
  return (
    <article className="card shadow--md" style={{ height: "100%" }}>
      <div
        className={clsx("card__image", styles.cardImageWrapper)}
        onClick={() => window.open(props.website)}
      >
        <img
          src={props.preview}
          alt={props.title}
          title={props.title}
          className={styles.cardImage}
        />
      </div>
      <div className="card__body">
        <Link to={props.website}>
          <h4>{props.title}</h4>
        </Link>
        <p className={styles.description}>{props.description}</p>
      </div>
      <div className="card__footer">
        <section className="margin-bottom--md">
          {props.tags.map((item) => (
            <span key={item} className="badge badge--info margin-right--xs">
              {item}
            </span>
          ))}
        </section>
        <div className="button-group button-group--block">
          <button
            className="button button--primary button--block"
            onClick={() => window.open(props.website)}
          >
            Visit
          </button>
          {props.source && (
            <button
              className="button button--secondary button--block"
              onClick={() => window.open(props.source)}
            >
              Source
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ShowCaseCard;
