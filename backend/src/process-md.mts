interface Output 
{
  title: Line,
  description: Line,
  sections: 
  {
    heading: Line, 
    content: Line[]
  }[]
};

interface Link 
{
  text:  string,
  url:   string,
  title: string
};

type Line = (string | Link)[];

export function replaceLinks (markdown: string): Line
{
  const regex: RegExp = /\[(?<text>.*?)\]\((?<url>https?:\/\/\S+?\/?)\s?\"?(?<=\s\")(?<title>.*?)(?=\")\"?\)/gd;
  
  
  let matches: any = [...markdown.matchAll (regex)];
  
  matches = matches.map ((match: any) => 
    {
      return {
        text:  match.groups.text, 
        url:   match.groups.url, 
        title: match.groups.title, 
        indices: 
        { 
          first: match.indices [0][0],
          last:  match.indices [0][1]
        }
      };
    }
  );

  let result: Line = [];

  if (matches.length > 0)
  {
    result.push (markdown.slice (0, matches [0].indices.first));
    result.push ({
      text:  matches [0].text,
      url:   matches [0].url,
      title: matches [0].title
    });
  
    for (let i: number = 0; i < matches.length - 1; i++)
    {
      result.push (markdown.slice (matches [i].indices.last, matches [i + 1].indices.first));
      result.push (
        {
          text:  matches [i + 1].text,
          url:   matches [i + 1].url,
          title: matches [i + 1].title
        }
      );
    };
  
    result.push (markdown.slice (matches [matches.length - 1].indices.last, markdown.length));
  }
  else
  {
    result.push (markdown);
  };

  return result;
}

export function format (markdown: string): Output
{
  const lines: string[] = markdown.split ("\n");

  let sections: Line[][] = [];
  let headings: Line[]   = [];
  let section:  Line[]   = [];

  for (const line of lines)
  {
    const lineSegments: Line = replaceLinks (line.replaceAll ("# ", "").replaceAll ("#", "")); 

    if (line [0] == "#")
    {
      headings.push (lineSegments);

      if (section.length > 0)
      {
        sections.push (section);
        section = [];
      };
    }
    else 
    {
      section.push (lineSegments);
    };

  };
  sections.push (section);

  let description: Line = [""];

  for (const section of sections)
  {
    if (section [0][0] != "") 
    {
      description = section [0];
      break;
    };
  };

  const result: Output = 
  {
    title: headings [0], 
    description: description, // TODO: portfolio has no description
    sections: headings.map ((heading, i) => 
    ({          
      heading: heading, 
      content: sections [i]
    })).slice (1)
  };

  return result;
}

export default { format, replaceLinks };