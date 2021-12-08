import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  
  const  InteviewerListItemArray = props.interviewers.map((element)=>{
            return (<InterviewerListItem
                      key={element.id}
                      id={element.id} 
                      name={element.name} 
                      avatar={element.avatar} 
                      selected={element.id === props.interviewer}
                      setInterviewer={props.setInterviewer} 
                    />)
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InteviewerListItemArray}
      </ul>
    </section>
  );
}