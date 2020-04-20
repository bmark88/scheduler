import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFRIM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
   
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  function confirmDelete() {
    transition(CONFIRM, true);
  };

  function removeInterview() {
    transition(DELETING, true);

    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => transition(ERROR_DELETE, true));
  };

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving Interview" />}
      {mode === DELETING && <Status message="Deleting Interview" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={removeInterview} onCancel={back} />}
      {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="There was an error saving your interview." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="There was an error deleting your interview." onClose={back} />}
    </article>
  )
};

export default Appointment;