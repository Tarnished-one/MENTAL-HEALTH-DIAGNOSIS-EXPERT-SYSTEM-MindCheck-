import { Question, ScoringResult, ConditionInfo } from './types';

export const KB_QUESTIONS: Question[] = [
  // STRESS (7 items — DASS-21 Stress subscale)
  { id: 's1', domain: 'stress',  text: 'I found it hard to wind down.' },
  { id: 's2', domain: 'stress',  text: 'I tended to over-react to situations.' },
  { id: 's3', domain: 'stress',  text: 'I felt that I was using a lot of nervous energy.' },
  { id: 's4', domain: 'stress',  text: 'I found myself getting agitated.' },
  { id: 's5', domain: 'stress',  text: 'I found it difficult to relax.' },
  { id: 's6', domain: 'stress',  text: 'I was intolerant of anything that kept me from getting on with what I was doing.' },
  { id: 's7', domain: 'stress',  text: 'I felt that I was rather touchy.' },

  // ANXIETY (7 items — DASS-21 Anxiety subscale)
  { id: 'a1', domain: 'anxiety', text: 'I was aware of dryness of my mouth.' },
  { id: 'a2', domain: 'anxiety', text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).' },
  { id: 'a3', domain: 'anxiety', text: 'I experienced trembling (e.g., in the hands).' },
  { id: 'a4', domain: 'anxiety', text: 'I was worried about situations in which I might panic and make a fool of myself.' },
  { id: 'a5', domain: 'anxiety', text: 'I felt I was close to panic.' },
  { id: 'a6', domain: 'anxiety', text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).' },
  { id: 'a7', domain: 'anxiety', text: 'I felt scared without any good reason.' },

  // DEPRESSION (7 items — DASS-21 Depression subscale)
  { id: 'd1', domain: 'depression', text: 'I could not seem to experience any positive feeling at all.' },
  { id: 'd2', domain: 'depression', text: 'I found it difficult to work up the initiative to do things.' },
  { id: 'd3', domain: 'depression', text: 'I felt that I had nothing to look forward to.' },
  { id: 'd4', domain: 'depression', text: 'I felt down-hearted and blue.' },
  { id: 'd5', domain: 'depression', text: 'I was unable to become enthusiastic about anything.' },
  { id: 'd6', domain: 'depression', text: "I felt I wasn't worth much as a person." },
  { id: 'd7', domain: 'depression', text: 'I felt that life was meaningless.' },

  // BIPOLAR DISORDER (7 items — MDQ-adapted)
  { id: 'b1', domain: 'bipolar', text: 'There have been times when you felt so good, high, or hyper that other people thought you were not your normal self or you got into trouble.' },
  { id: 'b2', domain: 'bipolar', text: 'There have been times when you were so irritable that you shouted at people or started fights or arguments.' },
  { id: 'b3', domain: 'bipolar', text: 'There have been times when you felt much more self-confident than usual.' },
  { id: 'b4', domain: 'bipolar', text: 'There have been times when you needed much less sleep than usual and still felt energetic.' },
  { id: 'b5', domain: 'bipolar', text: 'There have been times when you were much more talkative or spoke much faster than usual.' },
  { id: 'b6', domain: 'bipolar', text: 'There have been times when your thoughts raced through your head so fast you could not keep up with them.' },
  { id: 'b7', domain: 'bipolar', text: 'There have been times when you did risky things (e.g., spent a lot of money, made impulsive decisions, or engaged in risky behaviour).' },

  // SCHIZOPHRENIA (5 items — PRIME Screen-adapted)
  { id: 'p1', domain: 'schizophrenia', text: 'Over the past month, have you heard voices or sounds that other people could not hear?' },
  { id: 'p2', domain: 'schizophrenia', text: 'Over the past month, have you believed that people are plotting against you or trying to harm you without any clear reason?' },
  { id: 'p3', domain: 'schizophrenia', text: 'Over the past month, have you had unusual experiences such as believing you were receiving special messages through TV, radio, or the internet meant specifically for you?' },
  { id: 'p4', domain: 'schizophrenia', text: 'Over the past month, have others told you that your speech or thinking seems confused or hard to follow?' },
  { id: 'p5', domain: 'schizophrenia', text: 'Over the past month, have you found it very hard to feel emotions or show feelings to others?' },
];

