import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem(props) {
  const imgClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar
  });

  const selectedClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected 
  })

  return <li className={selectedClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    key={props.id}
    className={imgClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>

};

export default InterviewerListItem;