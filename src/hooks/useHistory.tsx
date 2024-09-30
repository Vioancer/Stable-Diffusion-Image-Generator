import { useState, useEffect } from "react";

export interface HistoryEntry {
  prompt: string;
  output: string[] | null;
}

export const useHistory = (output: string[] | null, prompt: string) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (output?.length) {
      const newEntry: HistoryEntry = { prompt, output };
      setHistory((prevHistory) => [newEntry, ...prevHistory]);
    } else {
      setHistory([]);
    }
  }, [output, prompt]);

  return history;
};
