import React from "react";
import Link from "@docusaurus/Link";

import { Case } from "./_components/ShowcaseCard";

export const cases: Case[] = [
  {
    title: "腾讯明眸体验馆",
    website: "https://xbright.cloud.tencent.com",
    preview: require("./_previews/xbright.png").default,
    description: (
      <>
        体验腾讯明眸视频转码后的效果
        <br />- 支持两段视频的<b>实时对比</b>
        <br />
        - 支持视频详细参数自定义配置
        <br />- 开发了<b>"我的视频"</b>, 支持 <b>上传/管理</b> 视频
        <br />- 支持英文界面 (<Link to="https://react.i18next.com">i18n</Link>)
      </>
    ),
    source: "",
    tags: ["Tencent", "react"],
  },
  {
    title: "音视频通信解决方案样板间",
    website: "https://cloud.tencent.com/act/event/video_BestPractices",
    preview: require("./_previews/audio-video-case-room.png").default,
    description: (
      <>
        使用腾讯云开发Cloudbase实现了前端和后端
        <br />
        <b>活动页面</b>: 页面展示 + 上报用户行为 <br />
        <b>管理页面</b>: 登录鉴权 + 文案配置 + 图片/PDF上传 +
        图表展示分析用户行为 (微前端架构)
      </>
    ),
    source: "",
    tags: ["Tencent", "react"],
  },
  {
    title: "视立方·音视频终端引擎 - 购买页",
    website: "https://cloud.tencent.com/act/event/video_BestPractices",
    preview: require("./_previews/vcube-buy.png").default,
    description: (
      <>
        腾讯云视立方资源包购买页, 支持多种<b>不同类别</b>的商品同时购买,
        本地持久化购物车商品
      </>
    ),
    source: "",
    tags: ["Tencent", "react"],
  },
  {
    title: "腾讯云·控制台 - 云直播/视频处理",
    website: "https://console.cloud.tencent.com/live/analysis/bill",
    preview: require("./_previews/live-console.png").default,
    description: (
      <>
        - 重构云直播计费用量页面
        <br />- 实现了 '拉流转推' 统计数据展示页面
        <br />- 实现了 视频处理控制台的一些小需求
        <br />- 学习了 微前端架构
      </>
    ),
    source: "",
    tags: ["Tencent", "react"],
  },
  {
    title: "今日小条",
    website: "https://toutiao.vercel.app",
    preview: require("./_previews/xiaotiao.png").default,
    description:
      '模仿 "今日头条" web 的PC端和移动端的网站. 响应式设计/Puppeteer 爬取的头条新闻数据',
    source: "https://github.com/xiaohai-huang/toutiao-clone",
    tags: ["personal", "react", "material-ui"],
  },
  {
    title: "金铲铲之战-资料库",
    website: "https://jcc.vercel.app",
    preview: require("./_previews/jcc.png").default,
    description:
      "掌上英雄联盟 - 金铲铲之战-资料库. 实现时空裂痕-装备分页和装备筛选",
    source: "https://github.com/xiaohai-huang/TT-mobile-wiki",
    tags: ["interview", "react", "mobile"],
  },
];
