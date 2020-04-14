import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    // document.getElementsByTagName('input')[0].value = "";
    setName("");
    setInterviewer(null);
  };
  
  function cancel() {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel(props)}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;