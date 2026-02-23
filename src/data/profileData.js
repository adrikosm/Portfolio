import resume from "../assets/Resume.pdf";

export const profileData = {
  lastUpdated: "2026-02-20",
  identity: {
    name: "Andreas Mavropoulos",
    role: "Data Engineer",
    location: "Frankfurt, Germany",
    company: "Alpha FMC",
    resume,
    resumeFileName: "Andreas_Mavropoulos_Resume.pdf"
  },
  about: {
    greeting: "Hi, I am",
    description:
      "Data Engineer at Alpha FMC designing end-to-end data platforms across ingestion, transformation, testing, observability, and CI/CD. I build Snowflake + dbt systems processing 2M+ records from 10+ source systems, with a focus on reliability, cost control, and clear technical ownership. I am currently growing into broader architecture ownership and open-source data tooling contributions.",
    roleTypewriter: ["Data Engineer", "Pipeline Architect", "Snowflake + dbt Specialist"],
    stats: [
      { number: "4+", label: "Years Experience" },
      { number: "10+", label: "Source Systems Integrated" },
      { number: "8h → 4m", label: "Pipeline Runtime Improvement" }
    ],
    imageCards: [
      { icon: "Server", title: "Scalable", subtitle: "Data Platforms" },
      { icon: "TrendingUp", title: "Measurable", subtitle: "Business Impact" }
    ]
  },
  impactMetrics: {
    title: "Impact Highlights",
    subtitle: "Quantified outcomes from production data engineering systems.",
    cards: [
      {
        id: "cost_reduction",
        value: "55%",
        label: "Snowflake Cost Reduction",
        context: "Lowered compute spend through query profiling, incremental modeling, and warehouse right-sizing.",
        timeframe: "2024-2026",
        provenance: "Snowflake query history and monthly billing trend"
      },
      {
        id: "quality_incidents",
        value: "60%",
        label: "Fewer Data Quality Incidents",
        context: "Implemented 50+ dbt tests and upstream validation checks across critical domains.",
        timeframe: "2024-2026",
        provenance: "Production incident logs and post-mortem tracking"
      },
      {
        id: "realtime_throughput",
        value: "50K/min",
        label: "Real-Time Throughput",
        context: "Kafka + Spark streaming pipeline with exactly-once semantics and sub-second latency.",
        timeframe: "2025",
        provenance: "Pipeline telemetry and streaming consumer metrics"
      },
      {
        id: "sql_reduction",
        value: "60%",
        label: "SQL Codebase Reduction",
        context: "Standardized shared transformations through reusable dbt macro patterns.",
        timeframe: "2024-2025",
        provenance: "Repository comparison before and after macro rollout"
      },
      {
        id: "migration_automation",
        value: "4h → 7m",
        label: "Migration Automation Time",
        context: "Automated Snowpark migration workflow for repetitive manual steps.",
        timeframe: "2025",
        provenance: "Internal runbook timing benchmarks"
      }
    ]
  },
  skills: {
    title: "Technologies & Tools",
    subtitle: "Production stack for warehouse modeling, orchestration, streaming, and cloud delivery.",
    tools: [
      { name: "Python", iconKey: "python", color: "#3776AB", category: "core" },
      { name: "SQL", iconKey: "database", color: "#00758F", category: "core" },
      { name: "dbt", iconKey: "gears", color: "#FF694B", category: "core" },
      { name: "Snowflake", iconKey: "snowflake", color: "#29B5E8", category: "core" },
      { name: "PostgreSQL", iconKey: "database", color: "#336791", category: "core" },
      { name: "Azure", iconKey: "microsoft", color: "#0078D4", category: "cloud" },
      { name: "AWS", iconKey: "aws", color: "#FF9900", category: "cloud" },
      { name: "Google Cloud", iconKey: "server", color: "#4285F4", category: "cloud" },
      { name: "Docker", iconKey: "docker", color: "#2496ED", category: "cloud" },
      { name: "Git", iconKey: "git", color: "#F05032", category: "cloud" },
      { name: "Kafka", iconKey: "arrows", color: "#231F20", category: "streaming" },
      { name: "Spark", iconKey: "fire", color: "#E25A1C", category: "streaming" },
      { name: "Airflow", iconKey: "diagram", color: "#017CEE", category: "orchestration" },
      { name: "Dagster", iconKey: "gears", color: "#6C72E0", category: "orchestration" },
      { name: "Streamlit", iconKey: "chart", color: "#FF4B4B", category: "orchestration" },
      { name: "Jinja", iconKey: "fileCode", color: "#B41717", category: "additional" },
      { name: "Terraform", iconKey: "sitemap", color: "#7B42BC", category: "additional" },
      { name: "Flutter", iconKey: "mobile", color: "#02569B", category: "additional" },
      { name: "ETL Pipelines", iconKey: "server", color: "#10B981", category: "concepts" },
      { name: "Data Architecture", iconKey: "sitemap", color: "#8B5CF6", category: "concepts" }
    ],
    footerStats: [
      { value: "20+", label: "Technologies Used" },
      { value: "5", label: "Teams Using Shared dbt Macros" },
      { value: "2M+", label: "Records in Active Pipelines" }
    ],
    note:
      "Focused on robust, observable, and scalable data platforms, with clear documentation and practical onboarding support for teams."
  },
  experience: {
    title: "Work Experience",
    subtitle:
      "Building production data systems with measurable delivery impact, clearer architecture, and reliable stakeholder outcomes.",
    roles: [
      {
        id: 1,
        title: "Data Engineer",
        company: "Alpha FMC",
        location: "Frankfurt, Germany",
        period: "2022 - Present",
        current: true,
        achievements: [
          "Architected enterprise Snowflake warehouse layers processing 2M+ records across 10+ source systems with dbt transformations.",
          "Re-architected core Dagster + dbt pipeline flow, removed redundant joins, and reduced runtime from 8 hours to 4 minutes.",
          "Designed Snowpark migration automation that reduced migration windows from ~4 hours to ~7 minutes with constraint-safe execution.",
          "Reduced data quality incidents by 60% by implementing 50+ dbt tests across schema, referential, and business-rule validation.",
          "Built reusable dbt macro library (20+ macros) adopted by 5 teams, reducing SQL code from ~15K to ~6K lines and speeding delivery.",
          "Optimized Snowflake workloads (5TB -> ~50GB scan patterns), reducing compute costs by 55% while improving runtime stability.",
          "Implemented Kafka + Spark structured streaming pipelines handling 50K events/minute with sub-second latency.",
          "Delivered Azure DevOps CI/CD improvements with safer rollout patterns, slimmer CI checks, and stronger deployment reliability.",
          "Authored diagram-led technical documentation, mentored new joiners, and improved client communication cadence in sprint delivery."
        ],
        technologies: [
          "dbt",
          "Snowflake",
          "Snowpark",
          "Azure",
          "Python",
          "SQL",
          "Dagster",
          "Kafka",
          "Spark",
          "Docker",
          "Terraform",
          "Azure DevOps"
        ]
      },
      {
        id: 2,
        title: "Full stack Web Developer",
        company: "Top Vision",
        location: "Athens, Greece",
        period: "July 2016 – July 2017",
        current: false,
        achievements: [
          "Converted mockups into usable web presence using HTML5, CSS3, JavaScript, PHP and MySQL",
          "Successfully identified, diagnosed and fixed website problems including broken links, typographical errors and formatting issues",
          "Broadly optimized PHP code base by updating functions, making application load faster",
          "Greatly reduced server requests by implementing sprites"
        ],
        technologies: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL"]
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    subtitle: "Production data engineering work with clear tradeoffs, constraints, and measurable outcomes.",
    items: [
      {
        id: 1,
        title: "Enterprise Data Warehouse Platform",
        description: "Built multi-TB Snowflake + dbt platform processing 2M+ records across 10+ source systems",
        longDescription:
          "Led the design of a production Snowflake + dbt platform that unified fragmented source systems into reliable analytical models and delivery-ready assets.",
        problem:
          "Data was fragmented across systems, delivery cycles were slow, and quality issues were surfacing too late in release stages.",
        architecture:
          "Snowflake warehouse layers with modular dbt transformations, Dagster asset orchestration, and CI gates in Azure DevOps.",
        constraints:
          "Needed to scale across 10+ source systems while maintaining predictable runtimes and strict data quality requirements.",
        decisions:
          "Prioritized reusable model patterns, high-risk quality checks, and incremental rollout to keep teams moving without regressions.",
        results:
          "Established a stable enterprise data foundation with faster delivery, stronger trust in outputs, and better cross-team adoption.",
        stack: ["dbt", "Snowflake", "Dagster", "Azure DevOps", "SQL", "Data Quality"],
        icon: "Database",
        gradient: "linear-gradient(135deg, #0077B3 0%, #A3D1E0 100%)",
        linkStatus: "private",
        proofNote:
          "Delivered in an enterprise environment. Public source is restricted; detailed walkthrough is available on request.",
        achievements: [
          "Modeled and delivered 2M+ records across 10+ source systems",
          "Implemented 50+ dbt tests and reduced data quality incidents by 60%",
          "Integrated quality gates into CI/CD for safer production releases",
          "Enabled consistent delivery through modular transformations and orchestration patterns",
          "Produced practical documentation to support onboarding and project handovers"
        ],
        improvements: "Implement a semantic layer to abstract metric definitions further upstream, reducing dashboard-level logic reliance.",
        badges: ["quality", "cost"],
        github: ""
      },
      {
        id: 2,
        title: "dbt Macro Library & Code Standardization",
        description: "Cut SQL code by 60% building reusable Jinja macros for shared transformation patterns",
        longDescription:
          "Standardized repeated SQL patterns into a shared dbt macro layer and reduced maintenance overhead across multiple projects.",
        problem:
          "Transformation logic was duplicated across many models, creating high maintenance cost and inconsistent behavior.",
        architecture:
          "Reusable Jinja macros packaged for team-wide dbt adoption.",
        constraints:
          "Needed backward compatibility while gradually refactoring legacy models.",
        decisions:
          "Prioritized high-frequency patterns first, then rolled out incrementally with documentation.",
        results:
          "60% SQL code reduction, faster onboarding, and more consistent modeling practices across teams.",
        stack: ["dbt", "Jinja", "SQL", "Snowflake", "Code Optimization"],
        icon: "Settings",
        gradient: "linear-gradient(135deg, #00b9e8 0%, #0077B3 100%)",
        linkStatus: "private",
        proofNote:
          "Built for internal teams and distributed as a private package. You can request an architecture and macro-pattern walkthrough.",
        achievements: [
          "Created 20+ production-ready Jinja macros",
          "Reduced SQL code from 15K to 6K lines",
          "Reduced new model delivery time by 40%",
          "Adopted by 5 teams across shared transformation workflows",
          "Managed compatibility during phased refactor"
        ],
        improvements: "Automate cross-team macro testing using lightweight CI/CD integration environments instead of manual PR checks.",
        badges: ["throughput", "quality"],
        github: ""
      },
      {
        id: 3,
        title: "Snowflake Cost & Performance Optimization",
        description: "Reduced Snowflake compute cost by 55% with targeted query and model optimization",
        longDescription:
          "Performed end-to-end query profiling and model optimization focused on cost and runtime improvements across large fact-table workloads.",
        problem:
          "Warehouse spend and query runtimes were increasing due to large scans and inefficient model patterns.",
        architecture:
          "Incremental dbt model strategy plus Snowflake clustering and warehouse right-sizing.",
        constraints:
          "Had to preserve data correctness while significantly reducing scan footprint.",
        decisions:
          "Prioritized high-cost queries first and converted heavy full-refresh models to incremental.",
        results:
          "55% lower compute cost with faster query performance and improved workload stability.",
        stack: ["dbt", "Snowflake", "SQL", "Performance Tuning", "Cost Optimization"],
        icon: "Zap",
        gradient: "linear-gradient(135deg, #A3D1E0 0%, #0077B3 100%)",
        linkStatus: "private",
        proofNote:
          "Optimization work was performed against production customer systems. Public benchmarks and methodology are available on request.",
        achievements: [
          "Reduced compute cost by 55%",
          "Improved query performance by 35%",
          "Converted 5TB scans into ~50GB incremental workloads",
          "Right-sized warehouses based on workload profiles",
          "Improved consistency for peak-hour processing windows"
        ],
        improvements: "Introduce automated data profiling to trigger dynamic clustering or warehouse scaling adjustments autonomously.",
        badges: ["cost", "latency"],
        github: ""
      },
      {
        id: 4,
        title: "Real-Time Streaming Pipeline (Kafka + Spark)",
        description: "Built event pipeline processing 50K events/minute with sub-second latency",
        longDescription:
          "Implemented a resilient real-time ingestion and processing architecture for event analytics using Kafka and Spark Structured Streaming.",
        problem:
          "Batch analytics could not support low-latency operational reporting requirements.",
        architecture:
          "Kafka ingestion topics + Spark Structured Streaming processing with event-time watermarking.",
        constraints:
          "Needed exactly-once semantics while handling late events and rebalance events.",
        decisions:
          "Applied transactional handling and tuned consumer behavior for stable partition reassignments.",
        results:
          "50K events/minute throughput with sub-second end-to-end latency in production conditions.",
        stack: ["Kafka", "Spark", "Streaming", "Python", "Real-time Analytics"],
        icon: "Activity",
        gradient: "linear-gradient(135deg, #0077B3 0%, #00b9e8 100%)",
        linkStatus: "private",
        proofNote:
          "Streaming implementation and data contracts are confidential. A system design and failure-mode summary can be shared on request.",
        achievements: [
          "Processes 50K events/minute with <1 second latency",
          "Implemented exactly-once processing semantics",
          "Handled late-arriving events with watermark strategy",
          "Improved resilience during partition rebalancing",
          "Stabilized processing under high-load conditions"
        ],
        improvements: "Evaluate migrating to Apache Flink for more unified batch/stream APIs and simpler distributed state management.",
        badges: ["latency", "throughput"],
        github: ""
      },
      {
        id: 5,
        title: "Pipeline Re-Architecture (Dagster + dbt)",
        description: "Redesigned orchestration and transformation flow to reduce runtime from 8 hours to 4 minutes",
        longDescription:
          "Redesigned a critical Dagster + dbt execution path to remove flow bottlenecks and continuously optimize performance over multiple iterations.",
        problem:
          "Core benchmark pipeline runtimes were too slow for client delivery timelines and iteration speed.",
        architecture:
          "Asset-based Dagster orchestration with refactored dbt dependencies, slimmer joins, and optimized model sequencing.",
        constraints:
          "Improvements had to preserve data correctness while supporting parallel executions and project-specific locking.",
        decisions:
          "Used iterative runtime profiling, targeted model refactors, and lock/retry controls for safe concurrent runs.",
        results:
          "Pipeline runtime dropped from 8 hours to 4 minutes, materially improving turnaround for business users.",
        stack: ["Dagster", "dbt", "Snowflake", "Snowpark", "Python", "Pipeline Optimization"],
        icon: "Timer",
        gradient: "linear-gradient(135deg, #00b9e8 0%, #A3D1E0 100%)",
        linkStatus: "private",
        proofNote:
          "Built against confidential production pipelines. I can share optimization methodology and before/after architecture details in a private walkthrough.",
        achievements: [
          "Reduced runtime from 8 hours to 20 minutes, then 10, and now 4 minutes",
          "Removed redundant joins and restructured model dependencies",
          "Improved run safety with participation lock and retry logic",
          "Added richer runtime logging and observability for bottleneck analysis",
          "Improved documentation for repeatable operational handover"
        ],
        improvements: "Apply finer-grained software-defined assets per source system table to unlock targeted data freshness policies.",
        badges: ["latency", "cost"],
        github: ""
      }
    ]
  },
  certifications: {
    title: "Education & Certifications",
    subtitle: "Academic foundation with continuous learning in data and AI systems.",
    items: [
      {
        id: 1,
        type: "degree",
        title: "B.Sc. Information and Technology",
        institution: "Harokopio University",
        location: "Athens, Greece",
        year: "Graduated",
        iconKey: "graduationCap",
        color: "#8b5cf6",
        description: "Comprehensive study in computer science, information systems, and data management."
      },
      {
        id: 2,
        type: "certificate",
        title: "Elements of AI",
        institution: "University of Helsinki",
        location: "Finland",
        year: "Certified",
        iconKey: "certificate",
        color: "#00b9e8",
        description: "Foundations of AI, machine learning, and neural network concepts."
      }
    ],
    stats: ["1 Degree", "1+ Certification", "Continuous Learning"]
  },
  interests: {
    title: "Beyond Code",
    subtitle: "What drives me outside of data engineering",
    quote: "A well-rounded engineer brings diverse perspectives to problem-solving",
    items: [
      { id: 1, name: "Strongman", iconKey: "dumbbell", color: "#ef4444", description: "Discipline & Strength" },
      { id: 2, name: "Fantasy Books", iconKey: "book", color: "#8b5cf6", description: "Imagination & Learning" },
      { id: 3, name: "Traveling", iconKey: "plane", color: "#00b9e8", description: "Exploration & Culture" },
      { id: 4, name: "Culinary Arts", iconKey: "utensils", color: "#f59e0b", description: "Creativity & Taste" },
      { id: 5, name: "Cinema", iconKey: "film", color: "#10b981", description: "Stories & Art" }
    ]
  }
};
