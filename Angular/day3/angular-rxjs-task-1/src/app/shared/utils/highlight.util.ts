export function highlightTerm(text: string, term: string): string {
  if (!term) {
    return text;
  }

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');

  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}
