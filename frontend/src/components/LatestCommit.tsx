import React from "react";

export interface Props
{
  date: 
  {
    year:   string, 
    month:  string, 
    day:    string, 
    hour:   string, 
    minute: string, 
    second: string
  },
  message: string,
  stats: 
  {
    total:     number, 
    additions: number, 
    deletions: number
  },
  changes: 
  [{
    name: string,
    stats: 
    {
      total:     number, 
      additions: number, 
      deletions: number
    },
    patch: string
  }]
};

const LatestCommit: React.FC <Props> = (props: Props) => 
{
  return (
    <div className = "LatestCommit">
      <h2> Latest Commit: </h2>
      <p> { props.message } </p>
      <p> Committed on { `${props.date.day}/${props.date.month}/${props.date.year} at ${props.date.hour}:${props.date.minute}` } </p>
      <ul>
        <li className = "Additions"> Additions: <b> { props.stats.additions } </b></li>
        <li className = "Deletions"> Deletions: <b> { props.stats.deletions } </b></li>
      </ul>
    </div>
  )
};

export default LatestCommit;