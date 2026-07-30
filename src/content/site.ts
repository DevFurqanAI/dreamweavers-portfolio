import type {
  ClientLogo,
  ProjectConcept,
  Service,
  TeamMember,
  IndustryMode,
} from "@/types/content";

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;

export const services: Service[] = [
  {
    slug: "ai-apps-integration",
    title: "AI Apps & Integration",
    shortTitle: "AI systems",
    summary:
      "Intelligent applications and integrations designed to remove repetitive work and connect business knowledge to everyday operations.",
    signal: "Think · connect · automate",
    status: "needs-client-approval",
  },
  {
    slug: "software-business-systems",
    title: "Software, ERP & CRM",
    shortTitle: "Business systems",
    summary:
      "Custom platforms that organize workflows, customer relationships, reporting and internal operations around the way a company actually works.",
    signal: "Structure · control · scale",
    status: "needs-client-approval",
  },
  {
    slug: "commerce-platforms",
    title: "E-commerce Platforms",
    shortTitle: "Digital commerce",
    summary:
      "Storefronts, catalogues and connected commerce experiences for brands that need a clearer path from product discovery to purchase.",
    signal: "Discover · decide · convert",
    status: "needs-client-approval",
  },
  {
    slug: "web-mobile",
    title: "Web & Mobile Products",
    shortTitle: "Digital products",
    summary:
      "Responsive websites, web applications and mobile products shaped around clear user journeys and maintainable engineering.",
    signal: "Design · build · evolve",
    status: "needs-client-approval",
  },
  {
    slug: "growth-marketing",
    title: "Growth & Marketing",
    shortTitle: "Growth systems",
    summary:
      "Lead generation, digital marketing and measurable customer journeys connected to the systems that teams use to follow through.",
    signal: "Reach · learn · grow",
    status: "needs-client-approval",
  },
  {
    slug: "data-infrastructure",
    title: "Data Infrastructure",
    shortTitle: "Data foundations",
    summary:
      "Database management and reliable information architecture that make digital products easier to operate, understand and extend.",
    signal: "Capture · organize · trust",
    status: "needs-client-approval",
  },
];

export const projectConcepts: ProjectConcept[] = [
  {
    index: "01",
    title: "Commerce ecosystem",
    summary:
      "A future case study showing how storefront, catalogue, payments and growth systems can operate as one connected experience.",
    services: ["E-commerce", "Design", "Automation"],
    status: "needs-client-approval",
  },
  {
    index: "02",
    title: "Operations platform",
    summary:
      "A future case study for a tailored ERP or CRM platform, focused on workflows, reporting and operational visibility.",
    services: ["Software", "ERP / CRM", "Data"],
    status: "needs-client-approval",
  },
  {
    index: "03",
    title: "Intelligent product",
    summary:
      "A future case study for an AI-enabled web or mobile product that turns complex information into useful daily actions.",
    services: ["AI", "Web app", "Integration"],
    status: "needs-client-approval",
  },
];

export const clients: ClientLogo[] = [
  { name: "Khan Textile", image: "khan-texttlie.png", status: "verified" },
  { name: "Toyota Multan Motors", image: "logo5.png", status: "verified" },
  { name: "Topsun Bazar", image: "topsun.png", status: "verified" },
  { name: "SOS Security", image: "SOS.png", status: "verified" },
  { name: "Foober Agro Enterprises", image: "foober-2.png", status: "verified" },
  { name: "DHA Multan", image: "DHA-1.png", status: "verified" },
  { name: "Realtix ERP", image: "real.png", status: "verified" },
  { name: "ZN Associates", image: "ZN.png", status: "verified" },
  { name: "Royal Commercial Center", image: "Royal-Commercial.png", status: "verified" },
  { name: "Hexa Realtors & Builders", image: "Hexa-1.png", status: "verified" },
  { name: "Prism Arcade", image: "Prism.png", status: "verified" },
  { name: "U Shop2 Best Online", image: "Logo_1_New-1536x851.png", status: "verified" },
  { name: "HS Collection", image: "H-S-Logo-1536x1286.png", status: "verified" },
  { name: "Minumart", image: "minu.png", status: "verified" },
];