export const KB_OPTS_DASS = [
  { label: 'Did not apply to me at all', val: 0 },
  { label: 'Applied to me to some degree, or some of the time', val: 1 },
  { label: 'Applied to me to a considerable degree or a good part of the time', val: 2 },
  { label: 'Applied to me very much or most of the time', val: 3 },
];

export const KB_OPTS_FREQ = [
  { label: 'Rarely / Never', val: 0 },
  { label: 'Sometimes', val: 1 },
  { label: 'Often', val: 2 },
  { label: 'Nearly daily', val: 3 },
];

// Threshold check functions
export function KB_classifyStress(score: number) {
  if (score <= 14) return { label: 'Normal', css: 'sev-normal' };
  if (score <= 18) return { label: 'Mild', css: 'sev-mild' };
  if (score <= 25) return { label: 'Moderate', css: 'sev-moderate' };
  if (score <= 33) return { label: 'Severe', css: 'sev-severe' };
  return { label: 'Extremely Severe', css: 'sev-extreme' };
}

export function KB_classifyAnxiety(score: number) {
  if (score <= 7) return { label: 'Normal', css: 'sev-normal' };
  if (score <= 9) return { label: 'Mild', css: 'sev-mild' };
  if (score <= 14) return { label: 'Moderate', css: 'sev-moderate' };
  if (score <= 19) return { label: 'Severe', css: 'sev-severe' };
  return { label: 'Extremely Severe', css: 'sev-extreme' };
}

export function KB_classifyDepression(score: number) {
  if (score <= 9) return { label: 'Normal', css: 'sev-normal' };
  if (score <= 13) return { label: 'Mild', css: 'sev-mild' };
  if (score <= 20) return { label: 'Moderate', css: 'sev-moderate' };
  if (score <= 27) return { label: 'Severe', css: 'sev-severe' };
  return { label: 'Extremely Severe', css: 'sev-extreme' };
}

export function KB_classifyBipolar(score: number) {
  if (score < 10) return { label: 'Negative Screen', css: 'sev-normal', positive: false };
  return { label: 'Positive Screen', css: 'sev-severe', positive: true };
}

export function KB_classifySchizophrenia(score: number, answers: Record<string, number>) {
  const items = KB_QUESTIONS.filter((q) => q.domain === 'schizophrenia');
  const anyHigh = items.some((q) => (answers[q.id] || 0) >= 2);
  const flagged = anyHigh || score >= 4;
  return flagged
    ? { label: 'Flagged — Seek Assessment', css: 'sev-extreme', flagged: true }
    : { label: 'Not flagged', css: 'sev-normal', flagged: false };
}

export function KB_getPrimaryCondition(scores: Record<string, number>, answers: Record<string, number>) {
  const sz = KB_classifySchizophrenia(scores.schizophrenia, answers);
  const bp = KB_classifyBipolar(scores.bipolar);
  const dep = KB_classifyDepression(scores.depression);
  const anx = KB_classifyAnxiety(scores.anxiety);
  const str = KB_classifyStress(scores.stress);

  if (sz.flagged) {
    return { name: 'Schizophrenia', label: sz.label, css: sz.css, icon: '🧩', score: scores.schizophrenia, flagged: true };
  }
  if (bp.positive) {
    return { name: 'Bipolar Disorder', label: bp.label, css: bp.css, icon: '🔄', score: scores.bipolar, positive: true };
  }

  // Choose the highest severity amongst DASS subscales
  const dassCandidates = [
    { name: 'Depression', label: dep.label, css: dep.css, icon: '🌧️', score: scores.depression },
    { name: 'Anxiety', label: anx.label, css: anx.css, icon: '⚡', score: scores.anxiety },
    { name: 'Stress', label: str.label, css: str.css, icon: '🔥', score: scores.stress },
  ];

  const sevRank: Record<string, number> = {
    'Normal': 0,
    'Mild': 1,
    'Moderate': 2,
    'Severe': 3,
    'Extremely Severe': 4,
  };

  dassCandidates.sort((a, b) => {
    const rankDiff = (sevRank[b.label] || 0) - (sevRank[a.label] || 0);
    if (rankDiff !== 0) return rankDiff;
    // Severity label tied (e.g. both "Severe") — break the tie using the
    // raw score instead of falling back to array order. Stress, Anxiety,
    // and Depression all share the same 7-item, 0-3 DASS-21 scale, so their
    // raw scores are directly comparable.
    return b.score - a.score;
  });
  return dassCandidates[0];
}

