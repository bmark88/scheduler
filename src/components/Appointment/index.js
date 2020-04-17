import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
  
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(e => console.error('ERROR ====>', e));
  };

  function remove() {
    transition(DELETING);

    props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => console.error('remove ERROR ====>', e));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={remove}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving Interview" />}
      {mode === DELETING && <Status message="Deleting Interview" />}
    </article>
  )
};

export default Appointment;