import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  const EMPTY   = "EMPTY";
  const SHOW    =  "SHOW";
  const CREATE  =  "CREATE";
  const SAVING ="SAVING";
  const DELETING ="DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDITING = "EDITING";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() =>transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }  

  function remove () {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() =>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  
  function confirm() {
    transition(CONFIRMING);
  }

  function edit() {
    transition(EDITING);
  }
   
   return (
    <article className="appointment">
      <header> {props.time} </header>
      {mode === EMPTY && <Empty onAdd={()=>  transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={() => confirm()}
          onEdit={() => {edit(); }}
        />
      )}

      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          
       />}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && (
        <Confirm
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you want to delete?"
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={back}
        />
      )}
      
     </article>
   );

   
 }