export type CodeBlock = {
  lang: string;
  title?: string;
  code: string;
};

export type Section = {
  title: string;
  content?: string;
  codeBlocks?: CodeBlock[];
  image?: string;
};

export type Question = {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Assessment = {
  questions: Question[];
};

export type Module = {
  id: number;
  workshop: 1 | 2;
  title: string;
  time: string;
  objectives: string[];
  sections: Section[];
  assessment?: Assessment;
  /** Set true on placeholder modules whose source content was corrupted and needs restoration. */
  _needsRestoration?: boolean;
};

export type ManifestEntry = {
  id: number;
  workshop: 1 | 2;
  title: string;
  time: string;
  questionCount: number;
  needsRestoration?: boolean;
};
