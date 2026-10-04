export type ProjectLinks = {
  live: string | null;
  github: string | null;
  video: string | null;
  apiDocs: string | null;
  architecture: string | null;
  localRun: string | null;
};

export type CaseStudySection = { label: string; content: string };
export type ProjectVisual = { kind: 'architecture' | 'pipeline' | 'tools' | 'metrics'; image: string | null };
export type ProjectMetric = { label: string; value: string };
export type ProjectScreenshot = { src: string; alt: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: 'Agentic AI' | 'Generative AI' | 'Machine Learning';
  eyebrow: string;
  summary: string;
  problem: string | null;
  solution: string | null;
  architecture: string[];
  stack: string[];
  features: string[];
  outcome: string | null;
  executionNote: string | null;
  links: ProjectLinks;
  featured: boolean;
  demoType: 'streamlit' | 'api' | null;
  requiresLocalSetup: boolean;
  caseStudy: CaseStudySection[];
  visual: ProjectVisual;
  metrics: ProjectMetric[];
  screenshots?: ProjectScreenshot[];
};

const emptyLinks = (): ProjectLinks => ({ live: null, github: null, video: null, apiDocs: null, architecture: null, localRun: null });

export const projects: Project[] = [
  {
    slug: 'ai-coding-agent', title: 'AI Coding Agent', category: 'Agentic AI', eyebrow: 'Agentic workflow',
    summary: 'An agentic coding assistant that plans tasks, inspects workspaces, calls tools, and coordinates local execution through a remote API.',
    problem: 'Complex coding tasks need more than a conversational interface. An assistant must understand the workspace, choose tools, obtain approval for sensitive actions, and verify the result.',
    solution: 'The system combines a Streamlit interface, FastAPI backend, task queue, LangGraph orchestration, MCP capabilities, and a local agent. Remote services coordinate the workflow while the local agent provides access to the user’s computer and workspace.',
    architecture: ['User', 'Streamlit UI', 'FastAPI backend', 'Task queue / backend state', 'Local agent on user computer', 'LangGraph', 'MCP', 'User workspace'],
    stack: ['Streamlit', 'FastAPI', 'LangGraph', 'MCP', 'Render', 'Multi-provider LLM fallback'],
    features: ['Natural-language coding tasks', 'Task planning', 'Workspace inspection', 'File reading, creation, and editing', 'Allow-listed command execution', 'Tool calling and MCP', 'Human-in-the-loop approval', 'Verification and retry/error handling', 'Task queue and progress tracking', 'Chat threads and history', 'Authentication'],
    outcome: null,
    executionNote: 'The Streamlit UI, FastAPI backend, and Render API are remote. The local agent and local workspace access remain on the user’s computer, so the complete coding workflow is not fully cloud-hosted.',
    links: { ...emptyLinks(), live: 'https://codingagent-2ua8wkixrewzgkf6synxr5.streamlit.app/', github: 'https://github.com/ritikmishra004/coding_agent', apiDocs: 'https://coding-agent-api-7nr2.onrender.com/docs' },
    featured: true, demoType: 'streamlit', requiresLocalSetup: true, visual: { kind: 'architecture', image: null }, metrics: [],
    caseStudy: [
      { label: 'Overview', content: 'An agentic AI coding assistant built around a remote API and a local execution environment.' },
      { label: 'What it does', content: 'It handles natural-language coding tasks, plans work, inspects a workspace, reads and edits files, executes allow-listed commands, and tracks progress through a task queue.' },
      { label: 'Request lifecycle', content: 'A request enters through Streamlit, is coordinated by the FastAPI backend and task state, reaches the local agent, and is orchestrated through LangGraph and MCP before verification and response.' },
      { label: 'Planner and tool calling', content: 'The workflow separates planning from execution and uses tool calling to select workspace, file, command, and MCP capabilities.' },
      { label: 'LangGraph orchestration', content: 'LangGraph coordinates the agent path, execution steps, verification, retries, and error handling.' },
      { label: 'MCP architecture', content: 'The system supports MCP tools, resources, and prompts, including dynamic MCP tool discovery.' },
      { label: 'Safety and approval', content: 'Human-in-the-loop approval, command allow-lists, and workspace/path protection constrain actions that affect the local environment.' },
      { label: 'Local agent', content: 'The local agent is the boundary that provides access to the user’s computer and workspace. Complete coding execution depends on it.' },
      { label: 'Deployment', content: 'The Streamlit interface and FastAPI service are deployed remotely, with the API available through Render. The local agent is not replaced by that deployment.' },
      { label: 'Local setup', content: 'Local setup documentation and a verified local-run resource have not been supplied yet.' }
    ]
  },
  {
    slug: 'enterprise-rag-knowledge-assistant', title: 'Enterprise RAG Knowledge Assistant', category: 'Generative AI', eyebrow: 'Retrieval + generation',
    summary: 'A document-grounded knowledge assistant that ingests common business files, retrieves relevant context, and generates grounded answers.',
    problem: 'Users need a practical way to ask questions over documents without sending the entire document collection into every model request.',
    solution: 'The application loads supported documents, splits them into overlapping chunks, creates normalized BGE-small-en-v1.5 embeddings on CPU, stores them in FAISS, retrieves the top four matches, and supplies the built context to Gemini 2.5 Flash.',
    architecture: ['User', 'Streamlit', 'Document loader', 'RecursiveCharacterTextSplitter', 'BGE-small-en-v1.5 embeddings', 'FAISS', 'Top-4 similarity retrieval', 'Context building', 'Gemini 2.5 Flash', 'Grounded answer'],
    stack: ['Streamlit', 'LangGraph', 'FAISS', 'BAAI/bge-small-en-v1.5', 'Gemini 2.5 Flash'],
    features: ['PDF, DOCX, TXT, Markdown, and CSV ingestion', 'Chunk size 1000', 'Chunk overlap 200', 'CPU embeddings', 'Normalized embeddings', 'Top-k retrieval of 4', 'Thread-based state'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://rag-knowledge-base-assistant-8pyr4gmuisqreops6p4ud3.streamlit.app/', github: 'https://github.com/ritikmishra004/RAG-Knowledge-Base-Assistant' },
    featured: true, demoType: 'streamlit', requiresLocalSetup: false, visual: { kind: 'pipeline', image: null }, metrics: [], screenshots: [
      { src: '/projects/enterprise-rag/overview.webp', alt: 'Enterprise RAG Knowledge Assistant application overview', label: 'Overview' },
      { src: '/projects/enterprise-rag/knowledge-base.webp', alt: 'Enterprise RAG Knowledge Assistant knowledge base screen', label: 'Knowledge base' },
      { src: '/projects/enterprise-rag/chat.webp', alt: 'Enterprise RAG Knowledge Assistant chat screen', label: 'Chat' }
    ],
    caseStudy: [
      { label: 'Problem', content: 'Knowledge spread across PDFs, DOCX files, text, Markdown, and CSV needs a focused retrieval workflow before an LLM can answer questions over it.' },
      { label: 'Solution', content: 'The assistant turns uploaded documents into searchable chunks, retrieves the most similar context, and generates an answer using that context.' },
      { label: 'Document ingestion', content: 'The loader supports PDF, DOCX, TXT, Markdown, and CSV documents.' },
      { label: 'Chunking and embeddings', content: 'Documents use a chunk size of 1000 with 200-token overlap. BAAI/bge-small-en-v1.5 creates normalized CPU embeddings.' },
      { label: 'Retrieval and generation', content: 'FAISS retrieves the top four similar chunks. The context builder passes those results to Gemini 2.5 Flash at temperature 0.3.' },
      { label: 'LangGraph orchestration', content: 'The workflow is organized as retrieve, build_context, and generate_answer, with thread-based state.' },
      { label: 'Challenges and learnings', content: 'The implementation makes the ingestion, retrieval, and generation stages explicit so the grounded-answer path remains easy to inspect.' }
    ]
  },
  {
    slug: 'ai-blog-writing-agent', title: 'AI Blog Writing Agent', category: 'Generative AI', eyebrow: 'Content workflow',
    summary: 'A LangGraph-based multi-step content generation system that routes topics, researches when needed, and produces structured Markdown.',
    problem: 'Blog generation needs different levels of research depending on the topic, followed by planning and consistent section-level writing.',
    solution: 'The workflow routes a topic into closed-book, hybrid, or open-book generation, gathers structured evidence when research is required, plans the article, runs parallel section workers, and reduces their output into final Markdown.',
    architecture: ['User topic', 'Router', 'Closed book / research', 'Tavily research when required', 'Evidence', 'Blog planner', 'Fan-out workers', 'Reducer', 'Final Markdown'],
    stack: ['Python', 'Streamlit', 'LangGraph', 'Google Gemini 2.5 Flash', 'LangChain', 'Tavily', 'Pydantic', 'Pandas', 'Markdown'],
    features: ['Intelligent topic routing', 'Closed-book mode', 'Hybrid mode', 'Open-book mode', 'Adaptive web research', 'Structured evidence', 'Planning', 'Parallel section generation', 'Reducer / merge stage', 'Markdown output'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://blogwritingagent-jcamuzwwxcw7xa7pam3mal.streamlit.app/', github: 'https://github.com/ritikmishra004/Blog_writing_agent' },
    featured: true, demoType: 'streamlit', requiresLocalSetup: false, visual: { kind: 'pipeline', image: null }, metrics: [], screenshots: [
      { src: '/projects/blog-writing-agent/main.webp', alt: 'AI Blog Writing Agent application overview', label: 'Main' },
      { src: '/projects/blog-writing-agent/plan.webp', alt: 'AI Blog Writing Agent planning screen', label: 'Plan' },
      { src: '/projects/blog-writing-agent/evidence.webp', alt: 'AI Blog Writing Agent evidence screen', label: 'Evidence' },
      { src: '/projects/blog-writing-agent/markdown-preview.webp', alt: 'AI Blog Writing Agent Markdown preview', label: 'Markdown preview' }
    ],
    caseStudy: [
      { label: 'Problem', content: 'A useful writing workflow must decide when research is necessary and keep research, planning, and section generation coordinated.' },
      { label: 'Solution', content: 'The agent combines routing, optional Tavily research, structured evidence, planning, parallel workers, and a reducer into one LangGraph workflow.' },
      { label: 'Routing and research', content: 'The router selects closed-book, hybrid, or open-book generation. Tavily research is used when the selected workflow requires it.' },
      { label: 'Evidence and planning', content: 'Research results become structured evidence that informs the blog plan before section generation begins.' },
      { label: 'Fan-out workers and reducer', content: 'Section workers generate parts of the article in parallel, then the reducer merges them into final Markdown.' },
      { label: 'Final output', content: 'The Streamlit application produces a structured Markdown blog from the coordinated workflow.' },
      { label: 'Challenges and learnings', content: 'The workflow demonstrates how routing and fan-out / reducer patterns can make multi-step content generation adaptive and composable.' }
    ]
  },
  {
    slug: 'multi-utility-ai-chatbot', title: 'Multi-Utility AI Chatbot', category: 'Generative AI', eyebrow: 'Tool-using assistant',
    summary: 'A multi-tool GenAI assistant combining PDF RAG, web search, stock lookup, calculator tools, and LangGraph workflows.',
    problem: 'A useful assistant may need to answer questions over documents, search the web, retrieve stock prices, and calculate values within the same conversation.',
    solution: 'The Streamlit UI routes requests through LangGraph and Gemini 2.5 Flash, which can call dedicated RAG, search, stock, and calculator tools while preserving thread-based conversation state.',
    architecture: ['Streamlit UI', 'LangGraph', 'Gemini 2.5 Flash', 'Tool calling', 'PDF RAG', 'Web search', 'Stock lookup', 'Calculator'],
    stack: ['Python', 'Streamlit', 'LangChain', 'LangGraph', 'Gemini 2.5 Flash', 'FAISS', 'HuggingFace Sentence Transformers', 'SQLite', 'PyPDF', 'DuckDuckGo Search', 'Alpha Vantage API'],
    features: ['PDF RAG', 'Semantic search', 'Document ingestion and chunking', 'FAISS similarity search', 'Web search', 'Stock price lookup', 'Calculator', 'Multi-turn conversations', 'Thread-based chat history', 'Persistent conversation checkpoints', 'Thread-wise PDF indexing', 'Streaming responses', 'Tool execution status UI'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://multi-utility-ai-chatbot-8qwdzbu2jaruvv8beyabde.streamlit.app/', github: 'https://github.com/ritikmishra004/multi-utility-ai-chatbot' },
    featured: true, demoType: 'streamlit', requiresLocalSetup: false, visual: { kind: 'tools', image: null }, metrics: [],
    caseStudy: [
      { label: 'Overview', content: 'A multi-utility assistant that combines document retrieval and external tools in a single LangGraph workflow.' },
      { label: 'Tools', content: 'The assistant exposes four tools: PDF RAG, web search, stock price lookup, and calculator.' },
      { label: 'Architecture', content: 'The Streamlit UI sends requests through LangGraph to Gemini 2.5 Flash, which uses tool calling to select the RAG, search, stock, or calculator path.' },
      { label: 'Conversation state', content: 'SQLite-backed checkpoints provide persistent, thread-based chat history and thread-wise PDF indexing.' },
      { label: 'Capabilities', content: 'The application supports document ingestion, semantic search, streaming responses, and visible tool execution status.' }
    ]
  },
  {
    slug: 'sms-spam-detection', title: 'SMS Spam Detection', category: 'Machine Learning', eyebrow: 'NLP / binary text classification',
    summary: 'A binary text-classification project for distinguishing SMS spam from legitimate messages.', problem: null,
    solution: 'The project applies text preprocessing and TF-IDF features, compares models, explores ensemble learning, and serializes the model and vectorizer for application use.',
    architecture: ['SMS message', 'Text preprocessing', 'TF-IDF features', 'Model comparison / ensemble learning', 'Spam or ham prediction'],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'NLTK', 'Matplotlib', 'Seaborn', 'WordCloud', 'XGBoost'],
    features: ['Spam / ham classification', 'Text preprocessing', 'TF-IDF', 'Model comparison', 'Ensemble learning', 'WordCloud', 'Model and vectorizer serialization'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://sms-spam-detector-agg7blqezyjyqmyjot3est.streamlit.app/', github: 'https://github.com/ritikmishra004/SMS-Spam-Detector' },
    featured: false, demoType: 'streamlit', requiresLocalSetup: false, caseStudy: [], visual: { kind: 'pipeline', image: null }, metrics: []
  },
  {
    slug: 'customer-churn-prediction', title: 'Customer Churn Prediction', category: 'Machine Learning', eyebrow: 'Binary classification',
    summary: 'A binary-classification application that predicts customer churn from customer, service, contract, and billing features.', problem: null,
    solution: 'The project trains a classification model on the Telco Customer Churn dataset, serializes the model, and exposes real-time predictions through Streamlit.',
    architecture: ['Customer, service, contract, and billing inputs', 'Classification model', 'Serialized model', 'Streamlit real-time prediction'],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'Pickle'],
    features: ['Binary classification', 'Telco Customer Churn dataset', 'Customer / service / contract / billing features', 'Model serialization', 'Streamlit real-time prediction'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://customer-churn-prediction-i4wsiccfqbtkm8cxefmd5u.streamlit.app/', github: 'https://github.com/ritikmishra004/Customer-Churn-Prediction' },
    featured: false, demoType: 'streamlit', requiresLocalSetup: false, caseStudy: [], visual: { kind: 'metrics', image: null }, metrics: []
  },
  {
    slug: 'movie-recommendation-system', title: 'Movie Recommendation System', category: 'Machine Learning', eyebrow: 'Content-based recommendations',
    summary: 'A content-based recommendation system that finds similar movies from metadata and fetches posters through TMDB.', problem: null,
    solution: 'The system combines movie metadata into tags, applies Porter stemming and CountVectorizer, ranks items with cosine similarity, and uses TMDB for poster fetching.',
    architecture: ['Movie metadata', 'Tags from genres, keywords, overview, cast, and director', 'CountVectorizer', 'Cosine similarity', 'Top 5 recommendations', 'TMDB poster fetching'],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'NLTK', 'Streamlit', 'Requests', 'TMDB API'],
    features: ['Content-based recommendation', 'Porter stemming', 'CountVectorizer', 'Cosine similarity', 'Top 5 similar movies', 'Streamlit UI', 'TMDB poster fetching', 'Pickle-based processed data'],
    outcome: null, executionNote: null,
    links: { ...emptyLinks(), live: 'https://movie-recommender-system-anentxf3gaesfdmpqnkhnh.streamlit.app/', github: 'https://github.com/ritikmishra004/movie-recommender-system' },
    featured: false, demoType: 'streamlit', requiresLocalSetup: false, caseStudy: [], visual: { kind: 'pipeline', image: null }, metrics: []
  },
  {
    slug: 'car-price-prediction', title: 'Car Price Prediction', category: 'Machine Learning', eyebrow: 'Machine Learning — Regression',
    summary: 'A machine learning model that predicts used-car selling prices from vehicle and ownership-related features.',
    problem: 'Used-car pricing depends on a mix of vehicle, ownership, and usage features that need consistent preprocessing before regression.',
    solution: 'The project removes duplicate records, performs EDA and feature engineering, builds a preprocessing pipeline with One-Hot Encoding, applies a log transformation to the target, and trains an XGBoost Regressor.',
    architecture: ['4,340 original records', '3,577 unique records after duplicate removal', 'Feature engineering', 'One-Hot Encoding pipeline', 'Log-transformed target', 'XGBoost Regressor', 'R² and MAE evaluation', '5-fold cross-validation'],
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    features: ['Car brand / model', 'Car age', 'Kilometers driven', 'Fuel type', 'Seller type', 'Transmission', 'Previous owners', 'Kilometers driven per year'],
    outcome: 'Test R²: 0.793 · 5-fold Cross-Validation R²: 0.777', executionNote: 'No live demo is available. The serialized model artifact is car_price_model.pkl.',
    links: { ...emptyLinks(), live: 'https://car-price-prediction-3z49.onrender.com', github: 'https://github.com/ritikmishra004/car-price-prediction' },
    featured: false, demoType: null, requiresLocalSetup: false, visual: { kind: 'metrics', image: null },
    metrics: [{ label: 'Test R²', value: '0.793' }, { label: '5-fold CV R²', value: '0.777' }, { label: 'Unique records', value: '3,577' }], caseStudy: [
      { label: 'Dataset', content: 'The dataset contains 4,340 original records and 3,577 unique records after duplicate removal.' },
      { label: 'Work performed', content: 'The project includes EDA, data manipulation and preprocessing, a car age feature, car model / brand features, and kilometers driven per year.' },
      { label: 'Modeling', content: 'Categorical features use One-Hot Encoding in a preprocessing pipeline. The target is log-transformed before training an XGBoost Regressor.' },
      { label: 'Evaluation', content: 'The model was evaluated with R² and MAE, with 5-fold cross-validation used to assess generalization.' },
      { label: 'Model artifact', content: 'The serialized model artifact is car_price_model.pkl.' }
    ]
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug || (slug === 'rag-chatbot' && project.slug === 'enterprise-rag-knowledge-assistant'));
