import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
//
function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Xiaohai's Mind Palace</h1>
        <p className="hero__subtitle">A website for organizing notes</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs">
            View Notes
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/university"
          >
            View University
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout title="Home" description="xiaohai-huang's Mind Palace">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
