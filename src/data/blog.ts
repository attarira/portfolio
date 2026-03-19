export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; text: string; language: string }
  | { type: "list"; items: string[] };

export interface Blog {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  preview: string;
  tags: string[];
  link?: string;
  content: ContentBlock[];
}

export const blogs: Blog[] = [
  {
    slug: "designing-autonomous-agents",
    title: "Designing Autonomous AI Agents for Software Engineering",
    date: "Mar 5, 2026",
    readTime: "3 min read",
    preview: "I've been spending way too many late nights building AI coding assistants, and I'm fascinated by the jump from simple autocomplete to full-blown autonomous agents. Here's a brain dump on what I've learned about getting them to actually navigate codebases and debug without going off the rails.",
    tags: ["AI Agents", "LLMs", "Software Engineering"],
    content: [
      {
        type: "paragraph",
        text: "Honestly, watching Large Language Models evolve from just spitting out boilerplate code to acting like true autonomous agents has been wild. I remember the first time I got an agent to successfully debug a nasty recursion issue on its own—it genuinely felt like magic. Instead of just guessing the next word, these systems can take a vague goal, come up with a plan, and actually execute it across an entire codebase."
      },
      {
        type: "heading",
        text: "The Agent Loop: Plan, Act, Observe"
      },
      {
        type: "paragraph",
        text: "The core of it all is the reasoning loop. Rather than just a one-and-done prompt, the agent actually interacts with the environment—kind of like how I'd tackle a new bug. It comes up with a plan, uses tools (like popping open a terminal or reading a file), looks at the output, and adjusts. If it hits an error, it re-evaluates. Seeing it stumble, read the error message, and fix its own mistake is honestly my favorite part to build."
      },
      {
        type: "heading",
        text: "Tool Use and Environment Interaction"
      },
      {
        type: "paragraph",
        text: "But an LLM stuck in a chat box can't actually fix a bug for you. It needs hands. Giving these models tools—like the ability to run terminal commands or execute tests—is what bridges the gap. I recently had a bug where the agent kept wiping out a config file because it misunderstood a grep command. Teaching the model when to use which tool without it accidentally deleting its own working directory is a constant, hilarious challenge."
      },
      {
        type: "heading",
        text: "Managing Working Memory"
      },
      {
        type: "paragraph",
        text: "Then there's the memory problem. You can't just shove a massive 500-file repo into a prompt and expect it to work nicely. I've spent weeks tearing my hair out trying to get agents to page context in and out of their 'working memory'. Using semantic search and giving them a little 'scratchpad' to write down findings has been a game-changer for me."
      },
      {
        type: "paragraph",
        text: "Building this stuff has totally changed how I think about coding. I'm no longer writing step-by-step instructions; I'm setting a goal, giving it the right tools, and crossing my fingers as it figures out the rest."
      }
    ]
  },
  {
    slug: "beyond-vector-search",
    title: "Beyond Vector Search: When RAG Needs a Knowledge Graph",
    date: "Feb 5, 2026",
    readTime: "2 min read",
    preview:
      "I've been playing around a lot with RAG lately, but honestly, simple vector search kept failing me whenever I asked anything mildly complex. Here's a quick look into some late-night experiments I did stringing together SpanBERT and Gemini to build a lightweight knowledge graph, and how it completely fixed my search relevance issues.",
    tags: ["LLM", "RAG", "Knowledge Graphs"],
    content: [
      {
        type: "paragraph",
        text: "Retrieval-Augmented Generation (RAG) is everywhere right now. Initially, I just followed the standard playbook: chunk the text, toss it into text-embedding-ada-002, and force-feed the top matches into the context window. Sounds great on paper, right? But the moment I tried it on some messy, interconnected technical docs at work, it completely fell apart."
      },
      {
        type: "heading",
        text: "The Problem with Pure Vector Similarity"
      },
      {
        type: "paragraph",
        text: "I realized the hard way that vector databases just measure semantic overlap, not actual facts. I remember asking my app, 'What does the Data Processor depend on?' and it just confidently spat out paragraphs that conveniently used both the words 'Data Processor' and 'depend' without actually giving me the answer. Trying to get it to do multi-hop reasoning—piecing together Fact A from one doc and Fact B from another—was a frustrating dead end."
      },
      {
        type: "heading",
        text: "Enter the Knowledge Graph (KG)"
      },
      {
        type: "paragraph",
        text: "So, out of sheer spite, I decided to try something else. I brewed some coffee and slapped together a script to extract entities and build a lightweight knowledge graph. Instead of brainlessly chunking text, my pipeline went through and hunted for actual relationships—(Subject) -> [Predicate] -> (Object) triplets."
      },
      {
        type: "list",
        items: [
          "Step 1: Use an LLM like Gemini or a fine-tuned SpanBERT to perform Named Entity Recognition (NER) and Relation Extraction (RE).",
          "Step 2: Store these triplets into a graph database (like Neo4j or even an in-memory networkx graph for smaller scopes).",
          "Step 3: During query time, parse the user's intent to extract query entities.",
          "Step 4: Traverse the graph to find neighbors of the queried entities up to 2-3 hops away."
        ]
      },
      {
        type: "heading",
        text: "Hybridizing Graph and Vector"
      },
      {
        type: "paragraph",
        text: "The real magic happens when you fuse both approaches. We maintain our vector store for unstructured semantic queries ('How does the deployment process feel?'), but we overlay the Graph RAG for structured traversal ('Which services break if the auth database goes down?')."
      },
      {
        type: "paragraph",
        text: "By pulling subgraph contexts (text representations of the relationships) and appending them alongside top vector chunks into the prompt, the LLM finally has the structural context it needs. The context window is utilized far more efficiently because we are injecting high-density, factually connected information rather than isolated paragraphs."
      },
      {
        type: "heading",
        text: "Future Directions"
      },
      {
        type: "paragraph",
        text: "As context windows grow to millions of tokens, some argue that RAG—and specifically complex architectures like GraphRAG—will become obsolete. While massive context helps, I firmly believe that structuring data logically at ingestion time reduces hallucination risks and computational costs. Graph-augmented RAG isn't just a workaround for small context windows; it's a fundamental step toward aligning AI systems with the actual structure of human knowledge."
      }
    ]
  },
  {
    slug: "deploying-hospital-at-home-ai",
    title: "The Reality of Deploying Hospital-at-Home AI",
    date: "Jan 5, 2026",
    readTime: "3 min read",
    preview:
      "It turns out that building an ML model in a Jupyter notebook is infinitely easier than actually deploying it to schedule real-life nurses and doctors. I spent months building a real-time scheduling engine for home healthcare, and here are the gritty, unglamorous lessons I learned about dynamic constraints and why MLOps actually matters.",
    tags: ["AI in Healthcare", "MLOps", "Scheduling Algorithms"],
    content: [
      {
        type: "paragraph",
        text: "I absolutely love the idea of 'Hospital at Home'. Why keep people in a gloomy, expensive hospital when they can recover on their own couch? The clinical data looks great, but let me tell you, the logistics behind the scenes are a total nightmare. You're basically taking a massive, centralized hospital building and scattering its nurses and medical gear all across the city."
      },
      {
        type: "heading",
        text: "The Traveling Nurse Problem"
      },
      {
        type: "paragraph",
        text: "The absolute hardest part for my team was the scheduling engine. It was basically the Traveling Salesperson Problem on steroids. We were trying to match clinicians to patients all day long, while juggling a crazy amount of constraints:"
      },
      {
        type: "list",
        items: [
          "Clinical constraints: A patient needing a specific IV medication must be seen by an RN with that specific competency.",
          "Time constraints: Vitals must be checked within specific tightly bound time-windows.",
          "Geographic constraints: Driving time through city traffic varies drastically by time of day.",
          "Continuity of care: Patients prefer seeing the same clinician, which builds trust and improves observational diagnosis."
        ]
      },
      {
        type: "heading",
        text: "Why Machine Learning Falls Short on its Own"
      },
      {
        type: "paragraph",
        text: "My first thought was, 'Let’s just throw Reinforcement Learning at it.' That was a terrible idea. We quickly learned that in healthcare, rules are non-negotiable. If an RL model 'hallucinates' or tries to explore a funky new route that makes a nurse late for a critical medication window, things go very wrong, very fast. It was a sobering realization."
      },
      {
        type: "paragraph",
        text: "We ended up pivoting to operations research and mixed-integer linear programming. We kept the ML, but only used it to predict things like task duration and traffic delays based on weather or time of day. The actual scheduling was handled by a rock-solid, deterministic solver. Finding that hybrid approach—ML for the messy predictions and OR for the strict rules—was a huge 'aha' moment for me."
      },
      {
        type: "heading",
        text: "MLOps in a High-Stakes Environment"
      },
      {
        type: "paragraph",
        text: "Deploying this thing really opened my eyes to MLOps. Silent failures in a healthcare app literally mean doctors don't show up. We had to build in super rigorous drift detection. One time, a new clinical protocol rolled out, which meant visits took longer than usual. Our model started under-predicting durations, and schedules almost collapsed over a weekend. It was incredibly stressful, but a great lesson in monitoring."
      },
      {
        type: "paragraph",
        text: "We built shadow deployments where models ran concurrently with human schedulers, measuring the diffs between the algorithm's choices and human intuition. Over time, the algorithm's utilization rates surpassed the human baselines by explicitly capitalizing on geographic clustering that humans found too complex to visualize on the fly."
      },
      {
        type: "heading",
        text: "Takeaways"
      },
      {
        type: "paragraph",
        text: "At the end of the day, building AI for this stuff isn't about bragging about massive neural networks. It's about building a failsafe system that doesn't break when reality gets messy. Writing the code was honestly the easy part; translating the chaotic, physical reality of a hospital into logic was what kept me up at night."
      }
    ]
  }
];
