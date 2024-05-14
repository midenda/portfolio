function replaceReservedCharacters (input: string): string
{
  if (!input) { return input };
  
  return input
    .replaceAll ("&", "&amp;")
    .replaceAll ("<", "&lt;")
    .replaceAll (">", "&gt;")
    .replaceAll ('"', "&quot;")
    .replaceAll ("'", "&apos;");
}

function errorText (input: string): string
{
  return `\n\x1b[31m${input} \x1b[0m\n`;
}

function successText (input: string): string
{
  return `\n\x1b[32m${input} \x1b[0m\n`;
}

export { replaceReservedCharacters, errorText, successText }