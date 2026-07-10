import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Activity, 
  Brain, 
  Sparkles, 
  HeartHandshake, 
  ChevronRight, 
  ChevronLeft, 
  CornerDownRight, 
  Send, 
  MessageSquare, 
  X, 
  RefreshCw, 
  Info, 
  AlertTriangle, 
  Calendar, 
  User, 
  BookOpen, 
  PhoneCall, 
  CheckCircle2, 
  Search, 
  HelpCircle,
  Clock,
  ThumbsUp,
  Briefcase,
  GraduationCap
} from 'lucide-react';

import { DemographicState, ScoringResult, Question } from './types';
import { 
  KB_QUESTIONS, 
  KB_OPTS_DASS, 
  KB_OPTS_FREQ, 
  KB_CONDITIONS, 
  KB_computeResult, 
  KB_getChatResponse 
} from './kb';
import { MindCheckLogo } from './components/MindCheckLogo';
import { MindTreeVisual } from './components/MindTreeVisual';

// Beautiful inline base64 image logo provided in original project assets
const LOGO_B64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQABAADASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAIBAwYHCAUECf/EAFEQAQACAQMCBAMEBQcIBggHAQABAgMEBREGIQcSMUETUWEIInGBFDJCkaEVI1JygrHBJDNDU2KSotEWNIOTsvA1RGNkc7PC4RcllKPD0vFl/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEDBAIFBv/EADIRAQACAgEEAQAIBgEFAAAAAAABAgMRIQQSMUFRExQiMkJhcfAFI4GRscGhFTNS0eH/2gAAwEAAhEDEQA/AOMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'screening' | 'conditions' | 'resources' | 'about'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: "Hello! I'm MindBot, MindCheck's mental health information assistant. I can answer questions about depression, anxiety, stress, bipolar disorder, and schizophrenia. What would you like to know?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Screening flow state
  const [screenStep, setScreenStep] = useState<number>(0); // 0: Consent, 1: Background, 2: Physical, 3: Safety, 4: Questionnaire, 5: Results
  const [consentGiven, setConsentGiven] = useState(false);
  
  // Demographic form data
  const [formData, setFormData] = useState<DemographicState>({
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    education: '',
    occupation: '',
    prevDiagnosis: '',
    prevConditions: [],
    inTherapy: '',
    onPsychMed: '',
    chronicIllness: [],
    rxMeds: '',
    famHistory: false,
    famConditions: [],
    alcoholUse: false,
    recreationalUse: false,
    traumaticEvents: '',
    selfHarmThoughts: '',
    sleepHours: '',
    activityLevel: '',
    additionalNotes: '',
  });

  // Active validation error messages
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [screeningResult, setScreeningResult] = useState<ScoringResult | null>(null);

  // ---------- INTERACTIVE DASHBOARD STATES & WAVE GENERATOR ----------
  const [moodCheckIn, setMoodCheckIn] = useState<string>('');
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathingCycle, setBreathingCycle] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>('idle');
  const [breathingCount, setBreathingCount] = useState<number>(4);
  const [breathingTotalCycles, setBreathingTotalCycles] = useState<number>(0);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioTone, setAudioTone] = useState<'528' | '432' | 'alpha'>('528');
  const [mindTreeGrowth, setMindTreeGrowth] = useState<number>(2);
  const [treeNurturedMessage, setTreeNurturedMessage] = useState<string>('');

  // Interactive Heuristics Simulator States
  const [simStress, setSimStress] = useState<number>(10);
  const [simAnxiety, setSimAnxiety] = useState<number>(6);
  const [simDepression, setSimDepression] = useState<number>(8);
  const [simBipolar, setSimBipolar] = useState<number>(3);
  const [simSchizo, setSimSchizo] = useState<number>(1);

  // Web Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startOscillator = (type: '528' | '432' | 'alpha') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop old oscillator
      stopOscillator();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      
      let freq = 528;
      if (type === '432') freq = 432;
      if (type === 'alpha') freq = 220; // Alpha carrier wave

      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      
      oscRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.warn("Solfeggio synthesizer not started:", e);
    }
  };

  const stopOscillator = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
    } catch (e) {
      console.warn("Solfeggio synthesizer stop error:", e);
    }
  };

  // Watch audio state and adjust tones
  useEffect(() => {
    if (audioPlaying) {
      startOscillator(audioTone);
    } else {
      stopOscillator();
    }
    return () => {
      stopOscillator();
    };
  }, [audioPlaying, audioTone]);

  // Breathing timer cycle logic
  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      if (breathingCycle === 'idle') {
        setBreathingCycle('inhale');
        setBreathingCount(4);
      }
      
      interval = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev <= 1) {
            if (breathingCycle === 'inhale') {
              setBreathingCycle('hold');
              return 4;
            } else if (breathingCycle === 'hold') {
              setBreathingCycle('exhale');
              return 6;
            } else {
              setBreathingCycle('inhale');
              setBreathingTotalCycles((c) => {
                const updated = c + 1;
                if (updated % 2 === 0) {
                  setMindTreeGrowth((g) => Math.min(5, g + 1));
                  setTreeNurturedMessage("🌱 breathing cycle logged! Your Mind Tree grows!");
                  setTimeout(() => setTreeNurturedMessage(''), 3000);
                }
                return updated;
              });
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingCycle('idle');
      setBreathingCount(4);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingCycle]);

  // Compute simulation outcomes dynamically
  const getSimulatedResults = () => {
    const scores = {
      stress: simStress,
      anxiety: simAnxiety,
      depression: simDepression,
      bipolar: simBipolar,
      schizophrenia: simSchizo
    };
    
    // Simulate classification
    const classifyStress = (s: number) => {
      const v = s * 2;
      if (v <= 14) return { label: 'Normal', css: 'bg-emerald-50 text-emerald-800' };
      if (v <= 18) return { label: 'Mild', css: 'bg-yellow-50 text-yellow-800 border-l-2 border-yellow-400' };
      if (v <= 25) return { label: 'Moderate', css: 'bg-orange-50 text-orange-800 border-l-2 border-orange-400' };
      if (v <= 33) return { label: 'Severe', css: 'bg-red-50 text-red-800 border-l-2 border-red-400 font-bold' };
      return { label: 'Extremely Severe', css: 'purple-theme bg-red-950 text-red-100 font-extrabold' };
    };

    const classifyAnxiety = (a: number) => {
      const v = a * 2;
      if (v <= 7) return { label: 'Normal', css: 'bg-emerald-50 text-emerald-800' };
      if (v <= 9) return { label: 'Mild', css: 'bg-yellow-50 text-yellow-800 border-l-2 border-yellow-400' };
      if (v <= 14) return { label: 'Moderate', css: 'bg-orange-50 text-orange-800 border-l-2 border-orange-400' };
      if (v <= 19) return { label: 'Severe', css: 'bg-red-50 text-red-800 border-l-2 border-red-400 font-bold' };
      return { label: 'Extremely Severe', css: 'purple-theme bg-red-950 text-red-100 font-extrabold' };
    };

    const classifyDepression = (d: number) => {
      const v = d * 2;
      if (v <= 9) return { label: 'Normal', css: 'bg-emerald-50 text-emerald-800' };
      if (v <= 13) return { label: 'Mild', css: 'bg-yellow-50 text-yellow-800 border-l-2 border-yellow-400' };
      if (v <= 20) return { label: 'Moderate', css: 'bg-orange-50 text-orange-800 border-l-2 border-orange-400' };
      if (v <= 27) return { label: 'Severe', css: 'bg-red-50 text-red-800 border-l-2 border-red-400 font-bold' };
      return { label: 'Extremely Severe', css: 'purple-theme bg-red-950 text-red-100 font-extrabold' };
    };

    const classifyBipolar = (b: number) => {
      return b >= 5 
        ? { label: 'Positive Screen', css: 'bg-purple-100 text-purple-900 border-l-2 border-purple-500 font-bold' } 
        : { label: 'Negative Screen', css: 'bg-gray-100 text-gray-700' };
    };

    const classifySchizo = (sc: number) => {
      return sc >= 2 
        ? { label: 'Flagged - Suggest Assessment', css: 'bg-rose-950 text-rose-100 border-l-2 border-rose-500 font-bold' } 
        : { label: 'Not Flagged', css: 'bg-gray-100 text-gray-700' };
    };

    return {
      stress: classifyStress(scores.stress),
      anxiety: classifyAnxiety(scores.anxiety),
      depression: classifyDepression(scores.depression),
      bipolar: classifyBipolar(scores.bipolar),
      schizophrenia: classifySchizo(scores.schizophrenia)
    };
  };

  const simResult = getSimulatedResults();
  // -------------------------------------------------------------------

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleDemographicChange = (field: keyof DemographicState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiSelect = (field: 'prevConditions' | 'chronicIllness' | 'famConditions', value: string) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  // Perform custom multi-step validations based on the prompt's rules
  const handleValidateStep1 = () => {
    const errors: string[] = [];
    if (!formData.age) errors.push('Age Range is compulsory.');
    if (!formData.gender) errors.push('Gender is compulsory.');
    if (!formData.maritalStatus) errors.push('Marital Status is compulsory.');
    if (!formData.education) errors.push('Education Level is compulsory.');
    if (!formData.occupation) errors.push('Occupation is compulsory.');
    if (!formData.prevDiagnosis) errors.push('Diagnosis history status is compulsory.');
    if (!formData.inTherapy) errors.push('Therapy participation status is compulsory.');
    if (!formData.onPsychMed) errors.push('Psychiatric medication usage field is compulsory.');

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setValidationErrors([]);
      setScreenStep(2);
    }
  };

  const handleValidateStep2 = () => {
    const errors: string[] = [];
    if (formData.chronicIllness.length === 0) {
      errors.push("Chronic illnesses field is compulsory (please select at least one, or select 'None').");
    }
    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setValidationErrors([]);
      setScreenStep(3);
    }
  };

  const handleValidateStep3 = () => {
    const errors: string[] = [];
    if (!formData.traumaticEvents) errors.push('Trauma history status is compulsory.');
    if (!formData.selfHarmThoughts) errors.push('Self-harm / suicidal thoughts history is compulsory.');
    if (!formData.sleepHours) errors.push('Average sleep hours per night is compulsory.');
    if (!formData.activityLevel) errors.push('Physical activity level is compulsory.');

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setValidationErrors([]);
      setScreenStep(4);
      setQuestionIndex(0);
    }
  };

  const handleSelectOption = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    const currentQuestion = KB_QUESTIONS[questionIndex];
    if (answers[currentQuestion.id] === undefined) {
      alert('Please select an option before proceeding.');
      return;
    }
    if (questionIndex < KB_QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Complete!
      const finalResult = KB_computeResult(answers);
      setScreeningResult(finalResult);
      setScreenStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setScreenStep(3);
    }
  };

  const resetScreening = () => {
    setAnswers({});
    setScreeningResult(null);
    setQuestionIndex(0);
    setScreenStep(0);
    setConsentGiven(false);
    setFormData({
      name: '',
      age: '',
      gender: '',
      maritalStatus: '',
      education: '',
      occupation: '',
      prevDiagnosis: '',
      prevConditions: [],
      inTherapy: '',
      onPsychMed: '',
      chronicIllness: [],
      rxMeds: '',
      famHistory: false,
      famConditions: [],
      alcoholUse: false,
      recreationalUse: false,
      traumaticEvents: '',
      selfHarmThoughts: '',
      sleepHours: '',
      activityLevel: '',
      additionalNotes: '',
    });
    setValidationErrors([]);
  };
  // ---------- PROFESSIONAL PDF EXPORT (Modules 1–3 + Diagnostic Summary) ----------
  const handleExportPDF = () => {
    if (!screeningResult) return;

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const green: [number, number, number] = [21, 92, 60];
    const lightGray: [number, number, number] = [245, 245, 245];
    let cursorY = 0;

    const dateStr = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });
    const yn = (v: boolean) => (v ? 'Yes' : 'No');
    const orNA = (v?: string) => (v && v.trim() !== '' ? v : 'Not provided');
    const orNone = (arr?: string[]) => (arr && arr.length > 0 ? arr.join(', ') : 'None reported');

    // jsPDF's built-in fonts only support Latin-1/WinAnsi — emoji and other
    // special Unicode characters render as garbage glyphs. Strip them for PDF
    // only; the on-screen UI is unaffected since this is only used here.
    const sanitizeForPDF = (str: string) =>
      str
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/\u2022/g, '-')
        .replace(/\u00A0/g, ' ')
        .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
        .replace(/[\u2600-\u27BF]/g, '')
        .replace(/\uFE0F/g, '')
        .trim();

    const ensureSpace = (needed: number) => {
      if (cursorY + needed > pageHeight - 60) {
        doc.addPage();
        cursorY = margin;
      }
    };

    const sectionHeading = (title: string) => {
      ensureSpace(40);
      doc.setFillColor(...green);
      doc.rect(margin, cursorY, pageWidth - margin * 2, 22, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(title.toUpperCase(), margin + 10, cursorY + 15);
      doc.setTextColor(0, 0, 0);
      cursorY += 22 + 10;
    };

    const fieldTable = (rows: [string, string][]) => {
      autoTable(doc, {
        startY: cursorY,
        margin: { left: margin, right: margin },
        theme: 'grid',
        head: [['Field', 'Response']],
        body: rows,
        headStyles: { fillColor: green, textColor: 255, fontSize: 9, fontStyle: 'bold' },
        bodyStyles: { fontSize: 9, textColor: 30, cellPadding: 6 },
        alternateRowStyles: { fillColor: lightGray },
        columnStyles: { 0: { cellWidth: 200, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } },
      });
      // @ts-ignore - lastAutoTable is attached by the plugin at runtime
      cursorY = (doc as any).lastAutoTable.finalY + 24;
    };

    // ================= COVER / HEADER =================
    doc.setFillColor(...green);
    doc.rect(0, 0, pageWidth, 90, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('MindCheck', margin, 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Mental Health Screening Report', margin, 60);
    doc.setFontSize(8.5);
    doc.text(`Generated on ${dateStr}`, margin, 76);
    doc.setTextColor(0, 0, 0);
    cursorY = 110;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(90, 90, 90);
    const disclaimer =
      'This report is generated from a self-reported informational screening and does not constitute a clinical diagnosis. Please consult a licensed mental health professional for a full evaluation.';
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
    doc.text(disclaimerLines, margin, cursorY);
    doc.setTextColor(0, 0, 0);
    cursorY += disclaimerLines.length * 11 + 16;

    // ================= MODULE 1: BACKGROUND & DEMOGRAPHICS =================
    sectionHeading('Background Profile');
    fieldTable([
      ['Name', orNA(formData.name)],
      ['Age Range', orNA(formData.age)],
      ['Gender', orNA(formData.gender)],
      ['Marital Status', orNA(formData.maritalStatus)],
      ['Education Level', orNA(formData.education)],
      ['Occupation', orNA(formData.occupation)],
      ['Previously Diagnosed with a Mental Health Condition', orNA(formData.prevDiagnosis)],
      ['Diagnosed Condition(s)', orNone(formData.prevConditions)],
      ['Currently Attending Therapy', orNA(formData.inTherapy)],
      ['Currently Taking Psychiatric Medication', orNA(formData.onPsychMed)],
    ]);

    // ================= MODULE 2: PHYSICAL HEALTH & LIFESTYLE =================
    sectionHeading('Physical Health & Lifestyle');
    fieldTable([
      ['Chronic Physical Illness(es)', orNone(formData.chronicIllness)],
      ['Non-Psychiatric Prescription Medications', orNA(formData.rxMeds) === 'Not provided' ? 'None reported' : formData.rxMeds],
      ['Family Mental Health History', yn(formData.famHistory)],
      ['Family Condition(s)', formData.famHistory ? orNone(formData.famConditions) : 'N/A'],
      ['Regular Alcohol Use', yn(formData.alcoholUse)],
      ['Recreational Substance Use', yn(formData.recreationalUse)],
    ]);

    // ================= MODULE 3: SAFETY & DAILY BASELINE =================
    sectionHeading('Trauma & Safety Baseline');
    fieldTable([
      ['Significant Traumatic Life Events', orNA(formData.traumaticEvents)],
      ['Self-Harm / Suicidal Thoughts (Past Month)', orNA(formData.selfHarmThoughts)],
      ['Average Sleep per Night', orNA(formData.sleepHours)],
      ['Physical Activity Level', orNA(formData.activityLevel)],
      ['Additional Notes', orNA(formData.additionalNotes) === 'Not provided' ? 'None provided' : formData.additionalNotes],
    ]);

    if (formData.selfHarmThoughts === 'Yes') {
      ensureSpace(50);
      doc.setDrawColor(200, 40, 40);
      doc.setFillColor(253, 235, 235);
      const boxH = 40;
      doc.rect(margin, cursorY, pageWidth - margin * 2, boxH, 'FD');
      doc.setTextColor(160, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Safety note: self-harm/suicidal ideation was reported. Support is available 24/7:', margin + 8, cursorY + 16);
      doc.setFont('helvetica', 'normal');
      doc.text('Befrienders KL: 03-7627 2929   |   MIASA Helpline: 1800-82-0066', margin + 8, cursorY + 30);
      doc.setTextColor(0, 0, 0);
      cursorY += boxH + 20;
    }

    // ================= DIAGNOSTIC SUMMARY =================
    sectionHeading('Diagnostic Summary');

    ensureSpace(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(screeningResult.primary.name, margin, cursorY);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`Risk Severity: ${screeningResult.primary.label}   |   Index Score: ${screeningResult.primary.score}`, margin, cursorY + 18);
    cursorY += 36;

    if (screeningResult.isCrisis) {
      ensureSpace(46);
      doc.setDrawColor(200, 40, 40);
      doc.setFillColor(253, 235, 235);
      doc.rect(margin, cursorY, pageWidth - margin * 2, 36, 'FD');
      doc.setTextColor(160, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Severe classification risk detected — professional consultation is strongly advised.', margin + 8, cursorY + 22);
      doc.setTextColor(0, 0, 0);
      cursorY += 36 + 20;
    }

    fieldTable(
      screeningResult.breakdown.map((item) => [item.name, `${item.label}  (Score: ${item.score})`] as [string, string])
    );

    sectionHeading('Prescribed Coping Solutions / Action Directives');
    ensureSpace(20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    screeningResult.coping.forEach((item) => {
      const cleanItem = sanitizeForPDF(item);
      const lines = doc.splitTextToSize(`-  ${cleanItem}`, pageWidth - margin * 2 - 10);
      ensureSpace(lines.length * 12 + 4);
      doc.text(lines, margin + 4, cursorY);
      cursorY += lines.length * 12 + 6;
    });

    // ================= FOOTER =================
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(140, 140, 140);
      doc.text('MindCheck — Confidential Screening Report', margin, pageHeight - 20);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 50, pageHeight - 20);
      doc.setTextColor(0, 0, 0);
    }

    const fileNameSafe = (formData.name || 'MindCheck_Report').replace(/[^a-z0-9]/gi, '_');
    doc.save(`${fileNameSafe}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const triggerChatBot = async (text: string, currentHistory?: Array<{ sender: 'bot' | 'user'; text: string }>) => {
    const activeHistory = currentHistory || chatMessages;
    const updatedMessages = [...activeHistory, { sender: 'user', text }];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    try {
      const payload = {
        messages: updatedMessages,
        screeningResult: screeningResult,
        patientProfile: {
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          occupation: formData.occupation,
          prevDiagnosis: formData.prevDiagnosis,
          sleepHours: formData.sleepHours,
          activityLevel: formData.activityLevel
        }
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('API server returned error');
      }

      const data = await res.json();
      if (data.response) {
        setChatMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        throw new Error('Empirical empty response');
      }
    } catch (e) {
      console.warn("Falling back to local reference assistant:", e);
      setTimeout(() => {
        const response = KB_getChatResponse(text);
        setChatMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    triggerChatBot(chatInput);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-green-100 selection:text-green-800 antialiased font-sans">
      
      {/* Helpline banner */}
      <div className="bg-red-700 text-white py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide shadow-sm flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 transition">
        <span className="flex items-center gap-1 font-bold">
          <AlertTriangle className="h-4 w-4 text-yellow-300 animate-pulse" /> 
          IMMEDIATE CRISIS ASSISTANCE:
        </span>
        <span className="opacity-95">If you or someone you know is in immediate distress:</span>
        <div className="flex gap-2 font-bold underline">
          <a href="tel:0376272929" className="hover:text-red-250 hover:scale-105 transition duration-150">Befrienders KL (03-76272929)</a>
          <span className="opacity-60">|</span>
          <a href="tel:1800820066" className="hover:text-red-250 hover:scale-105 transition duration-150">MIASA (1800-82-0066)</a>
        </div>
      </div>

      {/* Styled Navigation bar featuring pristine logo positioning (no rounded corners, no padding box as requested) */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
                className="flex items-center gap-2 group cursor-pointer focus:outline-hidden"
              >
                {/* Embedded Logo rendered flat, sharp, zero corner radius or padding block as explicitly requested */}
                <MindCheckLogo 
                  className="h-10 w-10 min-w-10 rounded-none p-0 m-0 block object-contain text-emerald-600" 
                  size={40}
                />
                <span className="font-mono text-xl font-bold text-gray-900 tracking-tight transition group-hover:text-green-700">
                  Mind<span className="text-green-600 font-sans font-semibold">Check</span>
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-1">
              {[
                { key: 'home', label: 'Home' },
                { key: 'screening', label: 'Screening Wizard' },
                { key: 'conditions', label: 'Conditions Library' },
                { key: 'resources', label: 'Crisis Resources' },
                { key: 'about', label: 'Academic About' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-150 cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-green-50 text-green-700 border border-green-200/50 shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right support callout */}
            <div className="hidden lg:flex items-center gap-3 text-xs text-gray-500 bg-gray-100 py-1.5 px-3 rounded-sm font-mono border border-gray-200/50">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SECURE SYSTEM v2.4 (OFFLINE)
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : (
                  <div className="flex flex-col gap-1.5 w-6">
                    <span className="h-0.5 bg-gray-600 w-full rounded"></span>
                    <span className="h-0.5 bg-gray-600 w-3/4 rounded"></span>
                    <span className="h-0.5 bg-gray-600 w-full rounded"></span>
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {[
                  { key: 'home', label: 'Home' },
                  { key: 'screening', label: 'Screening Wizard' },
                  { key: 'conditions', label: 'Conditions Library' },
                  { key: 'resources', label: 'Crisis Resources' },
                  { key: 'about', label: 'Academic About' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-semibold transition ${
                      activeTab === tab.key
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME SCREEN ==================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dynamic Modern Hero with SVG Logo */}
              <section className="relative overflow-hidden bg-gradient-to-br from-[#1b3a24] via-[#152e1d] to-[#0c1c11] text-white py-16 px-4 md:px-8 shadow-inner border-b border-white/5">
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9dfc1] rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8bbf98] rounded-full blur-3xl" />
                </div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-1 rounded-full shadow-lg border border-[#c9dfc1]/30">
                      <MindCheckLogo size={80} className="h-20 w-20 object-contain text-emerald-700" />
                    </div>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#c9dfc1] backdrop-blur-xs border border-white/10 mb-6 font-mono uppercase tracking-widest leading-none">
                    <Sparkles className="h-3 w-3 text-[#fa8b8b] animate-pulse" /> Fully Interactive Wellness Space
                  </span>
                  
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#f4faf0] mb-6 font-sans">
                    Mind<span className="text-[#a4d882]">Check</span> &nbsp;Companion
                  </h1>
                  
                  <p className="text-md md:text-xl text-gray-200/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                    A clinical screening tool built to evaluate psychological indicators while prioritizing responsible data handling.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                      onClick={() => setActiveTab('screening')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#1b3a24] text-[#f4faf0] border border-[#a4d882]/40 font-bold hover:bg-[#122819] transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer rounded-sm"
                    >
                      Start Screening &nbsp;→
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById('interactive-dashboard-anch');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-8 py-3.5 border border-white/20 bg-white/5 backdrop-blur-xs text-white font-semibold hover:bg-white/10 transition cursor-pointer rounded-sm"
                    >
                      Interact with Interactivity Space
                    </button>
                  </div>
                </div>
              </section>

              {/* ANCHOR TO INTERACTIVE SPACE */}
              <div id="interactive-dashboard-anch" />

              {/* STUNNING PREMIUM NEW INTERACTIVE BENTO GRID DASHBOARD */}
              <section className="bg-[#f3f6f2] py-16 px-4 md:px-8 border-t border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#1b3a24] font-mono">MindCenter Suite</span>
                    <h2 className="text-3xl font-semibold text-[#161711] tracking-tight mt-1">Live Interactivity space</h2>
                    <p className="text-sm text-gray-600 mt-2">Grow your Mind tree, Engage in mindful breathing exercises or Experiment heuristic scoring.</p>
                  </div>

                  {/* BENTO LAYOUT */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* COLUMN 1: Daily Check-In & Mind Tree (Interwoven) */}
                    <div className="bg-white p-8 border border-gray-200/85 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#161711]">Mind Tree & Emotion</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#e2f3d6] text-[#2d5016]">
                            Stage {mindTreeGrowth}/5
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                          Your botanical garden grows as you complete check-ins, focus exercises and slow breathing patterns. Stay consistent with your routines to let your tree blossom beautifully!
                        </p>

                        <div className="my-2 bg-[#fafdf9]/75 border border-dashed border-[#c6e7af] py-2 rounded-sm relative">
                          <MindTreeVisual growth={mindTreeGrowth} />
                          {treeNurturedMessage && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              className="absolute top-2 left-0 right-0 text-center bg-[#1b3a24] text-white text-[10px] py-1 px-2 mx-6 font-semibold shadow-md rounded-xs z-20"
                            >
                              {treeNurturedMessage}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-500 font-extrabold mb-3">
                          Present Feeling check-In
                        </label>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {[
                            { code: 'calm', icon: '🌿', label: 'Calm' },
                            { code: 'anxious', icon: '⚡', label: 'Tense' },
                            { code: 'stressed', icon: '🔥', label: 'Agitated' },
                            { code: 'depressed', icon: '🌧️', label: 'Heavy' },
                            { code: 'stable', icon: '🧠', label: 'Focus' }
                          ].map((m) => (
                            <button
                              key={m.code}
                              onClick={() => {
                                setMoodCheckIn(m.code);
                                setMindTreeGrowth((g) => Math.min(5, g + 1));
                                setTreeNurturedMessage(`Vibrated to ${m.label}! Your garden botanical grows!`);
                                setTimeout(() => setTreeNurturedMessage(''), 3000);
                              }}
                              className={`p-2 border transition rounded-sm text-center ${
                                moodCheckIn === m.code 
                                  ? 'bg-[#e2f3d6] border-[#4a7c24] text-[#1a3a08] scale-105 shadow-sm' 
                                  : 'border-gray-200 bg-white hover:bg-gray-50'
                              }`}
                              title={m.label}
                            >
                              <div className="text-xl mb-0.5">{m.icon}</div>
                              <div className="text-[9px] font-mono leading-none">{m.label}</div>
                            </button>
                          ))}
                        </div>

                        {/* Interactive reaction explanation */}
                        <AnimatePresence mode="wait">
                          {moodCheckIn && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="p-3 bg-[#f4faf0] border border-[#c6e7af] text-xs text-[#2d5016] leading-normal"
                            >
                              {moodCheckIn === 'calm' && "🌸 Calm state recorded. Optimal for mental synthesis and creativity. Enjoy the stable wave."}
                              {moodCheckIn === 'anxious' && "⚠️ Situational anxiety/tension detected. Try our guided vagus breath tool on the right to down-regulate your autonomic heart rate."}
                              {moodCheckIn === 'stressed' && "🔥 High psychophysiological demand detected. Set clear micro-boundaries. Pause non-essential tasks right now."}
                              {moodCheckIn === 'depressed' && "🌧️ Low motivation or flat mood detected. Be exceptionally gentle with yourself. Take one very tiny step."}
                              {moodCheckIn === 'stable' && "🧠 Active cognitive focus aligned. Enjoy this clarity. Tackle your primary high-priority task."}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button 
                          onClick={() => {
                            setMindTreeGrowth((g) => Math.min(5, g + 1));
                            setTreeNurturedMessage("🌱 planted a new seedling! Watch it bloom!");
                            setTimeout(() => setTreeNurturedMessage(''), 3000);
                          }}
                          className="w-full text-center py-2.5 mt-4 bg-gray-50 border border-gray-200 hover:bg-[#f4faf0] hover:border-[#a4d882] transition font-mono text-[10px] font-bold text-gray-700 hover:text-[#1a3a08] tracking-widest uppercase cursor-pointer"
                        >
                          Nurture Garden Plot
                        </button>
                      </div>

                    </div>

                    {/* COLUMN 2: Guided Vagus Breath Harmonizer (Synthesized Sound and breathing coach) */}
                    <div className="bg-white p-8 border border-gray-200/85 shadow-xs flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#161711] mb-2">Focus Breathing</h3>
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                          Relax your body with a simple rhythm: inhale for 4 seconds, hold for 4 seconds and exhale slowly for 6 seconds. You can also play solfeggio tones to deepen focus and relaxation.
                        </p>

                        <div className="flex flex-col items-center justify-center py-6 bg-gray-50 border border-gray-100 rounded-sm mb-4 relative overflow-hidden">
                          {/* Pulsing breathing bubble visual */}
                          <motion.div 
                            animate={{
                              scale: breathingCycle === 'inhale' ? 1.6 : 
                                     breathingCycle === 'hold' ? 1.6 :
                                     breathingCycle === 'exhale' ? 0.95 : 1.0,
                              backgroundColor: breathingCycle === 'inhale' ? 'rgba(164, 216, 130, 0.35)' :
                                               breathingCycle === 'hold' ? 'rgba(92, 154, 46, 0.45)' :
                                               breathingCycle === 'exhale' ? 'rgba(226, 243, 214, 0.4)' : 'rgba(241, 242, 236, 1)'
                            }}
                            transition={{ duration: breathingCycle === 'inhale' ? 4 : breathingCycle === 'exhale' ? 6 : 1, ease: "easeInOut" }}
                            className="w-28 h-28 rounded-full flex flex-col items-center justify-center border border-[#c6e7af] relative z-10"
                          >
                            <span className="text-xs font-mono font-extrabold uppercase text-[#2d5016]">
                              {breathingActive ? breathingCycle : 'READY'}
                            </span>
                            <span className="text-xl font-extrabold text-[#161711] mt-1">
                              {breathingActive ? `${breathingCount}s` : '0'}
                            </span>
                          </motion.div>

                          {/* HRV Simulated Line */}
                          {breathingActive && (
                            <div className="mt-4 text-center">
                              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                HRV BIOMODULATOR ACTIVE • SIMULATED HR: {breathingCycle === 'exhale' ? '68 bpm' : '76 bpm'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Tone settings */}
                        <div className="p-3 bg-gray-50 border border-gray-200 mt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-bold text-gray-600">Solfeggio Frequency</span>
                            <button
                              onClick={() => setAudioPlaying(!audioPlaying)}
                              className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs ${
                                audioPlaying 
                                  ? 'bg-[#dc2626] text-white' 
                                  : 'bg-[#1b3a24] text-white'
                              }`}
                            >
                              {audioPlaying ? 'Mute Tone' : 'Play Tone'}
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: '528', label: '528 Hz', desc: 'Sol' },
                              { id: '432', label: '432 Hz', desc: 'Zen' },
                              { id: 'alpha', label: 'Alpha', desc: 'Carrier' }
                            ].map((tone) => (
                              <button
                                key={tone.id}
                                onClick={() => {
                                  setAudioTone(tone.id as any);
                                  if (!audioPlaying) setAudioPlaying(true);
                                }}
                                className={`py-1.5 border text-center transition ${
                                  audioTone === tone.id 
                                    ? 'bg-[#e2f3d6] border-[#4a7c24] text-[#1a3a08] font-bold' 
                                    : 'border-gray-200 bg-white text-gray-600'
                                }`}
                              >
                                <div className="text-[10px] font-bold">{tone.label}</div>
                                <div className="text-[8px] opacity-60 font-mono italic">{tone.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setBreathingActive(!breathingActive)}
                        className={`w-full py-3 mt-4 font-semibold transition text-sm cursor-pointer ${
                          breathingActive 
                            ? 'bg-[#dc2626] hover:bg-red-700 text-white' 
                            : 'bg-[#1b3a24] hover:bg-[#122819] text-white'
                        }`}
                      >
                        {breathingActive ? 'Stop Breathing Pacer' : 'Initiate Guided Vagus Breathing'}
                      </button>
                    </div>

                    {/* COLUMN 3: Intelligent Clinical Heuristics Simulator */}
                    <div className="bg-white p-8 border border-gray-200/85 shadow-xs flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#161711] mb-2">Heuristic Simulator</h3>
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                          Adjust the sliders below to see how our diagnostic algorithms classify severity levels and priority alerts in real time.
                        </p>

                        <div className="space-y-4 font-mono">
                          
                          {/* Depression Simulator Slider */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-bold uppercase text-[10px]">depression Score DASS</span>
                              <span className="font-extrabold text-[#1a3a08]">{simDepression * 2}</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="21" 
                              value={simDepression} 
                              onChange={(e) => setSimDepression(parseInt(e.target.value))}
                              className="w-full accent-[#4a7c24]"
                            />
                            <div className="flex justify-between text-[8px] text-gray-405 mt-0.5">
                              <span>0 (No indicators)</span>
                              <span>42 (Max)</span>
                            </div>
                          </div>

                          {/* Anxiety Slider */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-bold uppercase text-[10px]">anxiety Score DASS</span>
                              <span className="font-extrabold text-[#7a5200]">{simAnxiety * 2}</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="21" 
                              value={simAnxiety} 
                              onChange={(e) => setSimAnxiety(parseInt(e.target.value))}
                              className="w-full accent-[#7a5200]"
                            />
                          </div>

                          {/* Stress Slider */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-bold uppercase text-[10px]">stress Score DASS</span>
                              <span className="font-extrabold text-[#e67e22]">{simStress * 2}</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="21" 
                              value={simStress} 
                              onChange={(e) => setSimStress(parseInt(e.target.value))}
                              className="w-full accent-[#e67e22]"
                            />
                          </div>

                          {/* Bipolar */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-bold uppercase text-[10px]">Bipolar (MDQ count)</span>
                              <span className="font-extrabold text-blue-800">{simBipolar}/7</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="7" 
                              value={simBipolar} 
                              onChange={(e) => setSimBipolar(parseInt(e.target.value))}
                              className="w-full accent-blue-700"
                            />
                          </div>

                          {/* Schizophrenia */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-bold uppercase text-[10px]">psychosis symptoms</span>
                              <span className="font-extrabold text-[#533ab7]">{simSchizo}/5</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="5" 
                              value={simSchizo} 
                              onChange={(e) => setSimSchizo(parseInt(e.target.value))}
                              className="w-full accent-[#533ab7]"
                            />
                          </div>

                        </div>
                      </div>

                      {/* Diagnostic outcomes summary */}
                      <div className="mt-6 pt-6 border-t border-gray-100 italic bg-[#fbfdfb] p-4 text-xs">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-mono text-[10px] text-gray-500 font-extrabold uppercase">CALCULATED THRESHOLD</span>
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4a7c24]"></span>
                        </div>
                        <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Depression Status:</span>
                            <span className="font-bold">{simResult.depression.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Anxiety Status:</span>
                            <span className="font-bold">{simResult.anxiety.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Stress Status:</span>
                            <span className="font-bold">{simResult.stress.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Bipolar Screen:</span>
                            <span className="font-bold">{simResult.bipolar.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Psychosis Risk:</span>
                            <span className="font-bold text-rose-800">{simResult.schizophrenia.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Steps overview */}
              <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-green-600">The Assessment Pipeline</span>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">Four Modules Leading to Your Results  </h2>
                  <p className="text-sm text-gray-500 mt-2">The system calculates DASS‑21, MDQ and other clinical indices directly from the scored items. Background and lifestyle information is collected separately so it can be added to a printable report, giving doctors extra context during follow‑up assessments.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white border border-gray-200/80 shadow-md">
                  {[
                    { num: '01', title: 'Background Profile', desc: 'Demographic information is collected to be included in the printed report, giving clinicians useful context when reviewing the results.' },
                    { num: '02', title: 'Physical and Lifestyle', desc: 'Details about health and daily routines are documented to provide additional perspective on mental health well‑being.' },
                    { num: '03', title: 'Trauma & Safety Baseline', desc: 'Information on immediate risks, sleep quality and activity patterns is gathered to support clinical evaluation.' },
                    { num: '04', title: '33 Clinical Scored Items', desc: 'Validated questions are scored to generate the final results.' },
                  ].map((step, idx) => (
                    <div key={idx} className="p-8 border-b md:border-b-0 md:border-r last:border-r-0 border-gray-200 hover:bg-gray-50/50 transition duration-150">
                      <span className="font-mono text-xs font-extrabold text-[#4a7c24] tracking-wide uppercase block mb-2">Step {step.num}</span>
                      <h3 className="text-md font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conditions breakdown teaser */}
              <section className="bg-gray-100 py-16 border-t border-b border-gray-200/85">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#1b3a24] font-mono">Screening Spectrum</span>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">Diagnostic Reference Modules</h2>
                    <p className="text-sm text-gray-500 mt-2">MindCheck combines several diagnostic tools to create a structured overview of results.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {[
                      { icon: '🌧️', name: 'Depression Scale', desc: 'Assesses anhedonia, persistent low mood, dysphoria and reduced energy, based on Lovibond (1995).' },
                      { icon: '🌱', name: 'Anxiety Spectrum', desc: 'Evaluates excessive worry, physiological tension and heightened autonomic arousal.' },
                      { icon: '🫂', name: 'Stress Index', desc: 'Measures increased nervous activity, frustration, irritability and hyper‑arousal.' },
                      { icon: '🔄', name: 'Bipolar Screen', desc: 'Examines mood fluctuation patterns, identifying hypomanic and manic episodes using MDQ metrics.' },
                      { icon: '🧩', name: 'Subtle Psychosis', desc: 'Monitors early warning signs such as mild hallucinations, perceptual disturbances or speech irregularities.' },
                    ].map((cond, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveTab('conditions')}
                        className="bg-white p-6 border border-gray-200 hover:shadow-lg transition duration-200 cursor-pointer flex flex-col justify-between group relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-green-600 opacity-0 group-hover:opacity-100 transition duration-200" />
                        <div>
                          <span className="text-3xl mb-4 block">{cond.icon}</span>
                          <h3 className="text-md font-bold text-gray-900 mb-2 group-hover:text-green-700 transition">{cond.name}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{cond.desc}</p>
                        </div>
                        <span className="text-green-600 text-xs font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition duration-150">
                          View details <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Expert system disclaimer */}
              <section className="max-w-4xl mx-auto py-12 px-4">
                <div className="border border-blue-200 bg-blue-50/50 p-6 flex gap-4">
                  <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-blue-900 uppercase">⚠️ Disclaimer ⚠️</h4>
                    <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                      MindCheck uses heuristic logic to estimate potential risk profiles. This tool is for education and self‑awareness only and is not a substitute for professional diagnosis or consultation.
                    </p>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ==================== SCREENING WIZARD ==================== */}
          {activeTab === 'screening' && (
            <motion.div
              key="screening"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 py-12"
            >
              
              {/* Active Validation errors display warning banner */}
              {validationErrors.length > 0 && (
                <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 uppercase tracking-wide text-xs font-mono font-bold flex gap-3 items-start animate-bounce">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-extrabold underline mb-1">Missing Compulsory Information:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {validationErrors.map((err, i) => (
                        <li key={i} className="normal-case font-sans font-medium">{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Progress bar tracking the form screens */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  <span>Progress Context</span>
                  <span className="font-bold text-gray-800">
                    {screenStep === 0 && 'Module 0: Consent'}
                    {screenStep === 1 && 'Module 1: Background Profile'}
                    {screenStep === 2 && 'Module 2: Physical & Lifestyle'}
                    {screenStep === 3 && 'Module 3: Safety Baseline'}
                    {screenStep === 4 && `Module 4: Cognitive Questionnaire (${questionIndex + 1}/${KB_QUESTIONS.length})`}
                    {screenStep === 5 && 'Module 5: Diagnostic Summary'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-none overflow-hidden">
                  <div 
                    className="bg-green-600 h-full transition-all duration-300"
                    style={{ 
                      width: `${
                        screenStep === 0 ? 5 :
                        screenStep === 1 ? 25 :
                        screenStep === 2 ? 45 :
                        screenStep === 3 ? 65 :
                        screenStep === 4 ? 65 + ((questionIndex) / KB_QUESTIONS.length) * 30 : 100
                      }%` 
                    }}
                  />
                </div>
              </div>

              {/* STEP 0: Welcome & Consent screen */}
              {screenStep === 0 && (
                <div className="bg-white border border-gray-200 p-8 shadow-md">
                  <div className="text-center max-w-xl mx-auto mb-8">
                    <MindCheckLogo 
                      className="mx-auto h-16 w-16 mb-4 object-contain text-emerald-700" 
                      size={64}
                    />
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Begin Personal Risk Assessment</h2>
                    <p className="text-sm text-gray-500 mt-2">MindCheck evaluates clinical measures for Stress, Anxiety, Depression, Bipolarity and Psychosis.</p>
                  </div>

                  <div className="space-y-4 max-w-2xl mx-auto mb-8">
                    <div className="border-l-4 border-green-600 bg-green-50/50 p-4 text-xs text-green-800 leading-relaxed">
                      <strong>Privacy Guarantee:</strong> This application runs entirely within your browser. Your responses, history and physical indicators remain temporary — they are not stored, uploaded or shared with any external database.
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto border-t border-gray-200 pt-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="mt-1 h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500 focus:ring-1 accent-green-600"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed select-none group-hover:text-gray-900 transition">
                        I understand that MindCheck screens for clinical symptoms using academically validated research papers. I acknowledge that this process is not equivalent to a professional diagnostic evaluation and I consent to continue with this local screening. My background details are treated as confidential.
                      </span>
                    </label>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => {
                          if (!consentGiven) {
                            alert('You must review and accept the consent check block to begin the screening.');
                            return;
                          }
                          setScreenStep(1);
                        }}
                        disabled={!consentGiven}
                        className={`px-8 py-3 font-semibold transition ${
                          consentGiven 
                            ? 'bg-green-700 text-white hover:bg-green-800 cursor-pointer' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Begin Assessment Pipeline &nbsp;→
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Background Profile (COMPULSORY FIELDS) */}
              {screenStep === 1 && (
                <div className="bg-white border border-gray-200 p-8 shadow-md">
                  <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Background Profile</h2>
                    <p className="text-xs text-gray-500">All fields must be completed unless specifically marked as optional.</p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Optional Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-600 font-extrabold mb-1">
                          Name <span className="text-xs font-normal text-gray-400 lowercase italic">(optional)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g., Ali or Sarah"
                          value={formData.name}
                          onChange={(e) => handleDemographicChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 focus:border-green-600 focus:outline-hidden text-sm"
                        />
                      </div>
                      
                      {/* Compulsory Age */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Age Range <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.age}
                          onChange={(e) => handleDemographicChange('age', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Age range --</option>
                          <option value="Below 18">Below 18</option>
                          <option value="18–24">18–24</option>
                          <option value="25–34">25–34</option>
                          <option value="35–44">35–44</option>
                          <option value="45–54">45–54</option>
                          <option value="55+">55 or older</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Compulsory Gender */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Gender <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleDemographicChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Gender --</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      {/* Compulsory Marital Status */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Marital Status <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.maritalStatus}
                          onChange={(e) => handleDemographicChange('maritalStatus', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Marital status --</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Compulsory Education Level */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Education Level <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.education}
                          onChange={(e) => handleDemographicChange('education', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Education level --</option>
                          <option value="Primary school">Primary school</option>
                          <option value="Secondary school">Secondary school</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>

                      {/* Compulsory Occupation */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Occupation <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.occupation}
                          onChange={(e) => handleDemographicChange('occupation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Occupation --</option>
                          <option value="Student">Student</option>
                          <option value="Professional">Professional (Employed)</option>
                          <option value="Self-employed">Self-employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Pre-existing Diagnoses status compulsory */}
                    <div className="border-t border-gray-100 pt-6">
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-600 font-extrabold mb-2">
                        Have you ever been professionally diagnosed with a mental health condition? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Yes', 'No', 'Not sure'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleDemographicChange('prevDiagnosis', option)}
                            className={`px-4 py-2 text-xs font-semibold border transition ${
                              formData.prevDiagnosis === option
                                ? 'bg-green-700 text-white border-green-700'
                                : 'bg-white text-gray-700 hover:bg-gray-150 border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Optional Which Specific Conditions (only shown if previous response is YES) */}
                    <AnimatePresence>
                      {formData.prevDiagnosis === 'Yes' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden bg-gray-50 p-4 border border-gray-200"
                        >
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Diagnosed Condition Profile <span className="text-xs font-normal text-gray-500 italic">(optional - select all that apply)</span>
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {['Depression', 'Anxiety', 'Bipolar', 'OCD', 'Schizophrenia', 'Other'].map((cond) => {
                              const isChecked = formData.prevConditions.includes(cond);
                              return (
                                <button
                                  key={cond}
                                  type="button"
                                  onClick={() => toggleMultiSelect('prevConditions', cond)}
                                  className={`px-3 py-1.5 text-xs font-medium border transition ${
                                    isChecked
                                      ? 'bg-green-600 text-white border-green-600'
                                      : 'bg-white text-gray-600 border-gray-305 hover:bg-gray-100'
                                  }`}
                                >
                                  {cond}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Compulsory Active clinical care details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Currently attending therapy? <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.inTherapy}
                          onChange={(e) => handleDemographicChange('inTherapy', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Response --</option>
                          <option value="Yes">Yes, regularly</option>
                          <option value="No">No, not currently</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Currently taking psychiatric medication? <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.onPsychMed}
                          onChange={(e) => handleDemographicChange('onPsychMed', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Response --</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={() => setScreenStep(0)}
                      className="px-6 py-2.5 text-sm font-semibold border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer text-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" /> Exit
                    </button>
                    <button
                      onClick={handleValidateStep1}
                      className="px-8 py-2.5 text-sm font-bold bg-green-700 text-white hover:bg-green-800 flex items-center gap-1 cursor-pointer"
                    >
                      Continue Step &nbsp;<ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Physical Health & Lifestyle */}
              {screenStep === 2 && (
                <div className="bg-white border border-gray-200 p-8 shadow-md">
                  <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Physical Health & Lifestyle profile</h2>
                    <p className="text-xs text-gray-500">Physical health indicators are closely connected to mental health well‑being. All required fields must be completed unless specifically marked as optional.</p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Compulsory select chronic illness */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-600 font-extrabold mb-2">
                        Are you diagnosed with any chronic physical illnesses? <span className="text-red-500 font-bold">*</span>
                        <span className="block text-[10px] font-sans text-gray-400 font-normal lowercase mt-0.5">(Compulsory - select at least one; choose "None" if not applicable)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Diabetes', 'Heart condition', 'Chronic pain', 'Thyroid issues', 'None', 'Other'].map((illness) => {
                          const isChecked = formData.chronicIllness.includes(illness);
                          return (
                            <button
                              key={illness}
                              type="button"
                              onClick={() => {
                                // If "None" is pressed, deselect all other entries and toggle None.
                                if (illness === 'None') {
                                  handleDemographicChange('chronicIllness', ['None']);
                                } else {
                                  // Remove None if other elements are toggled
                                  setFormData((prev) => {
                                    const filtered = prev.chronicIllness.filter((item) => item !== 'None');
                                    const updated = filtered.includes(illness)
                                      ? filtered.filter((item) => item !== illness)
                                      : [...filtered, illness];
                                    return { ...prev, chronicIllness: updated };
                                  });
                                }
                              }}
                              className={`px-4 py-2 text-xs font-semibold border transition ${
                                isChecked
                                  ? 'bg-green-700 text-white border-green-700'
                                  : 'bg-white text-gray-700 hover:bg-gray-150 border-gray-300'
                              }`}
                            >
                              {illness}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional prescriptions */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                        Current non-psychiatric prescription medications <span className="text-xs font-normal text-gray-400 lowercase italic">(optional)</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., Metformin, Lisinopril, Thyroxine or leave blank"
                        value={formData.rxMeds}
                        onChange={(e) => handleDemographicChange('rxMeds', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 focus:border-green-600 focus:outline-hidden text-sm"
                      />
                    </div>

                    {/* Toggle family history */}
                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 leading-none">Family History status</h4>
                          <p className="text-xs text-gray-400 mt-1">Is there a diagnosed mental history in your direct family (parents, siblings)?</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.famHistory}
                            onChange={(e) => handleDemographicChange('famHistory', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <AnimatePresence>
                        {formData.famHistory && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 bg-gray-50 border border-gray-200 p-4 overflow-hidden"
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Select all conditions prevalent in your family:
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {['Depression', 'Anxiety', 'Schizophrenia', 'Bipolar', 'Substance use'].map((item) => {
                                const isChecked = formData.famConditions.includes(item);
                                return (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleMultiSelect('famConditions', item)}
                                    className={`px-3 py-1.5 text-xs font-medium border transition ${
                                      isChecked
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-white text-gray-600 border-gray-305 hover:bg-gray-100'
                                    }`}
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Alcohol and Drug usage toggles */}
                    <div className="border-t border-gray-100 pt-6 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 leading-none">Regular Alcohol Use</h4>
                          <p className="text-xs text-gray-400 mt-1">Consume alcohol regularly (e.g. more than 3 times per week)?</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.alcoholUse}
                            onChange={(e) => handleDemographicChange('alcoholUse', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="flex items-start justify-between gap-4 border-t border-gray-50 pt-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 leading-none">Recreational Substance Use</h4>
                          <p className="text-xs text-gray-400 mt-1">Optional. Aids the dynamic expert assessment model in calculating risks.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={formData.recreationalUse}
                            onChange={(e) => handleDemographicChange('recreationalUse', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                    </div>

                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={() => setScreenStep(1)}
                      className="px-6 py-2.5 text-sm font-semibold border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer text-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back step
                    </button>
                    <button
                      onClick={handleValidateStep2}
                      className="px-8 py-2.5 text-sm font-bold bg-green-700 text-white hover:bg-green-800 flex items-center gap-1 cursor-pointer"
                    >
                      Continue Step &nbsp;<ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Safety & Daily Baseline */}
              {screenStep === 3 && (
                <div className="bg-white border border-gray-200 p-8 shadow-md">
                  <div className="border-b border-gray-200 pb-5 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Trauma & Safety Baseline</h2>
                    <p className="text-xs text-gray-500">Fields marked with a red asterisk (*) are mandatory and must be completed.</p>
                  </div>

                  <div className="space-y-6">

                    {/* Compulsory traumatic history */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-600 font-extrabold mb-2">
                        Have you experienced significant traumatic life events? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Yes', 'No', 'Prefer not to say'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleDemographicChange('traumaticEvents', option)}
                            className={`px-4 py-2 text-xs font-semibold border transition ${
                              formData.traumaticEvents === option
                                ? 'bg-green-700 text-white border-green-700'
                                : 'bg-white text-gray-700 hover:bg-gray-150 border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compulsory suicidal/harm thought metrics */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-600 font-extrabold mb-2">
                        Have you had thoughts of self-harm or suicide in the past month? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Yes', 'No', 'Prefer not to say'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleDemographicChange('selfHarmThoughts', option)}
                            className={`px-4 py-2 text-xs font-semibold border transition ${
                              formData.selfHarmThoughts === option
                                ? 'border-red-600 bg-red-650 text-red-700' // Distinct highlight code
                                : 'bg-white text-gray-700 hover:bg-gray-150 border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {/* Display inline safety alert if suicidal thoughts is flagged */}
                      {formData.selfHarmThoughts === 'Yes' && (
                        <div className="mt-3 p-4 border-l-4 border-red-600 bg-red-50 flex gap-3 text-xs text-red-800 leading-relaxed">
                          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
                          <div>
                            <strong className="block text-sm font-bold text-red-900 mb-0.5">Please Read — Crisis Support Immediately Available:</strong>
                            You are not alone. There are compassionate human operators ready to support you 24/7. Call Befrienders KL immediately at <a href="tel:0376272929" className="font-bold underline text-red-950">03-76272929</a> or MIASA helpline at <a href="tel:1800820066" className="font-bold underline text-red-950">1800-82-0066</a>.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sleep and activity dropdowns (COMPULSORY) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Average sleep per night <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.sleepHours}
                          onChange={(e) => handleDemographicChange('sleepHours', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Average sleep --</option>
                          <option value="Less than 4 hours">Less than 4 hours</option>
                          <option value="4–5 hours">4–5 hours</option>
                          <option value="6–7 hours">6–7 hours</option>
                          <option value="7–8 hours">7–8 hours</option>
                          <option value="More than 8 hours">More than 8 hours</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                          Physical activity level <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={formData.activityLevel}
                          onChange={(e) => handleDemographicChange('activityLevel', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white focus:border-green-600 focus:outline-hidden text-sm"
                        >
                          <option value="">-- Select Activity level --</option>
                          <option value="Sedentary">Sedentary (Rarely exercise)</option>
                          <option value="Light (1–2x/week)">Light (1–2 times/week)</option>
                          <option value="Moderate (3–4x/week)">Moderate (3–4 times/week)</option>
                          <option value="Active (daily)">Active (Daily exercise)</option>
                        </select>
                      </div>
                    </div>

                    {/* Optional additional text area notes */}
                    <div className="border-t border-gray-100 pt-6">
                      <label className="block text-xs font-mono uppercase tracking-wide text-gray-650 font-extrabold mb-1">
                        Any other lifecycle observations to report? <span className="text-xs font-normal text-gray-400 lowercase italic">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g., undergoing major career pivot, recent loss, high-tension workspace..."
                        value={formData.additionalNotes}
                        onChange={(e) => handleDemographicChange('additionalNotes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 focus:border-green-600 focus:outline-hidden text-sm"
                      />
                    </div>

                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={() => setScreenStep(2)}
                      className="px-6 py-2.5 text-sm font-semibold border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer text-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back step
                    </button>
                    <button
                      onClick={handleValidateStep3}
                      className="px-8 py-2.5 text-sm font-bold bg-green-700 text-white hover:bg-green-800 flex items-center gap-1 cursor-pointer"
                    >
                      Start Questionnaire &nbsp;<ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Active Questionnaire Section */}
              {screenStep === 4 && (() => {
                const q = KB_QUESTIONS[questionIndex];
                const isDASS = ['stress', 'anxiety', 'depression'].includes(q.domain);
                const opts = isDASS ? KB_OPTS_DASS : KB_OPTS_FREQ;
                
                // Color coordination tokens
                const domainThemes: Record<string, { bg: string; text: string; label: string }> = {
                  stress: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-850', label: 'Stress Scale' },
                  anxiety: { bg: 'bg-yellow-50 border-yellow-250', text: 'text-yellow-850', label: 'Anxiety Scale' },
                  depression: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-850', label: 'Depression Scale' },
                  bipolar: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-850', label: 'Bipolar Screen' },
                  schizophrenia: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-850', label: 'Psychosis Screen' },
                };
                const theme = domainThemes[q.domain] || { bg: 'bg-gray-50', text: 'text-gray-800', label: 'Screen' };

                return (
                  <div className="bg-white border border-gray-200 shadow-md overflow-hidden">
                    <div className="p-8 border-b border-gray-250 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-3 py-1 text-xs font-mono font-extrabold uppercase tracking-wide border ${theme.bg} ${theme.text}`}>
                          {theme.label}
                        </span>
                        <span className="text-xs font-mono text-gray-500 font-bold">
                          Item {questionIndex + 1} of {KB_QUESTIONS.length}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed font-sans">
                        {q.text}
                      </h3>
                    </div>

                    <div className="p-8 space-y-3">
                      {opts.map((o) => {
                        const isSelected = answers[q.id] === o.val;
                        return (
                          <button
                            key={o.val}
                            onClick={() => handleSelectOption(q.id, o.val)}
                            className={`w-full p-4 text-left border flex items-center justify-between transition group cursor-pointer ${
                              isSelected
                                ? 'bg-green-50 border-green-600 shadow-xs'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`text-sm ${isSelected ? 'text-green-905 font-bold' : 'text-gray-700'}`}>
                              {o.label}
                            </span>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-green-600 bg-green-600' : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-between items-center">
                      <button
                        onClick={handlePrevQuestion}
                        className="px-6 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        className="px-8 py-2.5 text-sm font-bold bg-green-700 text-white hover:bg-green-800 flex items-center gap-1 cursor-pointer"
                      >
                        {questionIndex === KB_QUESTIONS.length - 1 ? 'Compute Results' : 'Next Question'} &nbsp;
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 5: Final high fidelity results screen */}
              {screenStep === 5 && screeningResult && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* HERO BANNER SECTION */}
                  <div className="bg-green-800 text-white p-8 border border-green-900 shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-green-220 block mb-2">
                          Evaluated Diagnostic Risk Summary
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{screeningResult.primary.icon}</span>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            {screeningResult.primary.name}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-100 mt-2 max-w-xl italic">
                          Hi {formData.name || 'Value Patient'}, based on current scoring parameters, your primary evaluated domain risk classification index is labeled above.
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center bg-white/10 border border-white/20 p-4 shrink-0 min-w-[160px] text-center">
                        <span className="text-xs font-mono uppercase tracking-wider text-green-100 font-bold mb-1">Risk Severity</span>
                        <div className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-1">
                          {screeningResult.primary.label}
                        </div>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 font-mono">
                          Index Score: {screeningResult.primary.score}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Crisis Intervention Alert Box */}
                  {screeningResult.isCrisis && (
                    <div className="p-6 border border-red-300 bg-red-50 flex gap-4 text-sm leading-relaxed text-red-800">
                      <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <h4 className="text-md font-bold text-red-900 mb-1">Professional Consult Advised Only</h4>
                        <p className="mb-3">
                          Your responses suggest a serious concern. We strongly encourage you to speak with a therapist or reach out to supportive hotlines in Malaysia right away. All information remains fully confidential.
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs font-bold font-mono">
                          <a href="tel:0376272929" className="bg-red-705 text-white px-3 py-1.5 hover:bg-red-600 transition">Befrienders KL: 03-7627 2929</a>
                          <a href="tel:1800820066" className="bg-red-705 text-white px-3 py-1.5 hover:bg-red-600 transition">MIASA Helpline: 1800 82 0066</a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCORES AND METRICS BREAKDOWN GRID */}
                  <div className="bg-white border border-gray-200 p-8 shadow-md">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-green-600 mb-4 block">
                      Mental health domain severity profile
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {screeningResult.breakdown.map((item, idx) => {
                        const isPrimary = item.name === screeningResult.primary.name;
                        return (
                          <div 
                            key={idx} 
                            className={`p-4 border flex flex-col justify-between transition duration-150 ${
                              isPrimary 
                                ? 'border-green-600 bg-green-50/20 ring-1 ring-green-600/30' 
                                : 'border-gray-200'
                            }`}
                          >
                            <div>
                              <span className="text-2xl mb-1.5 block">{item.icon}</span>
                              <h4 className="text-xs font-bold text-gray-800 mb-2">{item.name}</h4>
                            </div>
                            <div>
                              <span className={`inline-block px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide mb-1 ${item.css}`}>
                                {item.label}
                              </span>
                              {['Depression', 'Anxiety', 'Stress'].includes(item.name) && (
                                <div className="text-[10px] font-mono text-gray-500 font-medium">
                                  Raw Score × 2: {item.score}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CLINICAL COPING STRATEGIES — only shown when there's an actual concern to address */}
                  {screeningResult.coping.length > 0 && (
                    <div className="bg-white border border-gray-200 p-8 shadow-md">
                      <div className="border-b border-gray-100 pb-3 mb-4">
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-green-600 block">
                          Recommended Coping Actions
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {screeningResult.coping.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-3 items-start leading-relaxed bg-gray-50/50 p-3 border border-gray-150">
                            <CornerDownRight className="h-4 w-4 text-green-600 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ACTION GRID NAVIGATION */}
                  <div className="bg-white border border-gray-250 p-8 shadow-sm">
                    <h4 className="text-xs font-extrabold font-mono uppercase tracking-wider text-gray-500 mb-4 block">
                      Next Actions Index
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      <button
                        onClick={() => setActiveTab('resources')}
                        className="p-4 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <PhoneCall className="h-6 w-6 text-green-600" />
                        <span className="text-xs font-bold text-gray-900 block leading-none">Find Support</span>
                        <span className="text-[10px] text-gray-400">Direct directory links</span>
                      </button>

                      <button
                        onClick={() => {
                          setChatOpen(true);
                          triggerChatBot(`Coping strategies for ${screeningResult.primary.name}`);
                        }}
                        className="p-4 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="h-6 w-6 text-green-600" />
                        <span className="text-xs font-bold text-gray-900 block leading-none">Ask MindBot</span>
                        <span className="text-[10px] text-gray-400">AI chat interaction</span>
                      </button>

                      <button
                        onClick={handleExportPDF}
                        className="p-4 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="h-6 w-6 text-green-600" />
                        <span className="text-xs font-bold text-gray-900 block leading-none">Export Record</span>
                        <span className="text-[10px] text-gray-400">Download full PDF report</span>
                      </button>

                      <button
                        onClick={resetScreening}
                        className="p-4 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <RefreshCw className="h-6 w-6 text-green-600" />
                        <span className="text-xs font-bold text-gray-900 block leading-none">Retake Screen</span>
                        <span className="text-[10px] text-gray-400">Reset inputs and begin again</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* ==================== CONDITIONS LIBRARY ==================== */}
          {activeTab === 'conditions' && (
            <motion.div
              key="conditions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 py-12"
            >
              <div className="border-b border-gray-200 pb-5 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Expert Conditions Library  </h1>
                <p className="text-sm text-gray-500 mt-2">Browse the reference data embedded within the MindCheck knowledge base for expert‑guided insights.</p>
              </div>

              <div className="space-y-8">
                {Object.values(KB_CONDITIONS).map((cond, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 p-8 shadow-md flex flex-col md:flex-row gap-8 relative items-start"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-green-600" />
                    
                    {/* Left Column - Meta */}
                    <div className="md:w-1/3 shrink-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{cond.icon}</span>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{cond.name}</h2>
                      </div>
                      <div className="p-3 bg-gray-50 text-[10px] text-gray-500 font-mono border border-gray-200 space-y-1 rounded-xs">
                        <div><strong>Instrument:</strong> {cond.tool}</div>
                        {cond.reference && (
                          <div className="truncate">
                            <strong>Reference link:</strong>{' '}
                            <a 
                              href={Array.isArray(cond.reference) ? cond.reference[0] : cond.reference}
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-green-600 underline"
                            >
                              Clinical details
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - content details */}
                    <div className="flex-grow space-y-4 text-sm text-gray-700">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wide text-gray-400 font-black mb-1">Clinical Definition</h4>
                        <p className="leading-relaxed text-gray-800">{cond.definition}</p>
                      </div>

                      <div className="bg-gray-50 p-4 border border-gray-150">
                        <h4 className="text-xs font-mono uppercase tracking-wide text-gray-500 font-black mb-1.5">DSM-5 Diagnostic Parameters</h4>
                        <p className="text-xs text-gray-600 italic leading-relaxed">{cond.dsmNote}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wide text-gray-400 font-black mb-1.5">Covered Symptoms Profile</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-600">
                          {cond.symptoms.map((sym, si) => (
                            <div key={si} className="flex gap-2 items-start">
                              <span className="text-green-600 mt-0.5 font-bold">✓</span>
                              <span>{sym}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-wide text-gray-400 font-black mb-1.5">Clinical Classification Cutoffs</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {cond.severity.map((sev, si) => (
                            <span key={si} className="bg-gray-105 border border-gray-200 text-gray-700 px-3 py-1 text-[11px] font-semibold">
                              Score {sev.range} : <span className="text-gray-900 font-bold">{sev.label}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== RESOURCE DIRECTORY ==================== */}
          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4 py-12"
            >
              <div className="border-b border-gray-200 pb-5 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Clinical Crisis Directory & Guidelines</h1>
                <p className="text-sm text-gray-500 mt-2">Confidential Malaysian Support Helplines with Evidence‑Based Self‑Regulation Strategies.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left - hotlines */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-200 p-6 shadow-sm">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-red-700 block mb-3">Toll-free / Low-cost hotlines</span>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Active Malaysian Support Channels</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Befrienders KL', phone: '03-7627 2929', hours: '24 Hours / 7 Days', desc: 'Confidential supportive listening for general distress, loneliness, and suicide prevention.' },
                        { name: 'MIASA Helpline', phone: '1800-82-0066', hours: 'Emergency Dialing', desc: 'Mental Illness Awareness and Support Association supportive crisis counselors.' },
                        { name: 'Talian Kasih', phone: '15999', hours: '24 Hours / 7 Days', desc: 'Ministry of Women, Family and Community Development general supportive social line.' },
                        { name: 'Lifeline Association Malaysia', phone: '03-4265 7995', hours: 'Multilingual Support', desc: 'Provides telephone counselling and psychological assistance to Chinese-speaking community.' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-5 border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 inline-block mb-2 font-mono uppercase tracking-wide">
                              {item.hours}
                            </span>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-gray-150">
                            <span className="text-xs text-gray-400 block font-mono">Dial line:</span>
                            <a href={`tel:${item.phone.replace(/[^0-9]/g, '')}`} className="font-mono text-lg font-black text-red-700 hover:underline">
                              {item.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Public support directory */}
                  <div className="bg-white border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-md font-bold text-gray-900 mb-3 tracking-tight">Professional Clinical Outlets in Malaysia</h3>
                    <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                      <div className="flex gap-4 items-start p-4 bg-gray-50">
                        <span className="text-xl mt-0.5">🏥</span>
                        <div>
                          <strong className="block text-gray-900 text-sm mb-1">Government Psychiatry Outpatient clinics</strong>
                          Government hospitals (e.g., Hospital Kuala Lumpur, Hospital Selayang, HUKM, Hospital Sultanah Aminah) provide heavily subsidised services. Requires a general referral letter from private clinic or Klinik Kesihatan GP.
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 bg-gray-50">
                        <span className="text-xl mt-0.5">🎓</span>
                        <div>
                          <strong className="block text-gray-900 text-sm mb-1">University wellness support clinics</strong>
                          Major national universities (UITM, UM, UKM, USM, UTM, Sunway, Monash) provide low-cost clinical psychology counseling to the public and student community.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - self regulation guidelines */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 p-6 shadow-sm">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-green-600 block mb-2">Evidence-Based</span>
                    <h3 className="text-md font-bold text-gray-900 mb-4 tracking-tight">Biological Self-Regulation</h3>

                    <div className="space-y-5 text-xs text-gray-600 leading-relaxed">
                      <div>
                        <strong className="block text-gray-800 text-xs mb-1">Deep Diaphragmatic Breath Cycles</strong>
                        Inhale for 4 beats, slowly allow your chest to settle, and exhale for 6 beats. Repeat 10 cycles. Increases vagal tone to down-regulate situational stress panic.
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <strong className="block text-gray-800 text-xs mb-1">Consistent Sleep Clean Routine</strong>
                        Settle your bedroom temperature below 24°C, shut off digital lighting 1 hour prior to sleep, and preserve standardized wake up times. Sleep quality is standard preventative defense.
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <strong className="block text-gray-800 text-xs mb-1">Behavioral Activation exercises</strong>
                        Undergo regular moderate aerobic exercises (fast walking, light jogging) for 30 minutes, 3 times per week. Induces baseline endorphin and dopamine balance comparable to medical treatment in moderate depression.
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-700 text-white p-6 border border-green-800 shadow-xs">
                    <h4 className="text-sm font-bold mb-2">Have Custom Questions?</h4>
                    <p className="text-xs text-green-100 mb-4 leading-relaxed">
                      Consult MindBot, our local interactive information advisor. Click the chat bubble to resolve queries instantly.
                    </p>
                    <button 
                      onClick={() => setChatOpen(true)}
                      className="w-full py-2 bg-white text-green-900 text-xs font-bold hover:bg-green-100 transition cursor-pointer"
                    >
                      Connect with MindBot
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ==================== ACADEMIC ABOUT ==================== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 py-12"
            >
              <div className="border-b border-gray-200 pb-5 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">About MindCheck</h1>
                <p className="text-sm text-gray-500 mt-2">Project Research Framework and Documentation</p>
              </div>

              <div className="bg-white border border-gray-200 p-8 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">Project Background</h3>
                  <p>
                   MindCheck is designed to overcome barriers that limit access to reliable mental health validation. It helps bridge the gap in early recognition of mental distress through non‑invasive, standardized screening methods.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-md font-bold text-gray-900 mb-3 tracking-tight">Academic Clinical References</h3>
                  <div className="space-y-4">
                    
                    <div className="p-4 bg-gray-50 border border-gray-150">
                      <strong className="block text-gray-800 text-sm">DASS-21 (Depression, Anxiety, & Stress Scales)</strong>
                      <span className="text-xs text-gray-500 font-mono block mb-1">Lovibond, S.H. & Lovibond, P.F. (1995)</span>
                      Defines autonomous arousal dysregulation constructs, situational panic indicators and vegetative depression. Computed via summing raw domain counts followed by standard multiplication parameters.
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-150">
                      <strong className="block text-gray-800 text-sm">MDQ Adaptive (Bipolar Mood Disorder Assessment)</strong>
                      <span className="text-xs text-gray-500 font-mono block mb-1">Hirschfeld, R.M., et al. (2000)</span>
                      Calibrated screening indices identifying manic behavior patterns, rapid speech transitions, flight-of-ideas, sleep cycle variance and high-tension risk-taking behaviors.
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-150">
                      <strong className="block text-gray-800 text-sm">PRIME Screen (Psychosis & Schizophrenia Screening)</strong>
                      <span className="text-xs text-gray-500 font-mono block mb-1">Miller, T.J., et al. (2003)</span>
                      Attenuated positive sensory validation model evaluating subtle cognitive hallucination episodes, sensory disruption profiles, paranoid ideations and severe communication confusion risks.
                    </div>

                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-md font-bold text-gray-900 mb-2">Technical Implementation Stack</h3>
                  <p className="text-xs text-gray-500">
                    MindCheck is built using standard React, with bundling and build processes handled by Vite for speed and efficiency. Form validation is managed through state machines, ensuring compulsory profile fields are completed before progression. All directives and rules are computed safely on the client side, using temporary logical schemas that protect user data while maintaining responsiveness.
                  </p>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MindCheckLogo 
                className="h-8 w-8 object-contain text-emerald-400 block" 
                size={32}
              />
              <span className="font-mono text-lg font-bold tracking-tight text-white">MindCheck</span>
            </div>
            <p className="text-xs text-gray-400">Heuristic Mental Health Assessment & Diagnostic Expert Screening.</p>
          </div>
          
          <div className="text-xs text-gray-500 font-mono space-y-1">
            <div>© 2026 MindCheck Project. Under academic guidelines.</div>
            <div>Scored ephemerally. Fully local data execution. No remote storage tracking active.</div>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-55 flex flex-col items-end">
        
        {/* Chat box drawer */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white border border-gray-250 w-80 md:w-96 h-[480px] shadow-2xl flex flex-col justify-between mb-4 override-rounded-none overflow-hidden"
            >
              <div className="bg-green-800 text-white p-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <div>
                    <h4 className="text-xs font-bold leading-none">MindBot Assistant</h4>
                    <span className="text-[10px] text-green-150 leading-none">Online reference advisor</span>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:text-green-200 p-1 cursor-pointer focus:outline-hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Message scroll log area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3 text-xs leading-relaxed max-w-[85%] border shadow-3xs ${
                      msg.sender === 'user'
                        ? 'bg-green-600 text-white border-green-700 font-medium'
                        : 'bg-white text-gray-800 border-gray-150'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-white text-gray-550 border border-gray-150 text-xs flex items-center gap-1 min-w-[60px] justify-center shadow-3xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-75"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Direct query triggers suggestions */}
              <div className="p-2 border-t border-gray-100 flex gap-1 bg-white overflow-x-auto shrink-0 scrollbar-none">
                {[
                  { query: 'What is stress?', label: 'Stress DASS-21' },
                  { query: 'Tell me about Bipolar disorder', label: 'Bipolar info' },
                  { query: 'Give me anxiety coping tips', label: 'Anxiety actions' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => triggerChatBot(item.query)}
                    className="px-2.5 py-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200/50 hover:bg-green-150 transition whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Input segment */}
              <div className="p-3 border-t border-gray-250 bg-white flex gap-2 shrink-0">
                <input 
                  type="text" 
                  placeholder="Ask MindBot mental queries..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChatMessage();
                  }}
                  className="flex-grow px-3 py-1.5 border border-gray-300 text-xs focus:border-green-600 focus:outline-hidden"
                />
                <button
                  onClick={handleSendChatMessage}
                  className="bg-green-750 text-white p-2 hover:bg-green-800 transition shadow-xs flex items-center justify-center cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-green-750 text-white p-4 shadow-2xl hover:bg-green-850 hover:scale-105 active:scale-95 transition-all duration-150 flex items-center justify-center group relative cursor-pointer"
          aria-label="MindBot Chat"
        >
          {chatOpen ? <X className="h-6 w-6" /> : (
            <div className="flex gap-2 items-center">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-bold font-mono uppercase tracking-wider hidden md:inline">Consult MindBot</span>
            </div>
          )}
        </button>

      </div>

    </div>
  );
}