export const KB_CONDITIONS: Record<string, ConditionInfo> = {
  stress: {
    name: 'Stress',
    icon: '🫂',
    color: '#E67E22',
    definition: 'Stress is the body\'s physiological and psychological response to perceived demands (stressors) exceeding available coping resources. While acute stress is adaptive, chronic stress impairs mental and physical health.',
    dsmNote: 'Stress is not classified as a standalone disorder in DSM-5 but is a key feature of Adjustment Disorder and contributes to numerous other conditions.',
    symptoms: [
      'Difficulty relaxing or winding down',
      'Tendency to overreact to situations',
      'Irritability and being easily agitated',
      'Difficulty tolerating interruptions to tasks',
      'Feeling close to panic or overwhelmed',
      'Physical tension (headaches, tight muscles)',
      'Difficulty sleeping due to mental activity',
    ],
    severity: [
      { range: '0–14',  label: 'Normal' },
      { range: '15–18', label: 'Mild' },
      { range: '19–25', label: 'Moderate' },
      { range: '26–33', label: 'Severe' },
      { range: '34+',   label: 'Extremely Severe' },
    ],
    tool: 'DASS-21 Stress Subscale (Lovibond & Lovibond, 1995)',
    reference: 'https://arc.psych.wisc.edu/self-report/depression-anxiety-stress-scale-21-dass21/',
  },

  anxiety: {
    name: 'Anxiety',
    icon: '🌱',
    color: '#7A5200',
    definition: 'Anxiety disorders involve excessive fear, worry, and related behavioural disturbances. Generalised Anxiety Disorder (GAD) is characterised by persistent and difficult-to-control worry about multiple domains of daily life.',
    dsmNote: 'DSM-5 requires excessive anxiety and worry more days than not for ≥6 months, with ≥3 associated symptoms (restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance).',
    symptoms: [
      'Autonomic arousal (dry mouth, palpitations, trembling)',
      'Breathlessness without physical cause',
      'Anticipatory fear of panic or embarrassment',
      'Feeling scared without clear reason',
      'Persistent, uncontrollable worry',
      'Avoidance of anxiety-provoking situations',
      'Physical symptoms: nausea, sweating, dizziness',
    ],
    severity: [
      { range: '0–7',   label: 'Normal' },
      { range: '8–9',   label: 'Mild' },
      { range: '10–14', label: 'Moderate' },
      { range: '15–19', label: 'Severe' },
      { range: '20+',   label: 'Extremely Severe' },
    ],
    tool: 'DASS-21 Anxiety Subscale (Lovibond & Lovibond, 1995)',
    reference: 'https://www.ncbi.nlm.nih.gov/books/NBK441870/',
  },

  depression: {
    name: 'Depression',
    icon: '🌧️',
    color: '#1A6A30',
    definition: 'Major Depressive Disorder (MDD) is a serious medical condition involving persistent low mood, loss of interest or pleasure in activities, and a range of emotional and physical problems that interfere with daily functioning.',
    dsmNote: 'DSM-5 requires ≥5 symptoms over 2 weeks, including at least one core symptom (depressed mood OR anhedonia). Symptoms must cause significant distress or functional impairment.',
    symptoms: [
      'Depressed mood most of the day, nearly every day',
      'Markedly diminished interest or pleasure (anhedonia)',
      'Significant weight/appetite change',
      'Insomnia or hypersomnia',
      'Psychomotor agitation or retardation',
      'Fatigue or loss of energy',
      'Feelings of worthlessness or excessive guilt',
      'Difficulty concentrating or making decisions',
      'Recurrent thoughts of death or suicidal ideation',
    ],
    severity: [
      { range: '0–9',   label: 'Normal' },
      { range: '10–13', label: 'Mild' },
      { range: '14–20', label: 'Moderate' },
      { range: '21–27', label: 'Severe' },
      { range: '28+',   label: 'Extremely Severe' },
    ],
    tool: 'DASS-21 Depression Subscale (Lovibond & Lovibond, 1995)',
    reference: [
      'https://www.who.int/news-room/fact-sheets/detail/depression',
      'https://www.nimh.nih.gov/health/topics/depression',
      'https://www.psychiatry.org/patients-families/depression/what-is-depression',
    ],
  },

  bipolar: {
    name: 'Bipolar Disorder',
    icon: '🔄',
    color: '#2980B9',
    definition: 'Bipolar disorder is a mood spectrum condition characterised by distinct episodes of mania or hypomania, alternating with or mixed with depressive episodes. It significantly affects energy, activity, sleep and behaviour.',
    dsmNote: 'Bipolar I requires at least one manic episode (≥7 days), Bipolar II requires at least one hypomanic episode (≥4 days) and one major depressive episode. The MDQ screens for lifetime manic/hypomanic episodes.',
    symptoms: [
      'Elevated, expansive, or unusually irritable mood',
      'Markedly increased energy and goal-directed activity',
      'Decreased need for sleep (feeling rested after 3 hours)',
      'Grandiosity or inflated self-esteem',
      'Racing thoughts / flight of ideas',
      'Idiosyncratic talkativeness, pressured speech',
      'Impulsive, risky, or reckless behaviour',
      'In depressive phase: all symptoms of MDD apply',
    ],
    severity: [
      { range: '< 10', label: 'Negative Screen' },
      { range: '≥ 10', label: 'Positive Screen — Professional Assessment Needed' },
    ],
    tool: 'Mood Disorder Questionnaire — MDQ (Hirschfeld et al., 2000) — adapted',
    reference: [
      'https://www.who.int/news-room/fact-sheets/detail/bipolar-disorder',
      'https://www.mayoclinic.org/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955',
      'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
    ],
  },

  schizophrenia: {
    name: 'Schizophrenia',
    icon: '🧩',
    color: '#533AB7',
    definition: 'Schizophrenia is a severe psychiatric disorder characterised by psychosis (loss of contact with reality), including hallucinations, delusions, disorganised thinking and negative symptoms. It typically requires long-term professional management.',
    dsmNote: 'DSM-5 requires ≥2 of the following for ≥1 month (at least 1 must be items 1–3): (1) Delusions, (2) Hallucinations, (3) Disorganised speech, (4) Grossly disorganised behaviour, (5) Negative symptoms. Significant functional decline required.',
    symptoms: [
      'Hallucinations (most commonly auditory)',
      'Delusions (fixed false beliefs)',
      'Disorganised speech or thought process',
      'Grossly disorganised or catatonic behaviour',
      'Negative symptoms: flat affect, alogia, avolition, anhedonia',
      'Social or occupational dysfunction',
      'Social withdrawal and emotional blunting',
    ],
    severity: [
      { range: 'Flagged', label: 'Immediate assessment required' },
      { range: 'Not flagged', label: 'Normal baseline screen' },
    ],
    tool: 'PRIME Screen (Miller et al., 2003) — adapted',
    reference: 'https://www.ncbi.nlm.nih.gov/books/NBK539864/',
  },
};

