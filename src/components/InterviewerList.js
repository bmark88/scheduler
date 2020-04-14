import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

function InterviewerList(props) {
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {props.interviewers.map(interviewer => <InterviewerListItem 
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer} />)}
    </ul>
    </section>
  )
};

export default InterviewerList;