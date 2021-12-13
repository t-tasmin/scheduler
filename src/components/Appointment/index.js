import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {

  const EMPTY   = "EMPTY";
  const SHOW    =  "SHOW";
  const CREATE  =  "CREATE";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
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
       {/* {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer}/> :<Empty/>}  */}
     </article>
   );

   
 }