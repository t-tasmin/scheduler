import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {

 const DayListItemArray = props.days.map((element)=>{
                         return (<DayListItem 
                          key={element.id}
                          name={element.name} 
                          spots={element.spots} 
                          selected={element.name === props.value}
                          setDay={(event)=>props.onChange(element.name)}  
                         />)
  });
 
  return (
    <ul>
      {DayListItemArray}
   </ul>
  );
}