export const KB_COPING: Record<string, string[]> = {
  stress: [
    'Identify and write down your top 3 stressors this week to make them concrete and manageable.',
    'Practice structured relaxation: 10 minutes of deep breathing (4-count in, 6-count out) twice daily.',
    'Exercise for 20–30 minutes daily — physical activity is one of the most effective stress reducers.',
    'Set clear work-rest boundaries and protect time away from digital devices.',
    'Practise saying no to non-essential demands; prioritise ruthlessly.',
    'Consider speaking to a counsellor if stress persists for more than 2 weeks.',
  ],
  anxiety: [
    'Practice diaphragmatic breathing when anxious: slow, deep breaths from the belly, not the chest.',
    'Use structured worry time: limit worry to a fixed 15-minute window daily, then redirect attention.',
    'Challenge anxious thoughts using Socratic questioning — "Is this worry realistic? What is the evidence?"',
    'Gradually face feared situations with graded exposure; avoidance maintains and worsens anxiety.',
    'Limit caffeine, alcohol, and sleep deprivation, all of which heighten physiological anxiety.',
    'Consider evidence-based CBT workbooks or apps (e.g., Wysa, Woebot) as supplementary tools.',
    'Consult a GP for referral to a clinical psychologist if anxiety significantly disrupts daily life.',
  ],
  depression: [
    'Engage in behavioural activation: schedule small, pleasurable activities daily even when unmotivated.',
    'Maintain a consistent sleep-wake schedule, including weekends — sleep dysregulation worsens depression.',
    'Confide in at least one trusted person about how you are feeling; social isolation worsens depression.',
    'Aim for 30 minutes of aerobic exercise 3–5 days per week — shown to reduce depressive symptoms.',
    'Limit alcohol consumption — alcohol is a CNS depressant and significantly worsens mood.',
    'If you have thoughts of self-harm, contact Befrienders KL (03-7627 2929) or go to A&E immediately.',
    'Seek a GP referral for clinical assessment — depression is highly treatable with therapy and/or medication.',
  ],
  bipolar: [
    'Track your mood, sleep, and energy daily using a mood diary or app (e.g., Daylio, eMoods).',
    'Maintain an extremely consistent sleep schedule — even minor sleep disruption can trigger episodes.',
    'Avoid alcohol and all recreational substances, which can trigger or worsen both manic and depressive episodes.',
    'Share your screening result with a GP or psychiatrist for formal evaluation as soon as possible.',
    'Inform a trusted support person about your symptoms and how they can help you stay regulated.',
    'Do not self-adjust psychiatric medications if already prescribed, changes require medical supervision.',
    'Learn to recognise your personal early warning signs for both manic and depressive phases.',
  ],
  schizophrenia: [
    '⚠️ Please consult a psychiatrist or mental health professional as soon as possible.',
    'If symptoms are distressing or worsening, visit the nearest hospital Emergency Department.',
    'Inform a trusted family member or friend about what you are experiencing so they can support you.',
    'Avoid all recreational drugs and cannabis, which are known to precipitate and worsen psychotic symptoms.',
    'Maintain a regular daily routine for sleep, meals, and activity to reduce cognitive load.',
    'Contact MIASA (1800 82 0066) for guidance and support resources in Malaysia.',
  ],
};

