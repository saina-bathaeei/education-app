import React from "react";
import { Link } from "react-router-dom";

export default function IndexBox({ title, href }) {
  return (
    <div class="col-4" style={{width: '340px'}}>
      <Link to={href} class="main__link" href="#">
        {title}
      </Link>
    </div>
  );
}
