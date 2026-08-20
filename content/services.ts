import type { Service } from './types';

/**
 * The ten services Dream Weavers publishes.
 *
 * `title`, `shortDescription`, `capabilities` and the `included` entries are
 * the client's own copy, taken verbatim from their service pages.
 * `processSteps` and `faqs` are written for this build and
 * describe only how the work is run — they state no prices, guarantees,
 * delivery timelines, or performance figures the client has not published.
 * tests/unit/content.test.ts enforces that.
 */
export const services: Service[] = [
  {
    slug: 'ai-apps-integration',
    title: 'AI Apps & Integration',
    icon: 'fa-solid fa-robot',
    shortDescription:
      'Smart AI solutions and seamless app integrations that make your business faster, smarter, and more efficient',
    capabilities: [
      'Machine Learning (ML) Services',
      'Natural Language Processing (NLP) Services',
      'Computer Vision Services',
      'Speech & Conversational AI Services',
      'Generative AI Services',
      'Robotic Process Automation (RPA) + AI',
      'AI-Powered Analytics & Decision Support',
      'AI in Cybersecurity',
      'Autonomous Systems',
    ],
    highlights: [
      'Machine learning',
      'Computer vision',
      'Conversational AI',
      'Process automation',
    ],
    heroImage: '/img/services/ai-apps-integration.webp',
    body: [
      'Dream Weavers empower businesses through powerful applications and seamless integrations that drive efficiency, innovation, and growth.',
      'AI works best when it sits inside the systems you already run rather than beside them. We start from the workflow that costs your team the most time, then build the model, the integration, and the interface around it.',
    ],
    included: [
      { title: 'Smart AI Applications', description: 'Build custom AI-powered apps for predictive analytics, automation, and personalization.' },
      { title: 'Seamless Integration', description: 'Connect AI capabilities with your existing systems for smooth adoption.' },
      { title: 'Business Growth & Efficiency', description: 'Enhance speed, intelligence, and innovation to drive sustainable success.' },
    ],
    processSteps: [
      { title: 'Audit', description: 'We map your current tools, data sources, and where manual effort accumulates.' },
      { title: 'Design', description: 'We specify the integration surface and agree the measure of success before building.' },
      { title: 'Build', description: 'Implementation against your real data, with error handling and retries.' },
      { title: 'Adopt', description: 'Rollout with monitoring, documentation, and training so your team can run it.' },
    ],
    faqs: [
      { question: 'Do we need to replace our current software?', answer: 'No. Integrations are built around the platforms you already use, so existing systems stay in place.' },
      { question: 'What data do you need to get started?', answer: 'Access to the workflow in question and a representative sample of its data. We agree the scope and handling of that access in writing first.' },
      { question: 'Can AI features be added to an existing app?', answer: 'Yes. Adding capability to a running product is a common starting point, and usually lower risk than a rebuild.' },
    ],
    seo: {
      title: 'AI Apps & Integration',
      description:
        'Custom AI applications and seamless integrations — machine learning, NLP, computer vision, and automation built into the systems you already run.',
    },
  },

  {
    slug: 'database-management',
    title: 'Database Management & Administration',
    icon: 'fa-solid fa-database',
    shortDescription:
      'Secure, efficient, and reliable database solutions that keep your business data organized and accessible',
    capabilities: [
      'Database Administration & Maintenance',
      'Cloud Database Services',
      'Data Security & Compliance Services',
      'Data Integration & ETL Services',
      'Database Monitoring & Support',
      'Database Architecture & Design',
      'Big Data & Advanced Database Services',
      'Migration & Modernization Services',
    ],
    highlights: [
      'Architecture & design',
      'Cloud databases',
      'Security & compliance',
      'Migration',
    ],
    heroImage: '/img/services/database-management.webp',
    body: [
      'We provide secure and efficient database management solutions that organize, protect, and optimize business data for reliable performance and informed decision-making.',
      'Most data problems are structural rather than technical: the same record living in three systems, or a report nobody trusts. We work on the architecture first, then the administration that keeps it healthy.',
    ],
    included: [
      { title: 'Secure & Reliable Data Management', description: 'Protect and organize business data for consistent access and performance.' },
      { title: 'Optimized & Scalable Solutions', description: 'Database design, monitoring, backup, and administration for high efficiency.' },
      { title: 'Informed Decision-Making', description: 'Enable businesses to focus on growth with accurate, well-managed information.' },
    ],
    processSteps: [
      { title: 'Assess', description: 'Review the current schema, query patterns, and backup position.' },
      { title: 'Design', description: 'Architecture and indexing strategy matched to how the data is actually read.' },
      { title: 'Migrate', description: 'Validated transfer with rollback available at every stage.' },
      { title: 'Monitor', description: 'Ongoing administration, alerting, and performance tuning.' },
    ],
    faqs: [
      { question: 'Can you work with our existing database?', answer: 'Yes. Assessment and tuning of a running database is more common than a greenfield build.' },
      { question: 'How is data protected during a migration?', answer: 'Migrations run against a copy first and are validated before any cutover, so the original remains intact until the new system is verified.' },
      { question: 'Do you support cloud and on-premise?', answer: 'Both, and hybrid arrangements where some data must stay on your own infrastructure.' },
    ],
    seo: {
      title: 'Database Management & Administration',
      description:
        'Secure database design, administration, migration, and monitoring from Dream Weavers — architecture, ETL, compliance, and cloud database services.',
    },
  },

  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'fa-solid fa-bullhorn',
    shortDescription:
      'Data-driven digital marketing that boosts visibility, engages audiences, and drives growth',
    capabilities: [
      'Advanced AI-Powered Marketing',
      'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM) / Paid Ads',
      'Social Media Marketing (SMM)',
      'Content Marketing',
      'Email Marketing',
      'Influencer & Affiliate Marketing',
      'Conversion Rate Optimization (CRO)',
      'Analytics & Performance Tracking',
      'Mobile Marketing',
    ],
    highlights: [
      'SEO',
      'Paid search',
      'Social',
      'Conversion',
    ],
    heroImage: '/img/services/digital-marketing.webp',
    body: [
      'Dream Weavers helps brands grow by crafting digital marketing strategies that connect with the right audience, build trust, and deliver real results.',
      'Channels are chosen against where your customers already are, not against a fixed package. Reporting is tied to the outcome you care about rather than to impressions.',
    ],
    included: [
      { title: 'Smart Digital Strategies', description: 'Using websites, social media, search engines, email, and mobile apps to boost visibility and drive traffic.' },
      { title: 'Result-Driven Approach', description: 'Our focus is on boosting visibility, driving qualified traffic, and generating measurable results that translate into growth.' },
      { title: 'Trust & Growth', description: 'By listening and understanding your goals, we craft solutions that build trust, strengthen your digital presence, and help your business shine.' },
    ],
    processSteps: [
      { title: 'Listen', description: 'We start from your goals and your customers, not from a channel list.' },
      { title: 'Plan', description: 'Channel mix, messaging, and the metric each activity is accountable to.' },
      { title: 'Run', description: 'Campaign execution across the agreed channels.' },
      { title: 'Report', description: 'Performance tracking against the agreed measure, with the plan adjusted from what the data shows.' },
    ],
    faqs: [
      { question: 'Which channels will you recommend?', answer: 'That depends on where your audience already spends attention. We agree the mix after the discovery stage rather than before it.' },
      { question: 'How is performance reported?', answer: 'Against the measure agreed at the planning stage — qualified traffic, enquiries, or sales, depending on the goal.' },
      { question: 'Do you work alongside an in-house team?', answer: 'Yes. We can lead the whole function or support a specific channel your team does not cover.' },
    ],
    seo: {
      title: 'Digital Marketing',
      description:
        'SEO, paid search, social, content, email, and conversion optimisation — digital marketing built around your audience and measured against your goals.',
    },
  },

  {
    slug: 'erp-crm-software',
    title: 'ERP/CRM Software',
    icon: 'fa-solid fa-diagram-project',
    shortDescription:
      'Smart ERP & CRM solutions that streamline operations and strengthen customer relationships',
    capabilities: [
      'CRM Implementation & Setup',
      'Lead & Sales Pipeline Management',
      'Customer Support & Helpdesk Automation',
      'CRM Marketing Automation',
      'CRM Integration Services',
      'CRM Data & Analytics',
      'Custom ERP Development',
      'Custom CRM Development',
      'Migration & Modernization',
      'Training & Change Management',
    ],
    highlights: [
      'Custom ERP',
      'Custom CRM',
      'Integration',
      'Migration',
    ],
    heroImage: '/img/services/erp-crm-software.webp',
    body: [
      'We deliver ERP and CRM solutions that streamline operations, enhance collaboration, and provide actionable insights to drive smarter business decisions.',
      'ERP modules cover finance and accounting, HR and payroll, supply chain and procurement, inventory and warehouse, manufacturing, project management, and compliance reporting. CRM covers sales and marketing automation, customer support, contact management, loyalty, and analytics.',
      'Deployment can be cloud-based, on-premise, or hybrid, with mobile apps for Android and iOS where field teams need them.',
    ],
    included: [
      { title: 'Streamlined Operations', description: 'Manage resources, automate workflows, and centralize business processes.' },
      { title: 'Enhanced Collaboration', description: 'Improve team efficiency and strengthen customer relationships.' },
      { title: 'Actionable Insights', description: 'Track performance and make smarter, data-driven business decisions.' },
    ],
    processSteps: [
      { title: 'Consult', description: 'Business process mapping, workflow analysis, and identifying gaps in existing systems.' },
      { title: 'Architect', description: 'ERP/CRM architecture design and roadmap, with deployment strategy agreed up front.' },
      { title: 'Build & integrate', description: 'Module development plus integration with e-commerce, accounting, payroll, and payment systems.' },
      { title: 'Train & support', description: 'Role-based training, documentation, and ongoing maintenance as the business evolves.' },
    ],
    faqs: [
      { question: 'Do you implement existing platforms or build custom?', answer: 'Both. We deploy platforms such as Salesforce, HubSpot, Zoho, and Microsoft Dynamics, and we build custom ERP and CRM where an off-the-shelf product does not fit the process.' },
      { question: 'Can our legacy system be migrated?', answer: 'Yes. Legacy migration with validated data transfer, and re-engineering older applications into cloud-ready solutions, are both part of the service.' },
      { question: 'Will our team be able to use it?', answer: 'Adoption is treated as part of the delivery: role-based training sessions, user manuals, video tutorials, and a change management plan.' },
    ],
    seo: {
      title: 'ERP/CRM Software',
      description:
        'Custom ERP and CRM development and implementation — finance, HR, supply chain, sales automation, and support, deployed cloud, on-premise, or hybrid.',
    },
  },

  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    icon: 'fa-solid fa-filter',
    shortDescription:
      'Targeted lead generation that fills your sales pipeline with qualified prospects',
    capabilities: [
      'Prospect identification and qualification',
      'Professional telemarketing outreach',
      'Cold calling and appointment setting',
      'Lead nurturing and follow-up',
      'Sales pipeline development',
      'Data-driven targeting',
    ],
    highlights: [
      'Prospecting',
      'Telemarketing',
      'Appointments',
      'Nurturing',
    ],
    heroImage: '/img/services/lead-generation.webp',
    body: [
      'We drive business growth by generating qualified leads and building meaningful client connections through targeted, data-driven telemarketing strategies.',
      'The work is qualification as much as volume. Prospects are researched and screened against your criteria before outreach, so your sales team spends its time on conversations worth having.',
    ],
    included: [
      { title: 'Targeted Lead Generation', description: 'Identify, qualify, and nurture prospects with data-driven strategies.' },
      { title: 'Professional Telemarketing', description: 'From cold calling to appointment setting, we create meaningful client connections.' },
      { title: 'Business Growth Focus', description: 'Nurturing leads to boost sales pipelines, increase engagement, and deliver measurable results.' },
    ],
    processSteps: [
      { title: 'Define', description: 'Agree the profile of a qualified prospect for your business.' },
      { title: 'Research', description: 'Build and verify a target list against that profile.' },
      { title: 'Outreach', description: 'Structured telemarketing and follow-up sequences.' },
      { title: 'Hand over', description: 'Qualified leads and booked appointments passed to your sales team with context.' },
    ],
    faqs: [
      { question: 'What counts as a qualified lead?', answer: 'The criteria are set with you at the definition stage, so qualification means what it means in your business rather than a generic standard.' },
      { question: 'Which markets do you cover?', answer: 'Outreach is run for global clients. The target market is agreed as part of defining the prospect profile.' },
      { question: 'Do leads come into our CRM?', answer: 'Yes. Delivery into your existing CRM is part of the handover, and we also build CRM systems if you do not have one.' },
    ],
    seo: {
      title: 'Lead Generation',
      description:
        'Qualified lead generation and professional telemarketing — prospect identification, cold calling, appointment setting, and lead nurturing.',
    },
  },

  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    icon: 'fa-solid fa-mobile-screen',
    shortDescription:
      'High-performance mobile apps that engage users and grow your business on the go',
    capabilities: [
      'Native Mobile App Development',
      'Cross-Platform App Development',
      'Hybrid App Development',
      'Progressive Web Apps (PWAs)',
      'Enterprise Mobile App Development',
      'Mobile Game Development',
      'Mobile App UI/UX Design',
      'App Maintenance & Support',
      'Mobile App Testing & QA',
      'AI, AR/VR, IoT and blockchain-enabled apps',
    ],
    highlights: [
      'Native',
      'Cross-platform',
      'UI/UX design',
      'QA & support',
    ],
    heroImage: '/img/services/mobile-app-development.webp',
    body: [
      'We build secure, scalable, and engaging mobile apps that blend sleek design with powerful functionality to drive business growth.',
      'Native, cross-platform, and hybrid are all on the table; which one is right depends on how much device capability the product needs and how you intend to maintain it. We make that call with you rather than defaulting to one stack.',
    ],
    included: [
      { title: 'Engaging Mobile Experiences', description: 'High-performance apps for iOS and Android with sleek design and seamless functionality.' },
      { title: 'Tailored Solutions', description: 'Custom-built to align with your business goals and keep customers engaged on the go.' },
      { title: 'End-to-End Development', description: 'From concept and UI/UX to secure, scalable deployment that grows with your business.' },
    ],
    processSteps: [
      { title: 'Concept', description: 'Define the product, its users, and the platforms it needs to reach.' },
      { title: 'Design', description: 'UI/UX design and prototyping before any production code is written.' },
      { title: 'Build & test', description: 'Development with QA and device testing throughout.' },
      { title: 'Release & support', description: 'Store deployment, then maintenance and updates as the platforms change.' },
    ],
    faqs: [
      { question: 'Native or cross-platform?', answer: 'It depends on the device features you need and your maintenance plan. We recommend one at the concept stage and explain the trade-off rather than defaulting.' },
      { question: 'Do you handle App Store and Play Store submission?', answer: 'Yes, deployment is part of the release stage, including the store listing requirements.' },
      { question: 'What happens after launch?', answer: 'Maintenance and support are offered as an ongoing service, covering OS updates, fixes, and new features.' },
    ],
    seo: {
      title: 'Mobile App Development',
      description:
        'Native, cross-platform, and hybrid mobile apps from Dream Weavers — iOS and Android development, UI/UX design, QA, and ongoing app support.',
    },
  },

  {
    slug: 'shopify-store-development',
    title: 'Shopify Store Development',
    icon: 'fa-brands fa-shopify',
    shortDescription:
      'Fully customized, ready-to-launch Shopify stores with winning products, integrated marketing, payments, and SEO',
    capabilities: [
      'Shopify Store Setup & Configuration',
      'Custom Shopify Development',
      'Shopify Theme Design & Customization',
      'Shopify App Integration',
      'Shopify Migration Services',
      'Shopify SEO & Marketing Services',
      'Shopify Maintenance & Support',
      'Shopify Plus Enterprise Services',
      'Shopify Analytics & Conversion Optimization',
      'Shopify Dropshipping Services',
      'Logistics',
    ],
    highlights: [
      'Store setup',
      'Theme design',
      'Migration',
      'SEO & marketing',
    ],
    heroImage: '/img/services/shopify-store-development.webp',
    body: [
      'We create fully customized, ready-to-launch Shopify stores with winning products, integrated marketing, payments, and SEO to drive sales and business growth.',
      "Whether you're starting a new online store or growing an existing business, we help you set up, design, and manage your Shopify store with ease.",
      'Two investment models are available for stores we build and run: the 50/50 Shopify Plan, where you invest and we handle the rest, and the Monthly Return Plan.',
    ],
    included: [
      { title: 'Complete Store Setup', description: 'Premium Shopify store with 30+ winning products, custom logo, SEO, social media integration, and full customization.' },
      { title: 'Marketing & Payments', description: 'Ready ad accounts (TikTok & Meta), COD & card payment integration for seamless transactions.' },
      { title: 'Growth & Scalability', description: 'Optimized to deliver smooth shopping experiences, boost sales, and scale with your business growth.' },
    ],
    processSteps: [
      { title: 'Product research', description: 'Identify and validate the product range the store will launch with.' },
      { title: 'Store build', description: 'Theme design and customisation, branding, and full store configuration.' },
      { title: 'Marketing & payments', description: 'Ad account setup, plus COD and card payment integration.' },
      { title: 'Launch & optimise', description: 'Go live, then analytics and conversion optimisation against real traffic.' },
    ],
    faqs: [
      { question: 'Can you migrate an existing store to Shopify?', answer: 'Yes. Shopify migration is part of the service, covering products, customers, and order history.' },
      { question: 'What does the store launch with?', answer: 'A premium Shopify store with 30+ winning products, a custom logo, SEO, social media integration, and full customisation.' },
      { question: 'What are the investment plans?', answer: 'Two models are published: the 50/50 Shopify Plan, where you invest and we handle the rest, and the Monthly Return Plan. Terms are discussed directly.' },
    ],
    seo: {
      title: 'Shopify Store Development',
      description:
        'Ready-to-launch Shopify stores from Dream Weavers — store setup, theme customisation, winning products, payments, SEO, migration, and Shopify Plus.',
    },
  },

  {
    slug: 'software-development',
    title: 'Software Development',
    icon: 'fa-solid fa-code',
    shortDescription:
      'Tailored software solutions that streamline your operations and drive business growth',
    capabilities: [
      'Custom Web Application Development',
      'Mobile Application Development',
      'Enterprise Software Development',
      'SaaS (Software as a Service) Development',
      'AI & Machine Learning Solutions',
      'Cloud Application Development',
      'API & System Integration',
      'Database Development & Management',
      'Software Testing & QA Services',
      'UI/UX Design & Prototyping',
    ],
    highlights: [
      'Web apps',
      'Enterprise',
      'SaaS',
      'Cloud & APIs',
    ],
    heroImage: '/img/services/software-development.webp',
    body: [
      'We develop custom web, mobile, ERP/CRM, database, and AI-powered solutions that streamline operations and boost business efficiency for startups and enterprises.',
      'Industry-specific work covers healthcare, finance, e-commerce, education, logistics and manufacturing, where the process rarely fits a generic product.',
    ],
    included: [
      { title: 'Custom Solutions', description: 'Web and mobile applications built with iOS, Android, Flutter, and React Native.' },
      { title: 'Smart Business Systems', description: 'ERP/CRM platforms and robust database development for streamlined operations.' },
      { title: 'AI-Powered Innovation', description: 'Automation and intelligent solutions to enhance efficiency and growth.' },
    ],
    processSteps: [
      { title: 'Discover', description: 'Understand the process the software has to serve and where it currently breaks.' },
      { title: 'Prototype', description: 'UI/UX design and prototyping to agree the shape before committing to a build.' },
      { title: 'Develop', description: 'Iterative development with testing and QA running alongside.' },
      { title: 'Maintain', description: 'Support, updates, and new modules as the business changes.' },
    ],
    faqs: [
      { question: 'Do you work with startups as well as enterprises?', answer: 'Yes. The published focus is startups and enterprises alike, with scope and architecture set to match the stage the business is at.' },
      { question: 'Can you take over an existing codebase?', answer: 'Yes. Maintenance, modernisation, and extension of existing systems are part of the service.' },
      { question: 'How is quality assured?', answer: 'Software testing and QA are a distinct part of the service rather than a final step, running alongside development.' },
    ],
    seo: {
      title: 'Software Development',
      description:
        'Custom software development from Dream Weavers — web and mobile applications, enterprise systems, SaaS, cloud, APIs, and industry-specific solutions.',
    },
  },

  {
    slug: 'web-development',
    title: 'Web Development',
    icon: 'fa-solid fa-laptop-code',
    shortDescription:
      'Modern, responsive websites designed to engage users and drive business growth',
    capabilities: [
      'Custom Website Development',
      'E-commerce Website Development',
      'Front-End Development',
      'Back-End Development',
      'CMS-Based Website Development',
      'Web Application Development',
      'Website Maintenance & Support',
      'Web Hosting & Deployment Services',
      'Web Performance & SEO Optimization',
      'UI/UX Design & Prototyping',
    ],
    highlights: [
      'Custom builds',
      'E-commerce',
      'CMS',
      'Performance & SEO',
    ],
    heroImage: '/img/services/web-development.webp',
    body: [
      'We design and develop dynamic, responsive, and secure websites tailored to your business goals. Our web solutions combine modern design with powerful functionality to ensure fast performance, seamless navigation, and an engaging user experience.',
      'From corporate websites to advanced web applications, we build platforms that are scalable, SEO-friendly, and optimized to drive growth in the digital space.',
      'Custom builds use React, Angular, Vue.js, Laravel, Django, and .NET; e-commerce covers Shopify, WooCommerce, Magento, and BigCommerce; CMS work covers WordPress, Joomla, and Drupal.',
    ],
    included: [
      { title: 'Modern & Responsive Design', description: 'Dynamic websites with seamless navigation and engaging user experience.' },
      { title: 'Secure & Scalable', description: 'Robust platforms built to grow with your business needs.' },
      { title: 'SEO-Friendly & Growth-Oriented', description: 'Optimized websites designed to drive traffic and digital growth.' },
    ],
    processSteps: [
      { title: 'Wireframe', description: 'Wireframes and mockups to settle structure and conversion path first.' },
      { title: 'Build', description: 'Front-end and back-end development, with API work and security optimisation.' },
      { title: 'Optimise', description: 'Speed optimisation, on-page SEO, and mobile accessibility.' },
      { title: 'Deploy & maintain', description: 'Hosting setup, domain, CI/CD pipelines, then updates, backups, and security checks.' },
    ],
    faqs: [
      { question: 'Which technologies do you build on?', answer: 'React, Angular, Vue.js, Laravel, Django, and .NET for custom builds; WordPress, Joomla, and Drupal for CMS projects; Shopify, WooCommerce, Magento, and BigCommerce for e-commerce.' },
      { question: 'Will the site be manageable by our own team?', answer: 'Yes, where a CMS is the right fit. We build on WordPress, Joomla, or Drupal specifically so content can be updated without a developer.' },
      { question: 'Do you provide hosting?', answer: 'Hosting setup, domain registration, and deployment pipelines are part of the service.' },
    ],
    seo: {
      title: 'Web Development',
      description:
        'Responsive, secure, SEO-friendly websites and web applications from Dream Weavers — custom builds, e-commerce, CMS, hosting, and ongoing maintenance.',
    },
  },

  {
    slug: 'ecommerce-investment-plans',
    title: 'E-commerce Investment Plans',
    icon: 'fa-solid fa-chart-line',
    shortDescription:
      'Structured e-commerce investment options — the 50/50 Shopify Plan and the Monthly Return Plan',
    capabilities: [
      '50/50 Shopify Plan',
      'Monthly Return Plan',
      'Store build and product research',
      'Marketing and ad account setup',
      'Payment and logistics integration',
      'Ongoing store management',
    ],
    highlights: [
      '50/50 Shopify Plan',
      'Monthly Return Plan',
      'Store operation',
      'Reporting',
    ],
    heroImage: '/img/services/ecommerce-investment-plans.webp',
    body: [
      'Dream Weavers publishes two structured models for clients who want an e-commerce store built and operated rather than handed over: the 50/50 Shopify Plan, described as "you invest, we handle the rest", and the Monthly Return Plan, described as "invest once, reap monthly".',
      'Both plans build on the same Shopify store development service — product research, store build, marketing, payments, and logistics — and differ in how the arrangement is structured.',
    ],
    included: [
      { title: '50/50 Shopify Plan', description: 'You invest, we handle the rest — store build, products, marketing, and operations.' },
      { title: 'Monthly Return Plan', description: 'Invest once, reap monthly.' },
      { title: 'Full store operation', description: 'Product research, store build, ad accounts, payment integration, and logistics.' },
    ],
    processSteps: [
      { title: 'Discuss', description: 'Understand your goals and which of the two plans fits them.' },
      { title: 'Agree terms', description: 'Structure, commitments, and reporting are agreed in writing before anything begins.' },
      { title: 'Build & launch', description: 'The store is researched, built, and taken live.' },
      { title: 'Operate & report', description: 'Ongoing management of the store, with regular reporting to you.' },
    ],
    faqs: [
      { question: 'What is the difference between the two plans?', answer: 'The 50/50 Shopify Plan is described as "you invest, we handle the rest". The Monthly Return Plan is described as "invest once, reap monthly". The specific terms of each are discussed directly.' },
      { question: 'What are the commercial terms?', answer: 'Terms are not published and are agreed case by case. Contact the team on WhatsApp or by email to discuss them.' },
      { question: 'Who operates the store?', answer: 'Dream Weavers builds and runs the store under both plans, covering products, marketing, payments, and logistics.' },
    ],
    seo: {
      title: 'E-commerce Investment Plans',
      description:
        'The 50/50 Shopify Plan and Monthly Return Plan — structured e-commerce investment models covering store build, marketing, payments, and operations.',
    },
  },
];
