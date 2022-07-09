import React from "react";
import Link from "@docusaurus/Link";

import { Case } from "@src/pages/showcase/_components/ShowcaseCard";
import GitPreview from "./learnGitBranching.png";

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
  {
    title: "Learn Git Branching",
    website: "https://learngitbranching.js.org",
    preview: GitPreview,
    description: (
      <>
        "Learn Git Branching" is the most visual and interactive way to learn
        Git on the web;
        <br />
        <br />- You'll be challenged with exciting levels <br />- Step-by-step
        demonstrations of powerful features
      </>
    ),
    tags: ["Git"],
  },
];
