import type { ReactNode } from 'react';

export const highlightText = (text: string, query: string, matchIndices: number[]) => {
  if (matchIndices.length === 0) {
    return text;
  }

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  matchIndices.forEach((matchIndex) => {
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(<mark key={matchIndex}>{text.slice(matchIndex, matchIndex + query.length)}</mark>);
    lastIndex = matchIndex + query.length;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};