export const KB_CHAT_RULES = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'salam', 'hai'],
    response: "Hello! I'm MindBot, MindCheck's mental health information assistant. I can answer questions about depression, anxiety, stress, bipolar disorder, and schizophrenia. What would you like to know?",
  },
  {
    keywords: ['depress'],
    response: "Depression (MDD) involves persistent low mood, loss of interest, fatigue, and hopelessness lasting ≥2 weeks. It affects approximately 280 million people globally (WHO, 2023). It is highly treatable — around 60–80% of cases respond well to therapy and/or medication. If you are concerned, please consult a GP or mental health professional. (Source: WHO, NIMH, APA)",
  },
  {
    keywords: ['anxi', 'worry', 'panic', 'gad'],
    response: "Anxiety disorders involve excessive, difficult-to-control worry and physiological symptoms (palpitations, breathlessness, trembling). GAD requires symptoms to persist for ≥6 months. CBT is the gold-standard psychological treatment. (Source: NCBI NBK441870)",
  },
  {
    keywords: ['stress'],
    response: "Stress is your body's response to perceived demands exceeding coping resources. Chronic stress is linked to cardiovascular disease, immune suppression, and mental health disorders. The DASS-21 measures stress as a distinct construct from anxiety. (Source: Lovibond & Lovibond, 1995)",
  },
  {
    keywords: ['bipolar', 'manic', 'mania', 'hypomania', 'mood swing'],
    response: "Bipolar disorder involves distinct episodes of elevated or irritable mood (mania/hypomania) alternating with depressive episodes. It affects around 45 million people globally (WHO, 2022). It is a lifelong condition managed with mood stabilisers (e.g., lithium) and psychotherapy. (Source: WHO, Mayo Clinic, NIMH)",
  },
  {
    keywords: ['schizo', 'psycho', 'halluc', 'delus', 'voice', 'paranoi'],
    response: "Schizophrenia is a severe psychotic disorder affecting about 24 million people globally (WHO, 2022). It involves hallucinations, delusions, disorganised thinking, and negative symptoms. Early intervention significantly improves outcomes. Please seek professional assessment if you are concerned. (Source: NCBI NBK539864)",
  },
  {
    keywords: ['cop', 'help myself', 'what can i do', 'tip', 'strateg', 'manage', 'deal'],
    response: "Evidence-based coping strategies include: (1) regular aerobic exercise 3–5x/week, (2) consistent sleep schedule, (3) mindfulness or deep breathing, (4) limiting alcohol and caffeine, (5) maintaining social connections, (6) journalling, and (7) seeking professional help when symptoms persist. Which condition are you asking about?",
  },
  {
    keywords: ['sleep', 'insomnia', 'can\'t sleep', 'sleeping too much'],
    response: "Sleep disturbance is both a symptom and driver of mental illness. Sleep hygiene practices: consistent sleep-wake times, no screens 1hr before bed, keep bedroom cool and dark, no caffeine after 2pm, avoid alcohol (it fragments sleep architecture). Persistent insomnia warrants medical review.",
  },
  {
    keywords: ['exercis', 'physical', 'sport', 'gym', 'walk'],
    response: "Exercise is one of the most evidence-based mental health interventions. 30 minutes of moderate aerobic activity (brisk walking, cycling, swimming) 3–5x/week reduces depression and anxiety comparably to antidepressant medication in mild-moderate cases. (Harvard Health, 2023; Blumenthal et al., 1999)",
  },
  {
    keywords: ['mindful', 'meditat', 'breath'],
    response: "Mindfulness-based interventions (MBSR, MBCT) have strong evidence for reducing stress, anxiety, and depression relapse. Start with 10 minutes daily. Free resources: Headspace, Calm, or search 'MBSR 8-week program' online. Consistency of daily practice is crucial.",
  },
  {
    keywords: ['therap', 'counsel', 'psycholog', 'psychiatr'],
    response: "In Malaysia, mental health services are available at: (1) Public hospital psychiatric departments (subsidised — needs GP referral), (2) Private psychiatrists/psychologists, (3) Malaysian Mental Health Association (MMHA) — mmha.org.my, (4) University wellness/counselling centres. CBT is the gold-standard treatment.",
  },
  {
    keywords: ['helpline', 'crisis', 'emergency', 'hotline', 'suicide', 'self-harm', 'harm myself'],
    response: "🆘 IMMEDIATE HELP AVAILABLE IN MALAYSIA:\n• Befrienders KL: 03-7627 2929 (24 hours)\n• MIASA: 1800 82 0066\n• Talian Kasih: 15999 (24 hours, free)\n• Emergency Services: Dial 999 or go to the nearest Hospital A&E.\n\nMore resources: findahelpline.com/countries/my",
  },
  {
    keywords: ['screen', 'how does', 'what is mindcheck', 'this tool', 'how it works'],
    response: "MindCheck is a 4-step expert system: (1) Demographic history, (2) Physical health & lifestyle, (3) Safety & sleep baseline, and (4) 33 validated questions covering Stress (DASS-21), Anxiety (DASS-21), Depression (DASS-21), Bipolar (MDQ-adapted), and Schizophrenia (PRIME Screen-adapted). Results are preliminary indicators, not a clinical diagnosis.",
  },
  {
    keywords: ['dass', 'mdq', 'prime', 'questionnaire', 'scale'],
    response: "MindCheck uses three validated instruments: (1) DASS-21 — Depression, Anxiety & Stress Scales (Lovibond & Lovibond, 1995); (2) MDQ-adapted — Mood Disorder Questionnaire for bipolar screening (Hirschfeld et al., 2000); (3) PRIME Screen-adapted for psychosis/schizophrenia screening (Miller et al., 2003).",
  },
  {
    keywords: ['malaysia', 'malaysian', 'my'],
    response: "In Malaysia, mental health services include public hospital psychiatric departments (subsidised), MMHA (mmha.org.my), MIASA, Befrienders KL, and community mental health clinics (Klinik Kesihatan). For immediate crisis support, call Befrienders KL: 03-7627 2929 or Talian Kasih: 15999.",
  },
];

