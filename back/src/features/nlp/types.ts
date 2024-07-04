import { AnyRecord } from '../../types/general';

export type NlpTag = 'products.add' | 'links.add' | 'sections.add';

export interface NplProcessResponse {
  locale: 'es';
  utterance: string;
  settings?: unknown;
  languageGuessed: boolean;
  localeIso2: 'es';
  language: string;
  nluAnswer: {
    classifications: Array<AnyRecord>;
    entities?: unknown;
    explanation?: unknown;
  };
  classifications: Array<{ intent: NlpTag; score: number }>;
  intent: NlpTag;
  score: number;
  domain: 'default';
  entities: [];
  sourceEntities: [];
  answers: [];
  answer: undefined;
  actions: [];
  sentiment: {
    score: number;
    numWords: number;
    numHits: number;
    average: number;
    type: 'senticon';
    locale: 'es';
    vote: 'positive';
  };
}
