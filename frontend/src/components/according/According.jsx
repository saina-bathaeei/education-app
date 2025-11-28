import React,{ useState } from 'react'

export default function According(props) {

    let [isValid,setIsValid] = useState(false)


    const isToggle = (state,setState) => {
        props.onToggle(state,setState)
    }

  return (
    <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                onClick={() => isToggle(isValid,setIsValid)}
              >
                جلسات دوره ها
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              
            {
                isValid && <div className="accordion-body introduction__accordion-body">
                <div className="introduction__accordion-right">
                    <span className="introduction__accordion-count">
                         1
                   </span>
                   <i className="fab fa-youtube introduction__accordion-icon"></i>
                  <a href="#" className="introduction__accordion-link">
                    {props.title}
                  </a>
                </div>
                <div className="introduction__accordion-left">
                  <span className="introduction__accordion-time">
                    {props.time}
                  </span>
                </div>
              </div>
            }
            </div>
          </div>
        </div>
  )
}