const KB_CHAT_FALLBACK = "I can provide evidence-based information about depression, anxiety, stress, bipolar disorder, schizophrenia, lifestyle coping strategies, therapy options, and Malaysian crisis helplines. Could you rephrase your question, or pick one of the quick-reply topics?";

export function KB_getChatResponse(userInput: string): string {
  const lower = userInput.toLowerCase().trim();
  for (const rule of KB_CHAT_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return KB_CHAT_FALLBACK;
}

export function KB_computeScores(answers: Record<string, number>) {
  const raw = { stress: 0, anxiety: 0, depression: 0, bipolar: 0, schizophrenia: 0 };
  KB_QUESTIONS.forEach((q) => {
    raw[q.domain] += answers[q.id] || 0;
  });
  return {
    stress: raw.stress * 2, // DASS-21 convention
    anxiety: raw.anxiety * 2, // DASS-21 convention
    depression: raw.depression * 2, // DASS-21 convention
    bipolar: raw.bipolar,
    schizophrenia: raw.schizophrenia,
  };
}

export function KB_computeResult(answers: Record<string, number>): ScoringResult {
  const scores = KB_computeScores(answers);
  const primary = KB_getPrimaryCondition(scores, answers);
  
  // If the primary result is "Normal" (i.e. all DASS domains came back
  // Normal, since Bipolar/Schizophrenia can only be primary when actively
  // flagged/positive), there's nothing to cope with — skip suggestions.
  const isNormalResult = primary.label === 'Normal';

  // Find normalized domain key for coping extraction
  const normalizedKey = primary.name.toLowerCase().replace(' disorder', '').trim();
  const coping = isNormalResult ? [] : (KB_COPING[normalizedKey] || KB_COPING.stress);

  const sz = KB_classifySchizophrenia(scores.schizophrenia, answers);
  const bp = KB_classifyBipolar(scores.bipolar);
  const dep = KB_classifyDepression(scores.depression);
  const anx = KB_classifyAnxiety(scores.anxiety);
  const str = KB_classifyStress(scores.stress);

  const isCrisis = sz.flagged || bp.positive || primary.label === 'Extremely Severe' || primary.label === 'Severe';

  return {
    scores,
    primary,
    coping,
    isCrisis,
    breakdown: [
      { name: 'Depression', icon: '🌧️', score: scores.depression, ...dep },
      { name: 'Anxiety', icon: '🌱', score: scores.anxiety, ...anx },
      { name: 'Stress', icon: '🫂', score: scores.stress, ...str },
      { name: 'Bipolar Disorder', icon: '🔄', score: scores.bipolar, ...bp },
      { name: 'Schizophrenia', icon: '🧩', score: scores.schizophrenia, ...sz },
    ],
  };
}
