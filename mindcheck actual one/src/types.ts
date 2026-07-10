export interface DemographicState {
  name: string;
  age: string;
  gender: string;
  maritalStatus: string;
  education: string;
  occupation: string;
  prevDiagnosis: string; // 'Yes' | 'No' | 'Not sure' | ''
  prevConditions: string[];
  otherPrevConditions?: string; // <--- Tracks custom previous conditions
  inTherapy: string; // 'Yes' | 'No' | ''
  onPsychMed: string; // 'Yes' | 'No' | 'Prefer not to say' | ''
  chronicIllness: string[];
  otherChronicIllness?: string; // <--- Tracks custom chronic illnesses
  rxMeds: string;
  famHistory: boolean;
  famConditions: string[];
  otherFamConditions?: string; // <--- Tracks custom family history conditions
  alcoholUse: boolean;
  recreationalUse: boolean;
  traumaticEvents: string; // 'Yes' | 'No' | 'Prefer not to say' | ''
  selfHarmThoughts: string; // 'Yes' | 'No' | 'Prefer not to say' | ''
  sleepHours: string;
  activityLevel: string;
  additionalNotes: string;
}

export interface Question {
  id: string;
  domain: 'stress' | 'anxiety' | 'depression' | 'bipolar' | 'schizophrenia';
  text: string;
}

export interface ScoringResult {
  scores: {
    stress: number;
    anxiety: number;
    depression: number;
    bipolar: number;
    schizophrenia: number;
  };
  primary: {
    name: string;
    label: string;
    css: string;
    icon: string;
    score: number;
    flagged?: boolean;
    positive?: boolean;
  };
  coping: string[];
  isCrisis: boolean;
  breakdown: Array<{
    name: string;
    icon: string;
    score: number;
    label: string;
    css: string;
  }>;
}

export interface ConditionInfo {
  name: string;
  icon: string;
  color: string;
  definition: string;
  dsmNote: string;
  symptoms: string[];
  severity: Array<{ range: string; label: string }>;
  tool: string;
  reference?: string | string[];
}