export const team: TeamMember[] = [
  {
    name: "Muhammad Hassan Jahangir",
    role: "CEO & Founder",
    image: "hassanJ.jpg",
    status: "verified",
  },
  {
    name: "Khawar Javaid",
    role: "E-commerce Lead",
    image: "khawar.jpeg",
    status: "verified",
  },
  {
    name: "Muhammad Mohsin",
    role: "Software Lead",
    image: "Mohsin.jpg",
    status: "verified",
  },
  {
    name: "Muhammad Hasnain Jahangir",
    role: "Design Lead",
    image: "Hasnain.jpg",
    status: "verified",
  },
];

export const industries: IndustryMode[] = [
  {
    id: "agro",
    index: "01",
    title: "Agro chemicals",
    signal: "Field intelligence",
    summary: "Digital systems that connect product information, field teams, distributors and operational reporting without fragmenting the workflow.",
    focus: ["Distribution", "Field operations", "Reporting"],
    accent: "#6f8890",
  },
  {
    id: "automotive",
    index: "02",
    title: "Automotive & manufacturing",
    signal: "Production visibility",
    summary: "Connected workflows for inventory, dealer operations, manufacturing visibility and the customer journey around complex products.",
    focus: ["Operations", "Inventory", "Dealer systems"],
    accent: "#476f7d",
  },
  {
    id: "commerce",
    index: "03",
    title: "E-commerce",
    signal: "Catalogue to conversion",
    summary: "Commerce experiences that coordinate catalogue, storefront, payments, fulfilment and growth as one customer-facing system.",
    focus: ["Storefront", "Automation", "Growth"],
    accent: "#5f8290",
  },
  {
    id: "enterprise",
    index: "04",
    title: "Enterprises",
    signal: "Connected operations",
    summary: "Purpose-built platforms that bring teams, data, approvals and reporting into a clearer operating environment.",
    focus: ["ERP / CRM", "Workflows", "Data"],
    accent: "#355f70",
  },
  {
    id: "fintech",
    index: "05",
    title: "Fintech",
    signal: "Clarity and control",
    summary: "Interfaces and systems shaped around trustworthy information, secure user journeys and operational visibility.",
    focus: ["Dashboards", "Integrations", "UX systems"],
    accent: "#527985",
  },
  {
    id: "healthcare",
    index: "06",
    title: "Health care",
    signal: "Human-centred systems",
    summary: "Clear digital journeys for information, coordination and service delivery, designed around people rather than software complexity.",
    focus: ["Service journeys", "Records", "Communication"],
    accent: "#78949c",
  },
  {
    id: "retail",
    index: "07",
    title: "Retail",
    signal: "Unified customer flow",
    summary: "Connected retail experiences spanning discovery, stock visibility, customer relationships and post-purchase operations.",
    focus: ["Customer data", "Inventory", "Commerce"],
    accent: "#65838b",
  },
  {
    id: "real-estate",
    index: "08",
    title: "Real estate",
    signal: "Property intelligence",
    summary: "Digital platforms that organise listings, leads, project information and relationship management across long sales cycles.",
    focus: ["Lead systems", "Listings", "CRM"],
    accent: "#486c77",
  },
  {
    id: "smes",
    index: "09",
    title: "SMEs",
    signal: "Practical scale",
    summary: "Focused digital products that replace scattered manual work with systems a growing team can understand and maintain.",
    focus: ["Automation", "Visibility", "Growth"],
    accent: "#6c8a92",
  },
  {
    id: "startups",
    index: "10",
    title: "Startups",
    signal: "From idea to traction",
    summary: "Fast, structured product development that turns an early concept into a testable digital experience with room to evolve.",
    focus: ["MVP", "Product design", "Iteration"],
    accent: "#3e6877",
  },
];

export const processSteps = [
  { number: "01", title: "Discover", copy: "Find the real constraint, the users involved and the result the product must create." },
  { number: "02", title: "Frame", copy: "Turn scattered requirements into a visible system, scope and technical direction." },
  { number: "03", title: "Design", copy: "Prototype the interactions, visual language and information hierarchy before complexity grows." },
  { number: "04", title: "Build", copy: "Develop in testable slices, connecting interface, data and operational workflows." },
  { number: "05", title: "Launch", copy: "Ship with measurement, documentation and a clear path for iteration after release." },
] as const;
