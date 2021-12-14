import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY   = "EMPTY";
  const SHOW    =  "SHOW";
  const CREATE  =  "CREATE";
  const SAVING ="SAVING";
  const DELETING ="DELETING";
  const CONFIRMING = "CONFIRMING";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() =>transition(SHOW))
    
  }

  function remove () {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() =>transition(EMPTY));
  }
  
  function confirm() {
    transition(CONFIRMING);
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
       {/* {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer}/> :<Empty/>}  */}
     </article>
   );

   
 }