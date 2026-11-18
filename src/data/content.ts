export const profile = {
  name: "Bobby Ahirwar",
  email: "ch23btech11011@iith.ac.in",
  github: "https://github.com/rock917",
  linkedin: "https://www.linkedin.com/in/bobby-ahirwar-3893a3321",
  resume:
    "https://drive.google.com/file/d/1JvPsn7kDgxLc7J_2NvloVgSeHwjsC5Ko/view?usp=drivesdk",
};
export const skills = [
  {
    name: "Frontend engineering",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 & CSS3",
    ],
  },
  {
    name: "Interactive UI & 3D Web",
    tools: [
      "Three.js",
      "Framer Motion",
      "State Management",
      "Responsive Design",
      "Streamlit",
    ],
  },
  {
    name: "Programming",
    tools: ["TypeScript", "JavaScript", "Python", "C++", "C"],
  },
  {
    name: "AI & machine learning",
    tools: ["PyTorch", "TensorFlow", "scikit-learn", "Model evaluation"],
  },
  {
    name: "GenAI & retrieval",
    tools: ["Hugging Face", "RAG", "ChromaDB", "FAISS", "Claude · Groq"],
  },
  {
    name: "Backend systems",
    tools: ["FastAPI", "REST APIs", "Redis", "Celery", "JWT · OAuth"],
  },
  {
    name: "Databases & storage",
    tools: ["PostgreSQL", "Supabase", "MySQL", "SQLite"],
  },
  {
    name: "Cloud & DevOps",
    tools: ["Vercel", "Docker", "Azure", "Git & GitHub", "pytest"],
  },
];
export interface Credential {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  url: string;
  accent: "gold" | "amber" | "indigo";
}

