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
              cover="image/article-1.jpg"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              cover="image/article-2.jpg"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
            <ArticleBox
              title="نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون"
              cover="image/article-3.jpg"
              desc="زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
