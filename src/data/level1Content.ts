export type AcademicQuestion = {
  prompt: string;
  evidence?: string;
};

export type AcademicFolder = {
  id: string;
  name: string;
  description: string;
  questions: AcademicQuestion[];
  evidence: string[];
};

export type LearningDomain = {
  id: string;
  name: string;
  evidence: string;
};

export type Level1Subject = {
  code: string;
  name: string;
  progress: string;
  folders: AcademicFolder[];
  domains?: LearningDomain[];
};

export const level1Subjects: Level1Subject[] = [
  {
    code: "MED 101",
    name: "Integrated Basic Sciences",
    progress: "4 bimonthly sections",
    folders: [
      {
        id: "MED101-F01",
        name: "1st Bimonthly – Medical Foundations",
        description: "Expectations, early learning experiences, milestones, and improvement plans.",
        questions: [
          { prompt: "What were your personal expectations upon entering medical school?" },
          { prompt: "What did you find easy? What did you find difficult?" },
          {
            prompt:
              "What was a personal achievement you have attained and see as a personal milestone in this bimonthly?",
            evidence: "Provide artifacts.",
          },
          {
            prompt:
              "What do you intend to do to improve your grades/study habits/time management/group dynamics, etc.?",
            evidence: "Provide artifacts.",
          },
        ],
        evidence: [
          "Supporting artifacts for the personal milestone.",
          "Supporting artifacts for the improvement plan.",
        ],
      },
      {
        id: "MED101-F02",
        name: "2nd Bimonthly – Knowledge Development",
        description: "Compare the second period with the first and document continued growth.",
        questions: [
          { prompt: "How different was the 2nd Bimonthly to the 1st Bimonthly?" },
          { prompt: "What did you find easy? What did you find difficult?" },
          {
            prompt:
              "What was a personal achievement you have attained and see as a personal milestone in this bimonthly?",
            evidence: "Provide artifacts.",
          },
          {
            prompt:
              "What do you intend to do to improve your grades/study habits/time management/group dynamics, etc.?",
            evidence: "Provide artifacts.",
          },
        ],
        evidence: [
          "Supporting artifacts for the personal milestone.",
          "Supporting artifacts for the improvement plan.",
        ],
      },
      {
        id: "MED101-F03",
        name: "3rd Bimonthly – Learning Integration",
        description:
          "Reflect on semester realizations, milestones, and goals for the final period.",
        questions: [
          { prompt: "What are your realizations now that a semester has passed?" },
          { prompt: "What did you find easy? What did you find difficult?" },
          {
            prompt:
              "What was a personal achievement you have attained and see as a personal milestone in this bimonthly?",
            evidence: "Provide artifacts.",
          },
          { prompt: "What do you intend to do to fully realize your goals in the 4th Bimonthly?" },
        ],
        evidence: ["Supporting artifacts for the personal milestone."],
      },
      {
        id: "MED101-F04",
        name: "4th Bimonthly – Year-End Reflection",
        description: "Review achieved goals, a final milestone, and significant year-end change.",
        questions: [
          {
            prompt:
              "What were the personal goals that you've achieved? What did you find easy and difficult to achieve?",
          },
          {
            prompt:
              "What was a personal achievement you have attained and see as a personal milestone in this bimonthly?",
            evidence: "Provide artifacts.",
          },
          { prompt: "What significant change have you noted at the end of one whole school year?" },
        ],
        evidence: ["Supporting artifacts for the personal milestone."],
      },
    ],
  },
  {
    code: "MED 102",
    name: "Family, Community, & Preventive Medicine I",
    progress: "8 learning domains available",
    domains: [
      {
        id: "MED102-D01",
        name: "Patient-centered care",
        evidence:
          "Patient case analysis identifying biological, psychological, and social factors.",
      },
      {
        id: "MED102-D02",
        name: "Family-focused care",
        evidence: "Genogram or family assessment with reflection.",
      },
      {
        id: "MED102-D03",
        name: "Social determinants of health",
        evidence: "Social determinants analysis of a patient or community case.",
      },
      {
        id: "MED102-D04",
        name: "Global and national health frameworks",
        evidence:
          "SDG mapping worksheet linking health priorities with Philippine health programs.",
      },
      {
        id: "MED102-D05",
        name: "Primary health care and Universal Health Care",
        evidence: "Reflection and output from the mock Rural Health Unit activity.",
      },
      {
        id: "MED102-D06",
        name: "Systems thinking",
        evidence: "Map or causal loop diagram with written analysis.",
      },
      {
        id: "MED102-D07",
        name: "Community engagement and social accountability",
        evidence: "Community health needs analysis or community-oriented intervention proposal.",
      },
      {
        id: "MED102-D08",
        name: "Professional identity formation",
        evidence: "Integrative reflection on learning and growth throughout MED 102.",
      },
    ],
    folders: [
      {
        id: "MED102-F01",
        name: "Patient & Family-Centered Care",
        description:
          "The proposed parent grouping for patient-centered and family-focused domains.",
        questions: [],
        evidence: [],
      },
      {
        id: "MED102-F02",
        name: "Health & Social Determinants",
        description: "The proposed parent grouping for determinants and health frameworks.",
        questions: [],
        evidence: [],
      },
      {
        id: "MED102-F03",
        name: "Healthcare Systems & Primary Care",
        description: "The proposed parent grouping for primary care and systems domains.",
        questions: [],
        evidence: [],
      },
      {
        id: "MED102-F04",
        name: "Community & Professional Development",
        description:
          "The proposed parent grouping for community and professional identity domains.",
        questions: [],
        evidence: [],
      },
    ],
  },
  {
    code: "MED 103",
    name: "Medical Humanities I",
    progress: "4 themed bimonthly sections",
    folders: [
      {
        id: "MED103-F01",
        name: "Learning Identity, Historical Perspectives, and Humanistic Foundations",
        description:
          "Learning identity, history, patient-doctor relationships, and humanistic foundations.",
        questions: [
          {
            prompt:
              'How have the principles of andragogy, learning, and memory influenced the way you study and take responsibility for your learning as a medical student? Reflect on one study practice you changed or need to change, and explain how this relates to your "My Learning Philosophy" and "My Why."',
          },
          {
            prompt:
              "Which historical development or medical tradition - from early medicine through Philippine medicine - most challenged or enriched your understanding of healing and the role of the physician? How did it influence your respect for scientific evidence, patients' beliefs, and the social context of care?",
          },
          {
            prompt:
              'As you were introduced to the patient-doctor relationship, what personal assumption about being a "good doctor" did you begin to question? Using a class discussion, scenario, or observed interaction, explain how empathy, respect, trust, and professional responsibility may influence a patient\'s experience.',
          },
          {
            prompt:
              "What personal milestone and what difficulty best describe your development during this bimonthly? Identify an artifact that demonstrates your learning and formulate one specific, realistic action to improve your self-directed learning, reflection, or humanistic attitudes in the next bimonthly.",
            evidence: "Identify an artifact demonstrating your learning.",
          },
        ],
        evidence: [
          "Artifact demonstrating learning.",
          "One specific improvement action for the next bimonthly.",
        ],
      },
      {
        id: "MED103-F02",
        name: "Patient-Centered Relationships, Advocacy, and Cultural Understanding",
        description: "Communication, advocacy, empowerment, cultural humility, and equitable care.",
        questions: [
          {
            prompt:
              "Recall a patient narrative, role-play, or learning scenario in which a patient's feelings, beliefs, circumstances, or expectations differed from the physician's assumptions. How did listening, empathy, nonjudgmental communication, and trust-building change your interpretation of the patient's behavior? What would you say or do differently now?",
          },
          {
            prompt:
              "When a patient has difficulty understanding, accepting, or carrying out a proposed care plan, how can a physician advocate for and empower the patient without undermining autonomy? Reflect on an example and explain how patient feedback could be used to improve communication, quality of care, or the patient's experience.",
          },
          {
            prompt:
              "How have the discussions on cultural integration, diversity, and planetary/environmental health changed the way you understand illness and access to care? Consider local Bukidnon communities, including Indigenous Peoples where relevant, and examine how culture, living conditions, environment, or personal bias may affect respectful and equitable clinical decisions.",
          },
          {
            prompt:
              "What learning activity or artifact most clearly demonstrates your progress in patient-centered communication, cultural humility, or advocacy? Describe what was challenging, the feedback or realization that mattered most, and a specific plan for practicing these competencies more consistently.",
            evidence: "Identify the learning activity or artifact demonstrating progress.",
          },
        ],
        evidence: [
          "Learning activity or artifact demonstrating progress.",
          "Specific practice plan.",
        ],
      },
      {
        id: "MED103-F03",
        name: "Professional Identity, Ethics, Accountability, and Well-Being",
        description: "Professionalism, ethics, communication, teamwork, feedback, and self-care.",
        questions: [
          {
            prompt:
              "How has your understanding of medical professionalism changed from viewing it as proper conduct to seeing it as a continuing commitment to patients, colleagues, and society? Reflect on a concrete situation in which your attitudes, integrity, respect, or sense of responsibility were tested.",
          },
          {
            prompt:
              "Reflect on a simulated or observed professional dilemma involving compassion, honesty, confidentiality, accountability, a professional lapse, or peer behavior. Which ethical or professional principles - including those discussed in relation to the Hippocratic Oath and PMA/PRC standards - guided your judgment? What would you do, and why?",
          },
          {
            prompt:
              "What did patient history-taking experiences or exercises in Pediatrics, OB-GYN, Internal Medicine, or Surgery teach you about adapting communication to different patients and working respectfully with health care teams? Identify a communication challenge, possible bias, or cultural consideration and explain how you would respond more effectively.",
          },
          {
            prompt:
              "What evidence best demonstrates your growth in professionalism, teamwork, and self-awareness during this bimonthly? Explain how you will respond to feedback, address an identified weakness, and practice healthy self-care while maintaining professional responsibilities.",
            evidence: "Provide evidence demonstrating growth.",
          },
        ],
        evidence: [
          "Evidence of growth in professionalism, teamwork, and self-awareness.",
          "Feedback response and self-care plan.",
        ],
      },
      {
        id: "MED103-F04",
        name: "Ethical Leadership, Disaster Preparedness, Social Responsibility, and Year-End Integration",
        description:
          "Leadership, disaster preparedness, social accountability, and year-end integration.",
        questions: [
          {
            prompt:
              "What did your experiences in group work, leadership activities, or management discussions reveal about your strengths and limitations as a future member or leader of a health care team? How would you use ethical leadership, collaboration, and quality-improvement principles to promote patient safety and resolve a team challenge?",
          },
          {
            prompt:
              "Reflect on a disaster-risk-reduction activity, simulation, or scenario relevant to a Philippine community. What did it teach you about preparedness, coordinated response, risk communication, and recovery? Explain how you would balance immediate patient needs, limited resources, and care for vulnerable community members.",
          },
          {
            prompt:
              "How did your Student Social Responsibility Project or other community-oriented learning experience deepen your understanding of service, social accountability, and the core values of BukSU-COM? Identify one result or limitation, whose perspective you may have overlooked, and a specific improvement you would propose.",
            evidence: "Provide an artifact.",
          },
          {
            prompt:
              'Looking back over the entire year of Medical Humanities I, how has your understanding of "My Why," "My Learning Philosophy," and "The Good Doctor" changed? Identify your most significant growth in empathy, professionalism, leadership, cultural humility, and social responsibility. What evidence supports this growth, and what concrete commitments will guide you in Level II?',
            evidence: "Identify evidence supporting your growth and commitments.",
          },
        ],
        evidence: [
          "Artifact for the Student Social Responsibility Project or another community-oriented learning experience.",
          "Evidence supporting year-end growth and Level II commitments.",
        ],
      },
    ],
  },
];