export const credentials: Credential[] = [
  {
    id: "EILZ91RH8S6Z",
    title: "Natural Language Processing with Sequence Models",
    issuer: "DeepLearning.AI",
    skills: [
      "RNNs & LSTMs",
      "Attention Mechanisms",
      "Transformers",
      "Named Entity Recognition (NER)",
      "Text Generation",
    ],
    url: "https://www.coursera.org/account/accomplishments/verify/EILZ91RH8S6Z",
    accent: "gold",
  },
  {
    id: "QBP5524MXAET",
    title: "Natural Language Processing with Probabilistic Models",
    issuer: "DeepLearning.AI",
    skills: [
      "Hidden Markov Models (HMM)",
      "Viterbi Algorithm",
      "Word2Vec (CBOW)",
      "N-gram Language Models",
      "Autocorrect Systems",
    ],
    url: "https://www.coursera.org/account/accomplishments/verify/QBP5524MXAET",
    accent: "amber",
  },
  {
    id: "CRPSSR2KES0O",
    title: "Natural Language Processing with Classification and Vector Spaces",
    issuer: "DeepLearning.AI",
    skills: [
      "Sentiment Analysis",
      "Vector Space Models",
      "Cosine Similarity",
      "PCA & Dimensionality Reduction",
      "Locality Sensitive Hashing (LSH)",
    ],
    url: "https://www.coursera.org/account/accomplishments/verify/CRPSSR2KES0O",
    accent: "indigo",
  },
  {
    id: "AMH8P2CBTBPC",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI · Stanford University",
    skills: [
      "Linear & Logistic Regression",
      "Gradient Descent",
      "Regularization (L1/L2)",
      "Feature Engineering",
      "Cost Function Optimization",
    ],
    url: "https://www.coursera.org/account/accomplishments/verify/AMH8P2CBTBPC",
    accent: "gold",
  },
  {
    id: "5NQEF0IG9R21",
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI · Stanford University",
    skills: [
      "Deep Neural Networks",
      "Multi-Class Classification",
      "Decision Trees & Random Forests",
      "XGBoost Ensembles",
      "Backpropagation",
    ],
    url: "https://www.coursera.org/account/accomplishments/verify/5NQEF0IG9R21",
    accent: "amber",
  },
];
export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  repo: string;
  demo?: string;
  demoNote?: string;
  model?: string;
  image: string;
  alt: string;
  caption: string;
  gallery?: { src: string; alt: string }[];
  stack: string[];
  problem: string;
  solution: string;
  features: string[];
  flow: string[];
  decisions: string[];
  result: string;
  resultLabel: string;
  evidence: string;
  limits: string;
}
export const projects: Project[] = [
  {
    slug: "codelens-ai",
    name: "CodeLens AI",
    category: "Developer tools",
    tagline: "A new perspective on code.",
    summary:
      "Explore repositories, search code semantically, and ask questions with source-linked AI answers.",
    repo: "https://github.com/rock917/codelens-ai",
    demo: "https://codelens-ai-five.vercel.app/",
    demoNote: "The live app requires an account.",
    image: "/images/projects/codelens.jpg",
    alt: "CodeLens AI - AI-Powered Code Analysis & Developer Assistance showcase",
    caption: "CodeLens AI platform showcase and developer assistance overview.",
    gallery: [
      {
        src: "/images/projects/codelens-chat.webp",
        alt: "CodeLens source-linked chat interface",
      },
    ],
    stack: ["React", "TypeScript", "FastAPI", "ChromaDB", "Supabase", "Groq"],
    problem:
      "A new codebase can be difficult to navigate. File names alone do not explain how features fit together or where a change belongs.",
    solution:
      "CodeLens brings repository exploration, semantic search, and source-linked conversation into one workspace, so an answer can be traced back to the code behind it.",
    features: [
      "Import public repositories or ZIP archives into a personal workspace.",
      "Explore source files and symbols, then search by meaning.",
      "Ask questions with streamed answers, source references, and saved chat history.",
      "Inspect heuristic code-health checks and generate test or documentation drafts.",
    ],
    flow: [
      "Import repository",
      "Parse & chunk code",
      "Embed in ChromaDB",
      "Retrieve & rerank",
      "Generate cited answer",
    ],
    decisions: [
      "AST and Tree-sitter parsing preserve useful code structure during ingestion.",
      "Local sentence-transformer embeddings support semantic retrieval; Groq handles answer generation.",
      "Supabase provides authentication and persistent workspace records.",
    ],
    resultLabel: "Answers with a path back to the source.",
    result:
      "The implemented workflow connects repository search, code exploration, and cited chat. Generated tests remain reviewable drafts.",
    evidence: "https://github.com/rock917/codelens-ai#readme",
    limits:
      "Code-health scans use language-specific heuristics, not comprehensive vulnerability detection. Generated tests are not executed by the app, and repository import supports public repositories.",
  },
  {
    slug: "documind-ai",
    name: "DocuMind AI",
    category: "Document AI",
    tagline: "Find the evidence within.",
    summary:
      "Find contract clauses with fine-tuned Legal-BERT and inspect the supporting passages on the original pages.",
    repo: "https://github.com/rock917/Documind_AI",
    demoNote: "Live demo available on request.",
    model: "https://huggingface.co/TheRock45/documind-legalbert-qa",
    image: "/images/projects/documind.jpg",
    alt: "DocuMind AI - Legal Contract Understanding & Question Answering showcase",
    caption: "DocuMind AI contract understanding and clause retrieval interface.",
    gallery: [
      {
        src: "/images/projects/documind-ask.webp",
        alt: "DocuMind document question-and-answer interface",
      },
    ],
    stack: [
      "PyTorch",
      "Legal-BERT",
      "FastAPI",
      "FAISS",
      "BM25",
      "Docker",
      "Azure",
    ],
    problem:
      "Long and scanned contracts make relevant clauses hard to locate. A useful extraction tool also needs to show evidence and know when a clause is absent.",
    solution:
      "DocuMind uses extractive QA across 41 CUAD clause types, with confidence thresholds and abstention. Answers map back to highlighted passages on the original pages.",
    features: [
      "Analyze 41 clause types with fine-tuned Legal-BERT.",
      "Read scanned PDFs and Office documents through OCR and conversion.",
      "Inspect exact page evidence and export PDF reports.",
      "Ask document questions through hybrid retrieval with citations.",
    ],
    flow: [
      "Convert & OCR",
      "Map text to pages",
      "Extract clause spans",
      "Apply abstention",
      "Highlight & report",
    ],
    decisions: [
      "Extractive answers retain the document wording and evidence location.",
      "Abstention thresholds handle missing clauses instead of forcing an answer.",
      "A separate Ask pipeline combines BM25 and FAISS with reciprocal rank fusion and Groq.",
    ],
    resultLabel: "0.939 micro-AUPR",
    result:
      "Recorded test evaluation: 102 contracts and 4,182 contract–clause examples. F1 with abstention: 0.894. These are saved project results, not a new evaluation run.",
    evidence:
      "https://github.com/rock917/Documind_AI/blob/main/reports/eval_legalbert_qa_k5_test.json",
    limits:
      "Designed around English commercial contracts. The recorded evaluation detects about 80.9% of present clauses, so review is still necessary. Sequential CPU analysis can be slow; the hosted demo runs on demand.",
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    category: "Applied AI",
    tagline: "Every decision, traceable.",
    summary:
      "Review invoices with evidence-backed AI extraction, purchase-order checks, and human approval.",
    repo: "https://github.com/rock917/ledgerly-ai-invoice-review",
    demo: "https://ledgerly-ai-invoice-review.vercel.app/",
    demoNote: "The live app requires an account. Use synthetic invoices.",
    image: "/images/projects/ledgerly.jpg",
    alt: "Ledgerly AI - AI Invoice Processing Agent showcase",
    caption:
      "Ledgerly AI automated invoice data extraction and processing interface.",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Groq",
      "Supabase",
      "PostgreSQL",
      "Azure",
    ],
    problem:
      "An extracted invoice is only the start. Reviewers need to validate suppliers, purchase orders, arithmetic, and previous invoices before recording a decision.",
    solution:
      "Ledgerly combines AI extraction with explicit validation rules and source evidence. A human reviews the findings and makes the final approval, information-request, or rejection decision.",
    features: [
      "Extract structured fields from PDFs and printed scans.",
      "Check vendors, purchase orders, duplicates, arithmetic, and remaining balances.",
      "Inspect source evidence alongside review findings.",
      "Record decisions with audit history and atomic purchase-order balance updates.",
    ],
    flow: [
      "Upload & OCR",
      "Extract fields",
      "Validate against records",
      "Human review",
      "Update & audit",
    ],
    decisions: [
      "AI handles extraction; deterministic rules handle business checks.",
      "Human approval remains an explicit step in the workflow.",
      "PostgreSQL transactions keep approved invoice records and purchase-order balances consistent.",
    ],
    resultLabel: "Evidence-led invoice review.",
    result:
      "The workflow connects source documents, validation findings, and recorded human decisions, with an auditable history.",
    evidence: "https://github.com/rock917/ledgerly-ai-invoice-review#readme",
    limits:
      "Ledgerly records review decisions; it does not initiate payments. ERPNext is a separate local pilot, not a public production integration. Walkthrough and sample data are synthetic.",
  },
  {
    slug: "feedbackiq",
    name: "FeedbackIQ",
    category: "Machine learning",
    tagline: "The signal in customer voices.",
    summary:
      "Classify customer reviews with fine-tuned DistilBERT and explore individual predictions, batch results, and sentiment insights.",
    repo: "https://github.com/rock917/AI-Powered-Review-System",
    demo: "https://feedbackiq.streamlit.app/",
    demoNote: "The Streamlit demo may need time to wake from inactivity.",
    model: "https://huggingface.co/TheRock45/feedbackiq-sentiment",
    image: "/images/projects/feedbackiq.jpg",
    alt:
      "Amazon Review Sentiment Analysis - FeedbackIQ NLP review analysis showcase",
    caption:
      "FeedbackIQ sentiment classification and customer review insight dashboard.",
    stack: [
      "Python",
      "PyTorch",
      "DistilBERT",
      "Hugging Face",
      "Streamlit",
      "SQLite",
    ],
    problem:
      "Large collections of customer reviews contain useful signals, but reading them one by one makes it difficult to understand sentiment at scale.",
    solution:
      "FeedbackIQ fine-tunes DistilBERT for positive and negative sentiment and makes the model available through single-review predictions, batch analysis, and a Streamlit dashboard.",
    features: [
      "Analyze individual reviews with prediction confidence.",
      "Upload CSV batches for sentiment analysis.",
      "Explore sentiment distributions and model comparison views.",
      "Reuse cached inference results through SQLite.",
    ],
    flow: [
      "Prepare reviews",
      "Fine-tune DistilBERT",
      "Evaluate held-out data",
      "Cache inference",
      "Explore in Streamlit",
    ],
    decisions: [
      "A balanced 110,000-review Amazon Fine Foods dataset separates training, validation, and testing.",
      "The test split contains 11,000 reviews and is kept separate from model training.",
      "SQLite caching avoids repeating inference for previously analyzed reviews.",
    ],
    resultLabel: "95.01% test accuracy",
    result:
      "Saved evaluation on 11,000 held-out reviews reports accuracy of 95.01% and F1 of 0.9502. The balanced 110K dataset includes 88,001 training and 10,999 validation reviews.",
    evidence:
      "https://github.com/rock917/AI-Powered-Review-System/blob/main/notebooks/05_model_evaluation.ipynb",
    limits:
      "The model predicts binary sentiment; neutral reviews are excluded from the benchmark. Performance on other review domains can differ. Any synthetic dashboard samples are illustrative, not measured customer activity.",
  },
];
