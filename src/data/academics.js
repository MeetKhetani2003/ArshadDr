export const studyNotes = [
  {
    slug: "copd",
    title: "Chronic Obstructive Pulmonary Disease (COPD)",
    description: "A progressive, chronic inflammatory lung disease causing airflow obstruction. Detailed study notes on pathophysiology, clinical features, and physiotherapeutic rehabilitation protocols.",
    definition: "Chronic Obstructive Pulmonary Disease (COPD) is a chronic progressive lung disease in which airflow through the lungs becomes obstructed, making breathing difficult.",
    pathophysiology: {
      causes: [
        "Airways become inflamed and narrowed",
        "Excess mucus blocks the bronchi",
        "Alveoli (air sacs) lose elasticity and get damaged"
      ],
      effects: [
        "Difficulty in expiration",
        "Air trapping inside lungs",
        "Reduced oxygen exchange",
        "Not completely reversible, gradually worsening over time"
      ]
    },
    components: [
      {
        title: "Chronic Bronchitis",
        desc: "Inflammation of bronchi, excess mucus production, and chronic productive cough."
      },
      {
        title: "Emphysema",
        desc: "Destruction of alveoli, loss of elastic recoil, air trapping, and hyperinflation."
      }
    ],
    difficultyReasons: [
      "Airways narrow and mucus blocks airflow.",
      "Airways collapse during expiration causing air trapping.",
      "Increases the work of breathing and causes breathlessness."
    ],
    symptoms: [
      { name: "Dyspnea (Breathlessness)", details: "Most important symptom. Initially occurs during activity, later at rest due to reduced airflow and poor gas exchange." },
      { name: "Chronic Cough", details: "Persistent cough lasting months or years, often worse in the morning." },
      { name: "Sputum Production", details: "Thick mucus or phlegm, very common in chronic bronchitis." },
      { name: "Wheezing", details: "High-pitched whistling sound during breathing due to narrowed airways." },
      { name: "Chest Tightness", details: "Feeling of pressure in the chest and difficulty taking deep breaths." },
      { name: "Fatigue", details: "Occurs because less oxygen reaches tissues and breathing requires more physical effort." },
      { name: "Barrel Chest", details: "Chest becomes rounded due to chronic air trapping and hyperinflation of the lungs." },
      { name: "Pursed-Lip Breathing", details: "Patient naturally exhales through tightly pressed lips to keep airways open longer." },
      { name: "Cyanosis", details: "Bluish discoloration of lips or fingers due to low blood oxygen levels." },
      { name: "Weight Loss", details: "Common in severe stages due to high energy expenditure during breathing." }
    ],
    physioGoals: [
      "Reduce dyspnea (breathlessness) and improve ventilation",
      "Improve oxygenation and reduce air trapping",
      "Improve chest expansion and clear bronchial secretions",
      "Increase exercise tolerance, posture, and mobility",
      "Reduce anxiety related to breathing and improve overall quality of life",
      "Prevent complications and sudden exacerbations"
    ],
    techniques: [
      {
        category: "Breathing Exercises",
        items: [
          {
            name: "Diaphragmatic Breathing",
            technique: "Patient in relaxed sitting or crook lying. One hand on chest and one on abdomen. Inhale slowly through nose so the abdomen rises. Exhale slowly through mouth.",
            benefits: "Encourages diaphragm use, decreases accessory muscle activity, improves ventilation and tidal volume."
          },
          {
            name: "Pursed-Lip Breathing",
            technique: "Inhale through nose for 2 seconds. Exhale slowly through pursed lips for 4 seconds.",
            benefits: "Prevents airway collapse during expiration, reduces air trapping, improves oxygenation."
          },
          {
            name: "Segmental Breathing",
            technique: "Therapist places hands over restricted chest area and provides tactile stimulation during inspiration.",
            benefits: "Improves chest expansion and localized lung ventilation."
          },
          {
            name: "Thoracic Expansion Exercises",
            technique: "Deep inspiration with an inspiratory hold followed by relaxed, passive expiration.",
            benefits: "Improves lung expansion, mobilizes secretions, and prevents atelectasis."
          }
        ]
      },
      {
        category: "Airway Clearance Techniques",
        items: [
          { name: "Huffing", technique: "Forced expiration through an open glottis. Clears secretions with less fatigue and reduces airway collapse." },
          { name: "Controlled Coughing", technique: "Deep breath, brief hold, followed by a strong cough originating from the diaphragm." },
          { name: "Postural Drainage", technique: "Positioning the patient (head down, side lying, prone, or sitting) to use gravity to drain secretions from specific lung segments." },
          { name: "Percussion & Vibration", technique: "Rhythmic clapping with cupped hands (percussion) and fine oscillatory movements (vibrations) during expiration to loosen and mobilize mucus." },
          { name: "Active Cycle of Breathing Technique (ACBT)", technique: "Combining breathing control, thoracic expansion exercises, and huffing for fatigue-free secretion clearance." }
        ]
      }
    ],
    rehab: "Pulmonary Rehabilitation is a comprehensive program including exercise training, education, breathing exercises, nutritional advice, and psychological support.",
    exacerbation: {
      definition: "Sudden worsening of symptoms.",
      causes: ["Infections", "Pollution", "Cold weather", "Medication non-compliance"],
      symptoms: ["Increased dyspnea", "More sputum production", "Wheezing", "Fever"],
      prevention: ["Smoking cessation", "Regular exercise", "Vaccinations", "Avoiding pollutants", "Strict medication compliance"]
    },
    prognosis: "COPD is progressive but highly manageable. Early diagnosis and physical rehabilitation slow progression, improve daily functional capacity, and reduce hospital admissions."
  },
  {
    slug: "bronchial-asthma",
    title: "Bronchial Asthma",
    description: "A chronic inflammatory airway disease characterized by bronchial hyperresponsiveness. In-depth clinical notes covering classification, pathophysiology, and step-by-step physical therapy management.",
    definition: "Bronchial asthma is a chronic inflammatory disease of the airways in which the bronchial tubes become hyperresponsive and narrow in response to different triggers, causing difficulty in breathing.",
    pathophysiology: {
      causes: [
        "Inflammation of bronchial walls",
        "Swelling and edema of airways",
        "Constriction of smooth muscles (bronchospasm)",
        "Increased mucus secretion"
      ],
      effects: [
        "Narrowing of airways and reduced airflow",
        "Wheezing and breathlessness",
        "Reversible airway obstruction (spontaneously or via bronchodilators)"
      ]
    },
    triggers: [
      { type: "Allergic", items: ["Dust mites", "Pollen", "Animal dander", "Mold"] },
      { type: "Environmental", items: ["Smoke", "Air pollution", "Cold air", "Strong perfumes"] },
      { type: "Medical / Physical", items: ["Respiratory infections", "Exercise", "Stress/anxiety", "Beta blockers and aspirin"] }
    ],
    components: [
      { title: "Extrinsic (Allergic) Asthma", desc: "Triggered by allergens, common in children, family history present." },
      { title: "Intrinsic (Non-Allergic) Asthma", desc: "Triggered by stress, infection, or cold air, unrelated to allergies." },
      { title: "Exercise-Induced Asthma", desc: "Bronchospasm occurring during or immediately after physical activity." },
      { title: "Special Types", desc: "Occupational asthma (workplace irritants) and Nocturnal asthma (symptoms worsen at night)." }
    ],
    symptoms: [
      { name: "Dyspnea (Shortness of Breath)", details: "Difficulty breathing, usually characterized by expiratory difficulty." },
      { name: "Wheezing", details: "High-pitched whistling sound heard during breathing, mostly during expiration." },
      { name: "Cough", details: "Dry or productive cough, often worse at night or early morning." },
      { name: "Chest Tightness", details: "Feeling of pressure or constriction in the chest." },
      { name: "Emergency Attack Signs", details: "Cyanosis, silent chest, severe breathlessness, difficulty speaking, sweating, tachycardia, and low oxygen saturation." }
    ],
    physioGoals: [
      "Relieve dyspnea and reduce bronchospasm",
      "Improve ventilation and remove secretions",
      "Reduce work of breathing and accessory muscle use",
      "Improve pulmonary function, posture, and chest mobility",
      "Increase exercise tolerance, prevent recurrent attacks, and educate in self-management"
    ],
    techniques: [
      {
        category: "Acute Attack Management",
        items: [
          {
            name: "Tripod Positioning",
            technique: "Patient sits leaning slightly forward, with arms supported on a table or knees (High Side-Lying if bedridden).",
            benefits: "Fixes shoulder girdle, improves accessory muscle activity, reduces work of breathing, and relieves dyspnea."
          },
          {
            name: "Breathing Control",
            technique: "Relaxed diaphragmatic breathing and slow pursed-lip breathing.",
            benefits: "Reduces respiratory effort, controls panic/anxiety, and prevents airway collapse."
          },
          {
            name: "Relaxation Therapy",
            technique: "Relaxed breathing, progressive muscle relaxation, yoga breathing, and meditation.",
            benefits: "Reduces sympathetic activity, decreases respiratory rate, and reduces bronchospasm."
          }
        ]
      },
      {
        category: "Stable / Chronic Phase Clearance",
        items: [
          { name: "Postural Drainage", technique: "Positioning according to affected segments to drain mucus using gravity." },
          { name: "Chest Percussion & Vibration", technique: "Loosens secretions and facilitates mucus movement." },
          { name: "Huffing Technique", technique: "Forced expiration with open glottis to remove secretions effectively with less fatigue." },
          { name: "Other Modalities", technique: "Incentive spirometry, ACBT, breathing exercises, and chest mobility drills." }
        ]
      }
    ]
  },
  {
    slug: "pneumonia",
    title: "Pneumonia",
    description: "An acute infection of the lung parenchyma causing alveolar fluid accumulation. Comprehensive notes on etiology, classification, clinical signs, and acute and recovery phase chest physiotherapy.",
    definition: "Pneumonia is an infection or inflammation of the lung parenchyma (alveoli and surrounding tissues) in which the air sacs become filled with fluid, pus, or inflammatory secretions, reducing gas exchange and making breathing difficult.",
    pathophysiology: {
      causes: [
        "Bacterial: Streptococcus pneumoniae, Staphylococcus aureus, Klebsiella pneumoniae",
        "Viral: Influenza virus, RSV, Coronavirus",
        "Fungal: Common in immunocompromised patients",
        "Aspiration: Entry of food, saliva, or vomit into lungs"
      ],
      effects: [
        "Ventilation-perfusion mismatch and hypoxemia",
        "Decreased lung compliance and increased work of breathing",
        "Alveoli fill with fluid, pus, and inflammatory debris"
      ]
    },
    components: [
      { title: "Classification by Location", desc: "Lobar Pneumonia (entire lobe affected) and Bronchopneumonia (patchy involvement around bronchi)." },
      { title: "Classification by Acquisition", desc: "Community Acquired (CAP), Hospital Acquired (HAP), and Ventilator Associated Pneumonia (VAP)." },
      { title: "Stages of Lobar Pneumonia", desc: "1. Congestion (fluid accumulation) -> 2. Red Hepatization (liver-like consistency with RBCs) -> 3. Grey Hepatization (fibrin deposition) -> 4. Resolution (healing)." }
    ],
    symptoms: [
      { name: "Respiratory Signs", details: "Cough with sputum, breathlessness, rapid shallow breathing (tachypnea), chest pain, and crepitations." },
      { name: "General Symptoms", details: "Fever, chills, fatigue, weakness, loss of appetite, and sweating." },
      { name: "Sputum Indicators", details: "Yellow (bacterial), Rust-colored (pneumococcal), Green (severe), and Foul-smelling (aspiration)." },
      { name: "Clinical Findings", details: "Dullness on percussion, tactile vocal fremitus, crackles/crepitations, and bronchial breathing on auscultation." }
    ],
    physioGoals: [
      "Improve oxygenation and reduce breathlessness",
      "Clear secretions and prevent secretion retention",
      "Improve lung expansion and prevent atelectasis",
      "Prevent complications of prolonged bed rest",
      "Increase exercise tolerance, endurance, and restore normal daily activity"
    ],
    techniques: [
      {
        category: "Chest Physiotherapy Modalities",
        items: [
          {
            name: "Positioning (High Fowler's)",
            technique: "Sitting upright or side-lying with the good lung down.",
            benefits: "Improves lung expansion and oxygenation."
          },
          {
            name: "Airway Clearance & ACBT",
            technique: "Breathing control, thoracic expansion, percussion/vibrations, huffing, and diaphragmatic coughing.",
            benefits: "Loosens and clears secretions from the airways."
          },
          {
            name: "Incentive Spirometry",
            technique: "Using a spirometry device to perform sustained maximal inspirations.",
            benefits: "Prevents atelectasis, improves inspiratory capacity, and enhances lung expansion."
          },
          {
            name: "Early Mobilization",
            technique: "Bed mobility, sitting out of bed, standing, and progressive ambulation.",
            benefits: "Prevents physical deconditioning, improves ventilation, and reduces hospital stay."
          }
        ]
      }
    ]
  },
  {
    slug: "tuberculosis",
    title: "Tuberculosis (TB)",
    description: "A chronic infectious disease caused by Mycobacterium tuberculosis. Comprehensive clinical review covering pulmonary and extrapulmonary manifestations, pathophysiology, and rehabilitative physiotherapy.",
    definition: "Tuberculosis (TB) is a chronic infectious disease caused by the bacterium Mycobacterium tuberculosis. It most commonly affects the lungs (Pulmonary TB), but can also affect other organs (Extrapulmonary TB) and spreads through the air.",
    pathophysiology: {
      causes: [
        "Inhalation of airborne Mycobacterium tuberculosis droplets",
        "Granuloma / tubercle formation in the alveoli",
        "Weak immune systems, malnutrition, smoking, and diabetes increase susceptibility"
      ],
      effects: [
        "Destruction of lung tissue",
        "Fibrosis of parenchyma",
        "Can present as Latent TB (inactive, non-contagious) or Active TB (multiplying, contagious)"
      ]
    },
    components: [
      { title: "Pulmonary TB", desc: "Affects the lung parenchyma. Most common and highly contagious type." },
      { title: "Extrapulmonary TB", desc: "Affects lymph nodes, bones, kidneys, brain (meningitis), or spine (Pott's spine)." },
      { title: "Medical Management (ATT)", desc: "Anti-Tubercular Therapy course using drugs like Isoniazid, Rifampicin, Pyrazinamide, and Ethambutol." }
    ],
    symptoms: [
      { name: "Cough & Sputum", details: "Persistent productive cough for more than 2-3 weeks, sometimes with blood (hemoptysis)." },
      { name: "Systemic Signs", details: "Low-grade fever (especially evening rise), night sweats, fatigue, loss of appetite, and weight loss." },
      { name: "Physical Findings", details: "Chest wall asymmetry, poor chest expansion, dullness on percussion, crackles, and bronchial breathing." }
    ],
    physioGoals: [
      "Improve ventilation and chest expansion",
      "Clear secretions and improve oxygenation",
      "Improve cardiovascular endurance and strengthen weak muscles",
      "Prevent skeletal deformities and weakness",
      "Restore functional independence and improve quality of life"
    ],
    techniques: [
      {
        category: "Rehabilitation Interventions",
        items: [
          {
            name: "Chest Expansion Exercises",
            technique: "Deep inspiration combined with shoulder elevation and lateral costal expansion drills.",
            benefits: "Increases thoracic cage mobility and prevents lung stiffness."
          },
          {
            name: "Airway Clearance Protocols",
            technique: "Postural drainage, percussion, vibration, and controlled huffing/coughing.",
            benefits: "Removes mucus safely, reducing secondary infection risks."
          },
          {
            name: "Aerobic & Strength Training",
            technique: "Low-to-moderate intensity walking, cycling, resistance band drills, and limb strengthening.",
            benefits: "Overcomes generalized weakness and improves cardiovascular endurance."
          },
          {
            name: "Postural Correction",
            technique: "Shoulder retraction, thoracic extension, and pectoral stretches.",
            benefits: "Corrects poor posture caused by chronic chest tightness."
          }
        ]
      }
    ]
  },
  {
    slug: "pleural-effusion",
    title: "Pleural Effusion",
    description: "Abnormal fluid accumulation in the pleural space. Highly detailed study notes covering classification (transudate vs. exudate), pathophysiology, diagnostic tests, and respiratory physiotherapy protocols.",
    definition: "Pleural effusion is the abnormal accumulation of excess fluid in the pleural space between the visceral pleura (covering the lungs) and the parietal pleura (lining the chest wall), compressing the lungs and restricting ventilation.",
    pathophysiology: {
      causes: [
        "Visceral and parietal pleura fluid production-absorption imbalance",
        "Cardiac failure, kidney failure, liver cirrhosis (Transudate)",
        "Pneumonia, TB, malignancy, trauma, and pulmonary embolism (Exudate)"
      ],
      effects: [
        "Compression of lung tissue and lung collapse",
        "Sharp pleuritic chest pain and dry cough",
        "Tachypnea and reduced breathing capacity"
      ]
    },
    components: [
      { title: "Transudative Effusion", desc: "Imbalance in hydrostatic/oncotic pressures. Clear fluid with low protein content." },
      { title: "Exudative Effusion", desc: "Inflammation or injury to pleura. High protein content and inflammatory cells." },
      { title: "Other Types", desc: "Hemothorax (blood), Empyema/Pyothorax (pus), and Chylothorax (lymphatic fluid)." }
    ],
    symptoms: [
      { name: "Pleuritic Pain", details: "Sharp chest pain that worsens during deep breathing, coughing, or sneezing." },
      { name: "Dyspnea & Orthopnea", details: "Shortness of breath, worse on exertion, and difficulty breathing in a lying position." },
      { name: "Clinical Signs", details: "Reduced chest expansion on the affected side, stony dull percussion note, and reduced/absent breath sounds." }
    ],
    physioGoals: [
      "Reduce breathlessness and improve lung expansion",
      "Prevent secretion retention and improve oxygenation",
      "Maintain thoracic cage and chest wall mobility",
      "Improve exercise tolerance and prevent postural deformities",
      "Promote early mobilization and restore functional capacity"
    ],
    techniques: [
      {
        category: "Effusion Recovery Protocols",
        items: [
          {
            name: "Diaphragmatic & Segmental Breathing",
            technique: "Tactile feedback on the restricted chest wall combined with slow, deep nose breathing.",
            benefits: "Enhances localized chest expansion and increases ventilation to compressed lobes."
          },
          {
            name: "Incentive Spirometry & Mobility Exercises",
            technique: "Active deep breathing devices combined with passive/active shoulder range-of-motion (ROM) and trunk stretches.",
            benefits: "Prevents pleural adhesions, maintains chest mobility, and increases inspiratory capacity."
          },
          {
            name: "Early Ambulation & Posture Correction",
            technique: "Early sitting, walking program, and thoracic extension posture drills.",
            benefits: "Promotes early functional recovery and prevents lateral postural deviation."
          }
        ]
      }
    ]
  }
];

export function getNoteBySlug(slug) {
  return studyNotes.find((n) => n.slug === slug);
}
