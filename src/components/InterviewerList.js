import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  
  const  InteviewerListItemArray = props.interviewers.map((element)=>{
            return (<InterviewerListItem
                      key={element.id}
                      name={element.name} 
                      avatar={element.avatar} 
                      selected={element.id === props.value}
                      setInterviewer={()=> props.onChange(element.id)} 
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
