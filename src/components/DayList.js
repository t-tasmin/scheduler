import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";


export default function DayList(props) {

 const DayListItemArray = props.days.map((element)=>{
                         return (<DayListItem 
                          key={element.id}
                          name={element.name} 
                          spots={element.spots} 
                          selected={element.name === props.day}
                          setDay={props.setDay}  
                         />)
  });

  return (
    <ul>
      {DayListItemArray}
   </ul>
  );
}