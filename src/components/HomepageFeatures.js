import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Mind Palace",
    Svg: require("../../static/img/undraw_docusaurus_mountain.svg").default,
    description: <>A place for keeping notes from different domains.</>,
  },
  {
    title: "University Notes",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: <>The notes collected while studying in university.</>,
  },
  {
    title: "Showcase",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: <>A list of projects that I am/was working on.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