export const med102Questions: AcademicQuestion[] = [
  {
    prompt: "What did I learn?",
    evidence: "Identify the most important insight from the activity.",
  },
  {
    prompt: "What changed in my understanding?",
    evidence:
      "Explain how the experience challenged or strengthened your previous beliefs about health, illness, or healthcare delivery.",
  },
  {
    prompt: "Why does this matter to the people and communities we serve?",
    evidence:
      "Relate your learning to patient, family, or community needs, preferably in the context of Bukidnon.",
  },
  {
    prompt: "How will I apply this as a future physician?",
    evidence: "Identify a specific action or change in your future approach.",
  },
];

export const programLearningOutcomes = [
  "Demonstrate clinical competence.",
  "Communicate effectively.",
  "Lead and manage health care teams.",
  "Engage in research activities.",
  "Collaborate within interprofessional teams.",
  "Utilize systems-based approach to healthcare.",
  "Engage in continuing personal and professional development.",
  "Adhere to ethical, professional, and legal standards.",
  "Demonstrate nationalism, internationalism and dedication to service.",
  "Practice the principles of social accountability.",
  "Apply the core values of BukSU-COM to the medical practice in the communities.",
] as const;

export const finalMusingsQuestions = [
  "Has your learning philosophy changed?",
  "Has your reason to pursue medicine changed?",
  "What made them change? What made them remain as is?",
  "How do you see your entire Level 1 journey contribute to your goal as a good doctor?",
  "What was the single most important thing you learned in Level 1?",
] as const;
