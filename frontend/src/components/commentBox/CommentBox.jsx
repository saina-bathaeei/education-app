import React from 'react'
import './CommentBox.css'
import { Rating, Typography } from "@mui/material";

export default function CommentBox(props) {
  return (
    <div className='comment-box'>
        <div className="comment-up">
            <div className="comment-user">
                <div className="user-image-name-role">
                    <div className="img-comment-user">
                        <img src="/images/icons/mdi--user.svg" alt="" />
                    </div>
                    <div className="comment-info-user">
                        <div className="comment-name">{props.creator.name}</div>
                        <h1>|</h1>
                        <div className="comment-role">{props.creator.role}</div>
                    </div>
                </div>

                <div className="user-score-time-res">
                    <div className="comment-score">
                        <Rating name="half" defaultValue={props.score} precision={0.5} size="large" readOnly/>
                    </div>
                    <div className="comment-time">
                        <p>{props.creator.createdAt.split('T')[0]}</p>
                    </div>
                    <div className="comment-response">
                        <img src="/images/icons/lets-icons--back-light.svg" alt="" />
                    </div>
                </div>
                
            </div>
        </div>
        <div className="line-comment"></div>
        <div className="comment-down">
            <p>{props.body}</p>
        </div>
    </div>
  )
}
