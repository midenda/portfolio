function replaceReservedCharacters (input: string): string
{
  return input
    .replace ("<", "&lt;")
    .replace (">", "&gt;")
    .replace ("&", "&amp;")
    .replace ('"', "&quot;")
    .replace ("'", "&apos;");
}

function errorText (input: string): string
{
  return `\n\x1b[31m\ ${input} \x1b[0m\n`;
}

function successText (input: string): string
{
  return `\n\x1b[32m\ ${input} \x1b[0m\n`;
}

export { replaceReservedCharacters, errorText, successText }