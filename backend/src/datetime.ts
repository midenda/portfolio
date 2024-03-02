function formatTime (raw: string)
{
  const [ date, time ]:           string [] = raw .split ("T");

  const [ year, month, day ]:     string [] = date.split ("-");
  let   [ hour, minute, second ]: string [] = time.split (":");

  second = second.slice (0, -1);

  const out = 
  {
    year, month, day, hour, minute, second
  };

  return out;
}

export default formatTime;