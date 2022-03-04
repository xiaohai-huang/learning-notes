import React from "react";
import Link from "@docusaurus/Link";

// @ts-ignore
import { Case } from "@src/pages/showcase/_components/ShowcaseCard";

export const data: Case[] = [
  {
    title: "Statology",
    website: "https://www.statology.org",
    preview:
      "https://www.statology.org/wp-content/uploads/2019/08/cropped-StatologyLogo_OnWhite-2-1024x294.png",
    description: (
      <>
        Statology is a site that makes learning statistics easy through
        explaining topics in simple and straightforward ways.
        <br />
        <br />-{" "}
        <Link to="https://www.statology.org/tutorials/">
          Basic stats tutorials
        </Link>
        <br />-{" "}
        <Link to="https://www.statology.org/machine-learning-tutorials/">
          Machine Learning tutorials
        </Link>
        <br />- matplotlib
      </>
    ),
    source: "",
    tags: ["Machine Learning", "Statistics"],
  },
];
