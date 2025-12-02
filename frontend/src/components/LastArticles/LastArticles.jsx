import React from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  return (
    <section className="articles">
      <div className="container">
        <div className="article-title">
          <h1>
            مقالات
          </h1>
        </div>

        <div className="articles__content">
          <div className="row">
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              cover="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662986/article-1_fytxfn.jpg"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              cover="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662986/article-2_wgtvio"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              cover="https://res.cloudinary.com/dpzsifsol/image/upload/v1764662986/article-3_vpgqwz"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
