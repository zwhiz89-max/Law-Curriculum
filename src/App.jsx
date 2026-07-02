import { useState, useEffect, useRef } from "react";

const curriculum = [
  {
    id: "contracts", code: "LAW 101", title: "Contracts", semester: 1, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    businessRelevance: "Essential for every business deal, vendor agreement, employment offer, and partnership.",
    overview: "The law governing binding agreements — formation, performance, breach, and remedies. The backbone of commercial life.",
    keyConceptsForBusiness: [
      "Offer, acceptance, and consideration — what makes a deal binding",
      "Battle of the forms (UCC § 2-207) — critical for procurement teams",
      "Conditions, representations, and warranties — how deals fall apart",
      "Anticipatory repudiation — when a counterparty signals they won't perform",
      "Expectation vs. reliance damages — what you can actually recover",
      "Liquidated damages clauses — enforceability and drafting traps",
    ],
    canonicalTextbook: { title: "Contracts: Cases and Materials", authors: "Farnsworth, Young, Sanger & Cohen", edition: "9th ed., 2013", note: "Standard at Columbia, Yale, and many top schools" },
    supplements: [
      { type: "Hornbook", title: "Contracts (Nutshell Series)", authors: "Blum", note: "Best quick-reference hornbook" },
      { type: "Hornbook", title: "E. Allan Farnsworth on Contracts", authors: "Farnsworth", note: "Definitive treatise; go deep on any doctrine" },
      { type: "Study Aid", title: "Examples & Explanations: Contracts", authors: "Blum", note: "Best for working through hypotheticals" },
    ],
    lectures: [
      { source: "Yale Law School", title: "Contracts – Open Yale Courses", url: "https://oyc.yale.edu/law", note: "Full recorded lecture series" },
      { source: "CrashCourse", title: "Contracts Overview (YouTube)", url: "https://www.youtube.com/watch?v=jVzBL69PLBY", note: "Accessible intro" },
      { source: "BARBRI / Themis", title: "1L Contracts Lecture Series", url: "https://www.youtube.com/@ThemisBarReview", note: "Bar prep quality, freely available" },
    ],
    primaryCases: [
      { name: "Hadley v. Baxendale (1854)", lesson: "Limits damages to foreseeable losses — defines consequential damages" },
      { name: "Lucy v. Zehmer (1954)", lesson: "Objective test for contract formation — mental reservations don't matter" },
      { name: "Jacob & Youngs v. Kent (1921)", lesson: "Substantial performance doctrine — minor deviations don't void contracts" },
      { name: "Frigaliment Importing Co. v. BNS (1960)", lesson: "Interpretation disputes — the 'chicken' case on ambiguity" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Introduction to Contract Law & Objective Theory", readings: "E&E Ch. 1–2 · Lucy v. Zehmer · Casebook Ch. 1 (pp. 1–40)", tasks: "Brief Lucy v. Zehmer (IRAC) · Compare to Embry v. Hargadine — when does conduct form a contract without words?" },
      { week: 2, topic: "Offer & Acceptance", readings: "E&E Ch. 3–4 · Casebook Ch. 2 (pp. 41–90) · Leonard v. Pepsico", tasks: "Brief Leonard v. Pepsico · Brief Lefkowitz v. Great Minneapolis Surplus Store — when is an advertisement a binding offer?" },
      { week: 3, topic: "Consideration & Bargained-For Exchange", readings: "E&E Ch. 5 · Casebook Ch. 3 (pp. 91–140) · Hamer v. Sidway", tasks: "Brief Hamer v. Sidway · Brief Dougherty v. Salt — distinguish gift promises from enforceable consideration" },
      { week: 4, topic: "Promissory Estoppel & Quasi-Contract", readings: "E&E Ch. 6 · Restatement §90 · Casebook Ch. 4 (pp. 141–175)", tasks: "E&E Problems 6.1–6.4 · Brief Hoffman v. Red Owl Stores — how far does promissory estoppel extend pre-contract?" },
      { week: 5, topic: "Statute of Frauds & Written Contracts", readings: "E&E Ch. 7 · UCC §2-201 · Casebook Ch. 5 (pp. 176–210)", tasks: "Brief DF Activities Corp. v. Brown · Brief Crabtree v. Elizabeth Arden — what writings satisfy the Statute of Frauds?" },
      { week: 6, topic: "Contract Interpretation & Parol Evidence", readings: "E&E Ch. 10 · Frigaliment v. BNS · Casebook Ch. 6 (pp. 211–260)", tasks: "Brief Frigaliment v. BNS in full · Brief Pacific Gas & Electric v. G.W. Thomas — compare the majority and dissent on parol evidence" },
      { week: 7, topic: "Conditions, Warranties & Representations", readings: "E&E Ch. 11–12 · Jacob & Youngs v. Kent · Casebook Ch. 7 (pp. 261–310)", tasks: "Brief Jacob & Youngs v. Kent · Brief Oppenheimer & Co. v. Oppenheim — when does a condition precedent excuse performance?" },
      { week: 8, topic: "Performance, Breach & Anticipatory Repudiation", readings: "E&E Ch. 13–14 · UCC §2-609 · Casebook Ch. 8 (pp. 311–360)", tasks: "E&E Problems 13.1–13.3 · Brief Hochster v. De La Tour — the original anticipatory repudiation case and its rationale" },
      { week: 9, topic: "Excuse Doctrines: Impossibility & Frustration", readings: "E&E Ch. 15 · Taylor v. Caldwell · Casebook Ch. 9 (pp. 361–400)", tasks: "Brief Taylor v. Caldwell · Brief Krell v. Henry — distinguish impossibility from frustration of purpose" },
      { week: 10, topic: "Expectation, Reliance & Restitution Damages", readings: "E&E Ch. 16–17 · Hadley v. Baxendale · Casebook Ch. 10 (pp. 401–450)", tasks: "Brief Hadley v. Baxendale · Brief Rockingham County v. Luten Bridge — apply the duty to mitigate to damages calculation" },
      { week: 11, topic: "Limitations on Damages & Equitable Remedies", readings: "E&E Ch. 18 · Casebook Ch. 11 (pp. 451–490) · Liquidated damages cases", tasks: "Brief Lake River Corp. v. Carborundum — when is a liquidated damages clause an unenforceable penalty? Apply both tests" },
      { week: 12, topic: "Review & Synthesis", readings: "E&E Review Problems · Nutshell summary chapters", tasks: "Full IRAC brief of Frigaliment and Hadley back-to-back · Write a one-page synthesis: how do formation, breach, and damages doctrine interact?" },
    ],
  },
  {
    id: "torts", code: "LAW 102", title: "Torts", semester: 1, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    businessRelevance: "Product liability, employment disputes, defamation, privacy, and the basis for insurance and risk management.",
    overview: "Civil wrongs that give rise to liability — negligence, intentional torts, and strict liability. The law of accidents and accountability.",
    keyConceptsForBusiness: [
      "Duty of care and the reasonable person standard",
      "Negligence per se — statutory violations as automatic breach",
      "Products liability (design defect, manufacturing defect, failure to warn)",
      "Respondeat superior — employer liability for employee acts",
      "Defamation and commercial disparagement — reputational harm",
      "Economic loss rule — when tort law steps back for contract",
    ],
    canonicalTextbook: { title: "Torts: Cases and Materials", authors: "Dobbs, Hayden & Bublick", edition: "3rd ed., 2013", note: "Used at Stanford, Michigan, Georgetown" },
    supplements: [
      { type: "Hornbook", title: "Torts (Nutshell)", authors: "Kionka", note: "Best compact reference" },
      { type: "Restatement", title: "Restatement (Third) of Torts", authors: "ALI", note: "Controlling authority in most jurisdictions" },
      { type: "Study Aid", title: "Examples & Explanations: Torts", authors: "Glannon", note: "Clear, practical hypos" },
    ],
    lectures: [
      { source: "Harvard Law School", title: "HLS — Torts Open Lectures", url: "https://hls.harvard.edu/library/research/find-a-database/multimedia/", note: "Archived lectures from HLS faculty" },
      { source: "Law School Toolbox", title: "Torts Podcast Series", url: "https://lawschooltoolbox.com/podcast/", note: "Covers every major doctrine clearly" },
      { source: "YouTube — LawShelf", title: "Torts Series", url: "https://lawshelf.com/courseware/", note: "Free, structured video lessons" },
    ],
    primaryCases: [
      { name: "Palsgraf v. Long Island R.R. (1928)", lesson: "Proximate cause — liability extends only to foreseeable plaintiffs" },
      { name: "Escola v. Coca Cola (1944)", lesson: "Strict products liability foundation — Traynor's famous concurrence" },
      { name: "United States v. Carroll Towing (1947)", lesson: "BPL formula for negligence — cost-benefit analysis of precaution" },
      { name: "Grimshaw v. Ford Motor Co. (1981)", lesson: "Punitive damages in products liability — the Pinto case" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Introduction to Tort Law & Intentional Torts I", readings: "E&E Ch. 1–2 · Casebook Ch. 1 (pp. 1–45) · Restatement §§13–21", tasks: "Brief Garratt v. Dailey — does an 8-year-old's certainty of harm satisfy battery intent? · Compare to Vosburg v. Putney" },
      { week: 2, topic: "Intentional Torts II: False Imprisonment, IIED", readings: "E&E Ch. 3 · Casebook Ch. 1 (pp. 46–90) · Restatement §46 (IIED)", tasks: "E&E Problems 2.1–2.4 · Brief Wilkinson v. Downton — the original IIED case and its intent requirement" },
      { week: 3, topic: "Negligence: Duty & the Reasonable Person", readings: "E&E Ch. 4–5 · Carroll Towing · Casebook Ch. 2 (pp. 91–140)", tasks: "Brief Carroll Towing · Brief Blyth v. Birmingham Waterworks — articulate the objective reasonable person standard" },
      { week: 4, topic: "Breach & Negligence Per Se", readings: "E&E Ch. 6 · Casebook Ch. 2 (pp. 141–185) · Restatement §286", tasks: "Brief Martin v. Herzog — when does violating a traffic statute automatically establish negligence? · Apply the test to an OSHA violation" },
      { week: 5, topic: "Causation: Actual Cause & Proximate Cause", readings: "E&E Ch. 7–8 · Palsgraf v. Long Island R.R. · Casebook Ch. 3 (pp. 186–240)", tasks: "Brief Palsgraf (Cardozo majority + Andrews dissent) · Brief Wagon Mound No. 1 — compare foreseeability tests across both cases" },
      { week: 6, topic: "Damages in Negligence", readings: "E&E Ch. 9 · Casebook Ch. 4 (pp. 241–280) · Restatement (Third) §§27–29", tasks: "E&E Problems 9.1–9.3 · Brief Duncan v. Kansas City Southern Railway — how do courts calculate non-economic damages?" },
      { week: 7, topic: "Products Liability: Manufacturing & Design Defects", readings: "E&E Ch. 14 · Escola v. Coca Cola · Casebook Ch. 7 (pp. 350–400)", tasks: "Brief Escola v. Coca Cola (Traynor concurrence) · Brief Greenman v. Yuba Power Products — trace how strict liability emerged from warranty law" },
      { week: 8, topic: "Products Liability: Failure to Warn & Defenses", readings: "E&E Ch. 14 (cont.) · Grimshaw v. Ford · Casebook Ch. 7 (pp. 401–445)", tasks: "Brief Grimshaw v. Ford Motor Co. · Brief Hood v. Ryobi America — apply the failure-to-warn test to the product facts" },
      { week: 9, topic: "Strict Liability: Abnormally Dangerous Activities", readings: "E&E Ch. 13 · Casebook Ch. 6 (pp. 310–349) · Restatement §20", tasks: "E&E Problems 13.1–13.2 · Brief Indiana Harbor Belt Railroad v. American Cyanamid — why did the court reject strict liability here?" },
      { week: 10, topic: "Defamation & Business Torts", readings: "E&E Ch. 19 · Casebook Ch. 9 (pp. 500–555) · NYT v. Sullivan (key holdings)", tasks: "Brief NYT v. Sullivan · Brief Milkovich v. Lorain Journal — distinguish protected opinion from actionable defamatory fact" },
      { week: 11, topic: "Vicarious Liability & Respondeat Superior", readings: "E&E Ch. 17 · Casebook Ch. 8 (pp. 446–499) · Restatement §7", tasks: "E&E Problems 17.1–17.3 · Brief Fruit v. Schreiner — when does an employee's deviation from assigned duties cut off employer liability?" },
      { week: 12, topic: "Review, Defenses & Synthesis", readings: "E&E Review Problems · Nutshell Ch. on contributory/comparative negligence and assumption of risk", tasks: "Full negligence analysis of Palsgraf and Carroll Towing side-by-side · Write a one-page synthesis: how do duty, breach, causation, and damages interact in the products liability context?" },
    ],
  },
  {
    id: "civil-procedure", code: "LAW 103", title: "Civil Procedure", semester: 1, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    businessRelevance: "Understand litigation risk, jurisdiction strategy, class actions, discovery obligations, and forum selection.",
    overview: "The rules governing how federal courts operate — from filing a complaint through trial and appeal. The 'rules of the game' for disputes.",
    keyConceptsForBusiness: [
      "Subject matter and personal jurisdiction — where you can be sued",
      "Forum selection clauses — controlling litigation venue",
      "Discovery obligations — what you must disclose and preserve",
      "Class action certification — exposure to aggregate liability",
      "Summary judgment standard — how cases are won before trial",
      "Res judicata and collateral estoppel — finality of judgments",
    ],
    canonicalTextbook: { title: "Civil Procedure", authors: "Freer & Perdue", edition: "8th ed., 2021", note: "Clear and modern; also Yeazell's casebook widely used" },
    supplements: [
      { type: "Hornbook", title: "Civil Procedure (Nutshell)", authors: "Kane", note: "Excellent compact survey" },
      { type: "Primary Source", title: "Federal Rules of Civil Procedure", authors: "FRCP", note: "Must-read primary source — read Rules 1-68" },
      { type: "Study Aid", title: "Examples & Explanations: Civil Procedure", authors: "Glannon", note: "Gold standard for Civ Pro" },
    ],
    lectures: [
      { source: "Stanford Law School", title: "Civil Procedure Lectures — YouTube", url: "https://www.youtube.com/watch?v=kMPKy4bRQqk", note: "Professor lectures from Stanford" },
      { source: "Quimbee", title: "Civil Procedure Course", url: "https://www.quimbee.com/courses/civil-procedure", note: "Video modules with case briefs" },
      { source: "Khan Academy / Prelaw Guru", title: "US Court System Explainers", url: "https://www.youtube.com/@PrelawGuru", note: "Strong foundation for procedural concepts" },
    ],
    primaryCases: [
      { name: "International Shoe Co. v. Washington (1945)", lesson: "Minimum contacts — when a state has personal jurisdiction over a company" },
      { name: "Pennoyer v. Neff (1878)", lesson: "Foundational jurisdiction doctrine — territory and power" },
      { name: "Twombly / Iqbal (2007/2009)", lesson: "Plausibility pleading — raises bar for surviving a motion to dismiss" },
      { name: "Celotex Corp. v. Catrett (1986)", lesson: "Summary judgment standard — movant need only show absence of evidence" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Introduction & The Federal Court System", readings: "FRCP Rules 1–4 · E&E Ch. 1 · Casebook Ch. 1 (pp. 1–35)", tasks: "Draw the federal court hierarchy from district court through SCOTUS · Brief Mas v. Perry — trace how diversity jurisdiction was established on these facts" },
      { week: 2, topic: "Personal Jurisdiction I: Territorial Foundations", readings: "E&E Ch. 2 · Pennoyer v. Neff · Casebook Ch. 2 (pp. 36–80)", tasks: "Brief Pennoyer v. Neff · Brief Hess v. Pawloski — how did states extend jurisdiction over non-resident motorists without abandoning Pennoyer?" },
      { week: 3, topic: "Personal Jurisdiction II: Minimum Contacts", readings: "E&E Ch. 3 · International Shoe v. Washington · Casebook Ch. 2 (pp. 81–140)", tasks: "Brief International Shoe · Brief World-Wide Volkswagen v. Woodson — why did the stream of commerce argument fail here?" },
      { week: 4, topic: "Subject Matter Jurisdiction: Federal Question & Diversity", readings: "E&E Ch. 4–5 · 28 U.S.C. §§1331, 1332 · Casebook Ch. 3 (pp. 141–200)", tasks: "E&E Problems 4.1–4.3 · Brief Louisville & Nashville R.R. v. Mottley — why did a federal defense not create federal question jurisdiction?" },
      { week: 5, topic: "Venue & Forum Selection Clauses", readings: "E&E Ch. 6 · 28 U.S.C. §1391 · FRCP Rule 12(b)(3) · M/S Bremen v. Zapata", tasks: "Brief M/S Bremen v. Zapata · Brief Atlantic Marine Construction v. U.S. District Court — what is the current enforceability standard for forum selection clauses?" },
      { week: 6, topic: "Pleading: Complaints & Motions to Dismiss", readings: "E&E Ch. 8 · FRCP Rules 8, 12 · Twombly & Iqbal · Casebook Ch. 5 (pp. 270–330)", tasks: "Brief Twombly and Iqbal back-to-back · Brief Conley v. Gibson (the pre-Twombly standard) — articulate exactly what changed" },
      { week: 7, topic: "Discovery: Scope, Obligations & Preservation", readings: "E&E Ch. 10 · FRCP Rules 26–37 · Casebook Ch. 6 (pp. 331–400)", tasks: "Brief Zubulake v. UBS Warburg — the landmark e-discovery case establishing preservation duties and sanctions framework" },
      { week: 8, topic: "Discovery: Depositions, Interrogatories & Privilege", readings: "E&E Ch. 11 · FRCP Rules 30, 33, 34, 45 · Attorney-client privilege overview", tasks: "E&E Problems 11.1–11.2 · Brief Upjohn Co. v. United States — who does the attorney-client privilege protect in a corporate setting?" },
      { week: 9, topic: "Summary Judgment", readings: "E&E Ch. 13 · FRCP Rule 56 · Celotex Corp. v. Catrett · Casebook Ch. 8 (pp. 460–510)", tasks: "Brief Celotex Corp. v. Catrett · Brief Anderson v. Liberty Lobby — what does 'genuine dispute of material fact' actually mean at summary judgment?" },
      { week: 10, topic: "Class Actions", readings: "E&E Ch. 12 · FRCP Rule 23 · Casebook Ch. 7 (pp. 401–459)", tasks: "Brief Walmart v. Dukes — why did the Court reject class certification? · Apply each Rule 23(a) factor to the Walmart facts" },
      { week: 11, topic: "Trial, Judgment & Appeals", readings: "E&E Ch. 14–15 · FRCP Rules 50, 59, 61 · Casebook Ch. 9 (pp. 511–560)", tasks: "E&E Problems 14.1–14.2 · Brief Neely v. Martin K. Eby Construction — what is the standard for granting JNOV after a jury verdict?" },
      { week: 12, topic: "Claim & Issue Preclusion · Review", readings: "E&E Ch. 16 · FRCP Rule 60 · Casebook Ch. 10 (pp. 561–600)", tasks: "Brief Parklane Hosiery v. Shore — when can a plaintiff use offensive collateral estoppel? · Write a one-page synthesis: trace a commercial dispute from complaint through appeal" },
    ],
  },
  {
    id: "property", code: "LAW 104", title: "Property", semester: 1, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    businessRelevance: "Real estate transactions, IP as property, zoning, landlord-tenant, and the bundle-of-rights framework for asset analysis.",
    overview: "What it means to own something — real property, personal property, future interests, landlord-tenant, and regulatory takings.",
    keyConceptsForBusiness: [
      "Fee simple vs. leasehold — ownership structures in real estate",
      "Covenants, easements, and servitudes — encumbrances on commercial property",
      "Recording acts — how title priority works in transactions",
      "Takings clause and regulatory taking — government impact on property value",
      "IP as property — patents, copyrights, trademarks as property rights",
      "Common ownership structures — TIC, joint tenancy, condominiums",
    ],
    canonicalTextbook: { title: "Property", authors: "Dukeminier, Krier, Alexander & Schill", edition: "9th ed., 2018", note: "The standard — used at virtually every top school" },
    supplements: [
      { type: "Hornbook", title: "Property (Nutshell)", authors: "Burke & Snoe", note: "Comprehensive and clear" },
      { type: "Practice Guide", title: "Understanding Property Law", authors: "Sprankling", note: "Outstanding explanatory text" },
      { type: "Study Aid", title: "Examples & Explanations: Property", authors: "Dukeminier", note: "Excellent practice problems" },
    ],
    lectures: [
      { source: "MIT OpenCourseWare", title: "Urban Land Economics (Urban Property Law)", url: "https://ocw.mit.edu/courses/11-203-microeconomics-of-property-rights/", note: "Rigorous property economics foundation" },
      { source: "LawShelf", title: "Property Law Video Course", url: "https://lawshelf.com/courseware/", note: "Free video series covering all major doctrines" },
      { source: "Quimbee", title: "Property Law Course", url: "https://www.quimbee.com/courses/property", note: "Case briefs and video explanations" },
    ],
    primaryCases: [
      { name: "Pierson v. Post (1805)", lesson: "First possession — captures how property rights originate" },
      { name: "Kelo v. City of New London (2005)", lesson: "Eminent domain for economic development — controversial SCOTUS decision" },
      { name: "Penn Central Transportation Co. v. NYC (1978)", lesson: "Regulatory takings test — balancing government regulation and compensation" },
      { name: "Shelley v. Kraemer (1948)", lesson: "Racially restrictive covenants — state action doctrine in property context" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Theories of Property & First Possession", readings: "E&E Ch. 1–2 · Pierson v. Post · Casebook Ch. 1 (pp. 1–50)", tasks: "Brief Pierson v. Post · Brief Keeble v. Hickeringill — how does interference with pursuit (vs. capture) affect property rights?" },
      { week: 2, topic: "Estates in Land: Fee Simple, Fee Tail, Life Estates", readings: "E&E Ch. 4 · Casebook Ch. 3 (pp. 100–155) · Nutshell Ch. 4", tasks: "E&E Problems 4.1–4.3 · Brief White v. Brown — when courts construe ambiguous deeds, what canon of construction do they apply?" },
      { week: 3, topic: "Future Interests & the Rule Against Perpetuities", readings: "E&E Ch. 5–6 · Casebook Ch. 3 (pp. 156–210)", tasks: "Work through 3 RAP problems from E&E · Brief Symphony Space v. Pergola Properties — how did a commercial RAP violation void the option?" },
      { week: 4, topic: "Concurrent Ownership: TIC, Joint Tenancy, Community Property", readings: "E&E Ch. 7 · Casebook Ch. 4 (pp. 211–260)", tasks: "E&E Problems 7.1–7.3 · Brief Riddle v. Harmon — can one joint tenant unilaterally sever the joint tenancy without a strawman deed?" },
      { week: 5, topic: "Landlord-Tenant Law", readings: "E&E Ch. 8 · Casebook Ch. 5 (pp. 261–330) · Review a commercial lease term sheet", tasks: "Brief Javins v. First National Realty — how did the implied warranty of habitability transform landlord-tenant law? · Identify the remedies created" },
      { week: 6, topic: "Easements & Licenses", readings: "E&E Ch. 9 · Casebook Ch. 6 (pp. 331–385)", tasks: "E&E Problems 9.1–9.3 · Brief Othen v. Rosier — distinguish easement by necessity from easement by prior use on these facts" },
      { week: 7, topic: "Covenants, Servitudes & HOA-style Restrictions", readings: "E&E Ch. 10 · Shelley v. Kraemer · Casebook Ch. 6 (pp. 386–440)", tasks: "Brief Shelley v. Kraemer · Brief Neponsit Property Owners Assoc. v. Emigrant Industrial Savings Bank — when do affirmative covenants run with the land?" },
      { week: 8, topic: "Recording Acts & Title Systems", readings: "E&E Ch. 11 · Casebook Ch. 7 (pp. 441–495) · Race, notice, race-notice statutes", tasks: "Brief Luthi v. Evans — does a 'Mother Hubbard' deed give constructive notice under a notice recording act? Apply the rule" },
      { week: 9, topic: "Land Transactions: The Purchase & Sale Process", readings: "E&E Ch. 12 · Casebook Ch. 8 (pp. 496–550) · Review a standard PSA", tasks: "Brief Stambovsky v. Ackley (the 'haunted house' case) — when does seller's silence about a defect constitute fraudulent non-disclosure?" },
      { week: 10, topic: "Zoning & Land Use Regulation", readings: "E&E Ch. 13 · Casebook Ch. 9 (pp. 551–610) · Village of Euclid v. Ambler Realty", tasks: "Brief Village of Euclid v. Ambler Realty — what constitutional basis did the Court use to uphold zoning? · Apply the rational basis test" },
      { week: 11, topic: "Takings: Physical & Regulatory", readings: "E&E Ch. 14 · Penn Central · Kelo · Casebook Ch. 9 (pp. 611–670)", tasks: "Brief Penn Central (3-factor test) and Kelo back-to-back · What distinguishes a compensable taking from a valid exercise of police power?" },
      { week: 12, topic: "IP as Property & Synthesis", readings: "Nutshell IP overview · Casebook Ch. 1 (revisit) · E&E Review Problems", tasks: "Brief Moore v. Regents of UC — do you have a property right in your own cells? Apply the first possession and labor theories to the facts" },
    ],
  },
  {
    id: "constitutional-law", code: "LAW 105", title: "Constitutional Law", semester: 2, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    businessRelevance: "Commerce clause, regulatory authority, First Amendment (speech and spending), due process, and limits on government power over business.",
    overview: "The structure of federal power, individual rights, and the judiciary's role. The operating system of American governance.",
    keyConceptsForBusiness: [
      "Commerce Clause — Congress's power to regulate business",
      "Contracts Clause — limits on laws impairing existing contracts",
      "Takings Clause — constitutional limits on regulatory impact",
      "First Amendment — commercial speech and campaign finance",
      "Due process (procedural and substantive) — government process before depriving rights",
      "Equal protection — anti-discrimination requirements on government actors",
    ],
    canonicalTextbook: { title: "Constitutional Law", authors: "Sullivan & Feldman", edition: "20th ed., 2019", note: "Most widely used at top schools (HLS, Stanford, Chicago)" },
    supplements: [
      { type: "Treatise", title: "Constitutional Law (Nutshell)", authors: "Chemerinsky", note: "Chemerinsky's hornbook is the definitive supplement" },
      { type: "Treatise", title: "Constitutional Law (Treatise)", authors: "Chemerinsky", note: "Go deeper — widely cited by courts and scholars" },
      { type: "Primary Source", title: "The U.S. Constitution + Federalist Papers", authors: "Madison, Hamilton, Jay", note: "Essential primary reading" },
    ],
    lectures: [
      { source: "Yale Law School", title: "Constitutional Law — Akhil Reed Amar Lectures", url: "https://oyc.yale.edu/law/lawg-610", note: "Exceptional — one of the great constitutional law teachers" },
      { source: "Coursera / Yale", title: "Introduction to American Law (Constitutional Module)", url: "https://www.coursera.org/learn/american-law", note: "Free audit available" },
      { source: "C-SPAN / Oyez", title: "SCOTUS Oral Arguments Archive", url: "https://www.oyez.org", note: "Listen to arguments in landmark cases" },
    ],
    primaryCases: [
      { name: "Marbury v. Madison (1803)", lesson: "Judicial review — courts' power to invalidate unconstitutional laws" },
      { name: "McCulloch v. Maryland (1819)", lesson: "Necessary and proper clause — broad federal power" },
      { name: "Citizens United v. FEC (2010)", lesson: "Corporate political speech — First Amendment and campaign finance" },
      { name: "NFIB v. Sebelius (2012)", lesson: "Commerce clause limits and the taxing power — ACA constitutionality" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Judicial Review & Separation of Powers", readings: "Casebook Ch. 1 (pp. 1–50) · Marbury v. Madison · Federalist No. 78", tasks: "Brief Marbury v. Madison · Brief Cooper v. Aaron — what did the Court say about state resistance to federal judicial supremacy?" },
      { week: 2, topic: "Congressional Power: Commerce Clause I", readings: "Casebook Ch. 3 (pp. 130–190) · McCulloch v. Maryland · Gibbons v. Ogden", tasks: "Brief McCulloch v. Maryland · Brief Gibbons v. Ogden — articulate what 'commerce among the states' meant to Marshall" },
      { week: 3, topic: "Commerce Clause II: Modern Doctrine & Limits", readings: "Casebook Ch. 3 (pp. 191–250) · NFIB v. Sebelius · Lopez & Morrison", tasks: "Brief United States v. Lopez · Brief United States v. Morrison — what are the three categories of activity Congress can regulate under the Commerce Clause?" },
      { week: 4, topic: "The Spending Power & Federalism", readings: "Casebook Ch. 3 (pp. 251–300) · Chemerinsky Nutshell Ch. 3", tasks: "Brief South Dakota v. Dole · Brief NFIB v. Sebelius (Medicaid expansion section) — when does a spending condition become unconstitutional coercion?" },
      { week: 5, topic: "Due Process: Procedural Protections", readings: "Casebook Ch. 7 (pp. 480–530) · Mathews v. Eldridge · Chemerinsky Ch. 7", tasks: "Brief Mathews v. Eldridge · Apply the 3-factor balancing test to the Social Security disability termination facts and then to a professional license revocation" },
      { week: 6, topic: "Due Process: Substantive Due Process", readings: "Casebook Ch. 8 (pp. 531–590) · Lochner (historical context) · Chemerinsky Ch. 8", tasks: "Brief Lochner v. New York · Brief West Coast Hotel v. Parrish — what doctrinal shift ended the Lochner era and why?" },
      { week: 7, topic: "Equal Protection: Rational Basis & Strict Scrutiny", readings: "Casebook Ch. 9 (pp. 591–660) · Chemerinsky Ch. 9", tasks: "Brief Railway Express Agency v. New York (rational basis) and Korematsu v. United States (strict scrutiny) — apply both tiers to their respective facts and critique the outcomes" },
      { week: 8, topic: "First Amendment: Freedom of Speech I", readings: "Casebook Ch. 11 (pp. 760–830) · Brandenburg v. Ohio · Commercial speech doctrine", tasks: "Brief Schenck v. United States · Brief Brandenburg v. Ohio — trace how the 'clear and present danger' test evolved into the incitement test" },
      { week: 9, topic: "First Amendment: Commercial Speech & Campaign Finance", readings: "Casebook Ch. 11 (pp. 831–890) · Citizens United · Central Hudson test", tasks: "Brief Citizens United v. FEC · Apply the Central Hudson 4-part test to a hypothetical state ban on attorney advertising" },
      { week: 10, topic: "The Contracts Clause & Regulatory Takings", readings: "Casebook Ch. 4 (pp. 301–350) · Allied Structural Steel v. Spannaus", tasks: "Brief Home Building & Loan Assoc. v. Blaisdell · Brief Allied Structural Steel v. Spannaus — when does a state law impairing contracts violate Article I §10?" },
      { week: 11, topic: "Executive Power & Administrative State", readings: "Casebook Ch. 5 (pp. 351–430) · Youngstown Sheet & Tube · Chemerinsky Ch. 5", tasks: "Brief Youngstown Sheet & Tube v. Sawyer · Apply Justice Jackson's tripartite framework to a contemporary executive action — which zone applies?" },
      { week: 12, topic: "State Action Doctrine & Synthesis", readings: "Casebook Ch. 12 (pp. 891–940) · Chemerinsky Review Ch.", tasks: "Brief Jackson v. Metropolitan Edison — when does a private utility's conduct constitute state action? · Write a one-page synthesis: how do the Commerce Clause, Due Process, and Equal Protection doctrines relate structurally?" },
    ],
  },
  {
    id: "criminal-law", code: "LAW 106", title: "Criminal Law", semester: 2, credits: 3,
    duration: "10 weeks", hoursPerWeek: "3–4 hrs",
    businessRelevance: "White-collar crime, corporate criminal liability, regulatory enforcement, compliance programs, and individual officer exposure.",
    overview: "The state's power to punish — elements of crimes, mens rea, defenses, and punishment. The standard against which compliance is measured.",
    keyConceptsForBusiness: [
      "Mens rea — intent requirements and willful blindness doctrine",
      "Respondeat superior for corporations — when entities face criminal liability",
      "FCPA, securities fraud, wire fraud — the common white-collar statutes",
      "Federal Sentencing Guidelines — how corporate fines and penalties are structured",
      "Deferred prosecution agreements — how companies settle criminal exposure",
      "Strict liability offenses — regulatory crimes requiring no intent",
    ],
    canonicalTextbook: { title: "Criminal Law: Cases and Materials", authors: "Kadish, Schulhofer, Steiker & Barkow", edition: "9th ed., 2016", note: "Standard at HLS, NYU, Georgetown" },
    supplements: [
      { type: "Hornbook", title: "Criminal Law (Nutshell)", authors: "Gardner & Anderson", note: "Efficient reference" },
      { type: "Primary Source", title: "Model Penal Code", authors: "ALI", note: "Essential — the basis of most state criminal codes" },
      { type: "Business Focus", title: "Corporate Criminal Liability", authors: "Diamantis & Laufer", note: "Directly relevant to business context" },
    ],
    lectures: [
      { source: "Coursera / Vanderbilt", title: "A Law Student's Toolkit — Criminal Law Module", url: "https://www.coursera.org/learn/law-student", note: "Free audit; excellent foundations" },
      { source: "Harvard Online", title: "HLS Criminal Law Fundamentals", url: "https://hls.harvard.edu/academics/curriculum/", note: "Public lecture recordings available" },
      { source: "DOJ / FCPA Resources", title: "DOJ FCPA Resource Guide (2nd ed.)", url: "https://www.justice.gov/criminal/criminal-fraud/fcpa-guidance", note: "Free PDF — definitive guide to the statute" },
    ],
    primaryCases: [
      { name: "Regina v. Cunningham (1957)", lesson: "Recklessness as mens rea — foundational criminal intent analysis" },
      { name: "United States v. Park (1975)", lesson: "Responsible corporate officer doctrine — executive liability without knowledge" },
      { name: "People v. Decina (1956)", lesson: "Voluntary act doctrine and its limits" },
      { name: "United States v. Arthur Andersen (2005)", lesson: "Corporate obstruction of justice — Enron-era lesson on document retention" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Foundations: Actus Reus & the Voluntary Act", readings: "Casebook Ch. 1 (pp. 1–50) · MPC §2.01 · People v. Decina · Nutshell Ch. 1–2", tasks: "Brief People v. Decina · Brief Martin v. State — if a defendant is involuntarily placed in public while intoxicated, can they be convicted? Apply MPC §2.01" },
      { week: 2, topic: "Mens Rea: Intent, Knowledge, Recklessness & Negligence", readings: "Casebook Ch. 2 (pp. 51–110) · MPC §2.02 · Regina v. Cunningham", tasks: "Brief Regina v. Cunningham · Brief United States v. Jewell — articulate the willful blindness doctrine and its relationship to 'knowledge' under MPC §2.02(2)(b)" },
      { week: 3, topic: "Strict Liability & Regulatory Offenses", readings: "Casebook Ch. 3 (pp. 111–155) · MPC §2.05 · Morissette v. United States", tasks: "Brief Morissette v. United States · Brief United States v. Dotterweich — when does Congress impose criminal liability without requiring proof of criminal intent?" },
      { week: 4, topic: "Corporate Criminal Liability", readings: "Casebook Ch. 9 (pp. 480–530) · United States v. Park · Corporate Criminal Liability text Ch. 1–2", tasks: "Brief United States v. Park (responsible corporate officer) · Brief United States v. Bi-Co Pavers — what conduct is sufficient to establish individual liability without direct participation in the offense?" },
      { week: 5, topic: "White-Collar Crime: Fraud, Wire Fraud & Mail Fraud", readings: "Casebook Ch. 10 (pp. 531–585) · 18 U.S.C. §1343 · Skilling v. United States", tasks: "Brief Skilling v. United States · Brief McNally v. United States — how did Congress and the Court narrow the honest services fraud doctrine?" },
      { week: 6, topic: "FCPA & Anti-Bribery Law", readings: "DOJ FCPA Resource Guide (pp. 1–50) · Corporate Criminal Liability text Ch. 4", tasks: "Brief United States v. Kozeny — apply the FCPA's 'knowing' standard to payments made through third-party agents · What due diligence does the case require?" },
      { week: 7, topic: "Conspiracy & Willful Blindness", readings: "Casebook Ch. 8 (pp. 430–479) · MPC §5.03 · Global-Tech Appliances v. SEB", tasks: "Brief Global-Tech Appliances v. SEB · Brief Pinkerton v. United States — under Pinkerton, when is a conspirator liable for a co-conspirator's substantive offense?" },
      { week: 8, topic: "Defenses: Justification, Duress & Entrapment", readings: "Casebook Ch. 6–7 (pp. 300–429) · MPC §§3.01–3.08", tasks: "E&E Problems on affirmative defenses · Brief United States v. Bailey — does prison escape to avoid unconstitutional conditions qualify as necessity? Apply MPC §3.02" },
      { week: 9, topic: "Federal Sentencing Guidelines & Corporate Sanctions", readings: "USSG Ch. 8 (Organizational Guidelines) · Nutshell Ch. on sentencing", tasks: "Work through a USSG Chapter 8 culpability score calculation using a hypothetical antitrust violation · Which factors move the multiplier up and down?" },
      { week: 10, topic: "DPAs, NPAs & Compliance Programs · Synthesis", readings: "DOJ FCPA Guide (pp. 50–100) · Arthur Andersen case · Yates Memo (2015)", tasks: "Brief United States v. Arthur Andersen LLP · Read the Yates Memo · Write a one-page synthesis: what do the USSG Chapter 8 factors, Yates Memo, and Arthur Andersen together require of a compliance program?" },
    ],
  },
  {
    id: "legal-writing", code: "LAW 110", title: "Legal Research & Writing", semester: 1, credits: 2,
    duration: "12 weeks (parallel to other courses)", hoursPerWeek: "2–3 hrs",
    businessRelevance: "Reading and interpreting contracts, memos, and legal briefs. Communicating clearly on legal issues with counsel.",
    overview: "How lawyers research the law, structure analysis, and communicate in writing. IRAC, statutory interpretation, and persuasion.",
    keyConceptsForBusiness: [
      "IRAC structure — Issue, Rule, Analysis, Conclusion — how legal memos work",
      "Statutory interpretation — textualism vs. purposivism in reading laws",
      "Regulatory hierarchy — how constitutions, statutes, regulations, and cases interact",
      "Reading a contract — key provisions, defined terms, interpretation rules",
      "The Bluebook — citation format and how to read legal citations",
      "Due diligence memos — standard format and what they assess",
    ],
    canonicalTextbook: { title: "Legal Research and Writing in a Nutshell", authors: "Kunz, Schmedemann et al.", edition: "5th ed., 2016", note: "Clean, practical foundation" },
    supplements: [
      { type: "Writing Guide", title: "The Elements of Legal Style", authors: "Garner", note: "Bryan Garner is the authority on legal writing" },
      { type: "Research Guide", title: "Legal Research in a Nutshell", authors: "Cohen & Olson", note: "How to find primary and secondary sources" },
      { type: "Free Resource", title: "Cornell Legal Information Institute (LII)", authors: "Cornell Law", note: "Free, authoritative — bookmark this permanently" },
    ],
    lectures: [
      { source: "Cornell LII", title: "Wex Legal Dictionary & Encyclopedia", url: "https://www.law.cornell.edu/wex", note: "Free, authoritative legal definitions" },
      { source: "Westlaw / LexisNexis", title: "Research Training Videos", url: "https://lawschool.westlaw.com/", note: "Free with academic access" },
      { source: "YouTube — Legal English Academy", title: "Legal Writing Fundamentals", url: "https://www.youtube.com/@LegalEnglishAcademy", note: "Accessible and practical" },
    ],
    primaryCases: [
      { name: "Caminetti v. United States (1917)", lesson: "Plain meaning rule of statutory interpretation" },
      { name: "Chevron U.S.A. v. NRDC (1984)", lesson: "Agency deference doctrine — now overruled by Loper Bright (2024)" },
      { name: "King v. Burwell (2015)", lesson: "Purposive interpretation of ambiguous statutory text" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Legal Research Foundations: Primary vs. Secondary Sources", readings: "Nutshell Ch. 1–3 · Cornell LII orientation · Garner Ch. 1", tasks: "Use Cornell LII to locate 18 U.S.C. §1343 (wire fraud) · Trace it up to its enabling constitutional clause · Identify 2 secondary sources (law review article + treatise) on wire fraud" },
      { week: 2, topic: "Reading Cases: Structure of a Judicial Opinion", readings: "Nutshell Ch. 4 · Garner Ch. 2 · Pick any case from your Contracts reading", tasks: "Take Hadley v. Baxendale and map each section: facts / procedural history / issue / holding / reasoning / disposition · Write it out in a structured brief format" },
      { week: 3, topic: "IRAC: The Core Legal Analysis Framework", readings: "Nutshell Ch. 5–6 · Garner Ch. 3–4", tasks: "Write a 1-page IRAC memo analyzing whether the agreement in Lucy v. Zehmer would be enforceable under the objective theory of contracts — use the case as your Rule source" },
      { week: 4, topic: "Statutory Research & Reading Regulations", readings: "Nutshell Ch. 7 · Cornell LII U.S. Code tutorial · Caminetti v. United States", tasks: "Brief Caminetti v. United States · Find the Mann Act (18 U.S.C. §2421) on Cornell LII · Apply the plain meaning rule to the term 'immoral purposes' as the Court did" },
      { week: 5, topic: "Legal Citation: Reading & Writing Bluebook Citations", readings: "Garner Ch. 5 · Nutshell Ch. 8 · Bluebook rules 1, 10, 12, 18", tasks: "Correctly cite in Bluebook format: Hadley v. Baxendale, Lucy v. Zehmer, 18 U.S.C. §1343, FRCP Rule 56, and Restatement (Second) of Contracts §90" },
      { week: 6, topic: "Office Memos: Objective Legal Writing", readings: "Nutshell Ch. 9–10 · Garner Ch. 6", tasks: "Write a 2-page objective IRAC memo: 'Was there a binding contract in Leonard v. Pepsico?' Use the casebook opinion as your factual record and state both sides" },
      { week: 7, topic: "Contract Reading: Defined Terms, Boilerplate & Key Clauses", readings: "Garner Ch. 7 · Review a real NDA and MSA side by side", tasks: "Pull the NDA from Judd v. Citibank (publicly available via PACER or legal databases) · Annotate it: identify defined terms, representations, conditions, remedy clauses, and choice of law" },
      { week: 8, topic: "Statutory Interpretation in Practice", readings: "Nutshell Ch. 11 · King v. Burwell · Chevron (historical) · Loper Bright summary", tasks: "Brief King v. Burwell · Write a 1-page memo applying both textualist and purposivist approaches to the phrase 'established by the State' in ACA §1401 — which reading is more defensible and why?" },
      { week: 9, topic: "Persuasive Writing: Briefs & Argument Structure", readings: "Garner Ch. 8–9 · Nutshell Ch. 12", tasks: "Using M/S Bremen v. Zapata as your precedent, write a 1-page argument section: 'The forum selection clause in this contract should be enforced' — frame the rule, apply it to Bremen's facts, and state a conclusion" },
      { week: 10, topic: "Due Diligence Memos & Legal Risk Assessment", readings: "Garner Ch. 10 · Sample M&A due diligence memo (publicly available via SEC EDGAR)", tasks: "Pull any S-4 or proxy statement from SEC EDGAR for a recent merger · Read the 'Risk Factors' and 'Legal Proceedings' sections · Identify 3 legal risks and categorize each by area of law" },
      { week: 11, topic: "Communicating with Counsel: Reading Legal Advice Effectively", readings: "Garner Ch. 11 · Nutshell Ch. 13", tasks: "Find a published federal district court opinion in a contracts dispute · Map the court's opinion onto IRAC — identify where the court's reasoning is strongest and weakest" },
      { week: 12, topic: "Synthesis: Full Research & Writing Project", readings: "Review all Nutshell chapters", tasks: "Write a 3-page research memo on the question: 'When does an anticipatory repudiation excuse the non-breaching party from performing?' Cite Hochster v. De La Tour, UCC §2-610, and Restatement §253. Structure in IRAC with a recommendation" },
    ],
  },
  {
    id: "business-associations", code: "LAW 111", title: "Business Associations", semester: 2, credits: 4,
    duration: "12 weeks", hoursPerWeek: "4–5 hrs",
    schoolNote: "Required 1L at Northwestern · Strongly recommended at Michigan & UChicago",
    businessRelevance: "The legal architecture of every entity you'll work with — corporations, LLCs, partnerships, and the duties that govern everyone running them.",
    overview: "How businesses are structured and governed — agency, partnerships, LLCs, and corporations. The law of fiduciary duty, boards, shareholders, and transactions.",
    keyConceptsForBusiness: [
      "Agency law — when an employee or contractor binds the company to a contract",
      "Partnership liability — why general partners are personally on the hook",
      "LLC vs. corporation — structural tradeoffs in formation and taxation",
      "Fiduciary duties of directors — duty of care, duty of loyalty, and the business judgment rule",
      "Shareholder rights and derivative suits — when shareholders can sue on the company's behalf",
      "Duty of loyalty in M&A — conflict of interest rules in change-of-control transactions",
    ],
    canonicalTextbook: { title: "Business Associations: Cases and Materials", authors: "Klein, Ramseyer & Bainbridge", edition: "10th ed., 2018", note: "Standard at Northwestern, UCLA, and many top schools" },
    supplements: [
      { type: "Hornbook", title: "Business Associations (Nutshell)", authors: "Callison & Sullivan", note: "Best compact reference for this subject" },
      { type: "Study Aid", title: "Examples & Explanations: Business Associations", authors: "Callison & Sullivan", note: "Essential practice problems" },
      { type: "Primary Source", title: "Delaware General Corporation Law (DGCL)", authors: "Delaware Legislature", note: "Most corporations are Delaware-incorporated — read key sections (§141, §102, §144)" },
    ],
    lectures: [
      { source: "Yale Law School", title: "Corporations & Business Law — Open Courses", url: "https://oyc.yale.edu/law", note: "Faculty lectures on corporate governance" },
      { source: "Coursera / University of Illinois", title: "Business Law for Entrepreneurs — Corporations Module", url: "https://www.coursera.org/learn/business-law", note: "Free audit; strong on entity structure" },
      { source: "LawShelf", title: "Business Organizations Video Series", url: "https://lawshelf.com/courseware/", note: "Free structured lessons on agency, partnerships, and corporations" },
    ],
    primaryCases: [
      { name: "Meinhard v. Salmon (1928)", lesson: "The foundational fiduciary duty case — Cardozo's 'punctilio of honor' standard" },
      { name: "Smith v. Van Gorkom (1985)", lesson: "Business judgment rule failure — directors must be informed before approving a merger" },
      { name: "In re Caremark International (1996)", lesson: "Board oversight duty — directors must establish compliance systems" },
      { name: "eBay Domestic Holdings v. Newmark (2010)", lesson: "Shareholder primacy — a board cannot sacrifice profits for stakeholder goals in a for-profit corporation" },
      { name: "Weinberger v. UOP (1983)", lesson: "Entire fairness review in freeze-out mergers — protects minority shareholders" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Agency Law I: Creation & Actual Authority", readings: "E&E Ch. 1–2 · Casebook Ch. 1 (pp. 1–50) · Restatement (Third) of Agency §§1.01–2.02", tasks: "Brief Humble Oil & Refining v. Martin — when does a franchisor-franchisee relationship create apparent authority to bind the franchisor? Apply Restatement §2.03" },
      { week: 2, topic: "Agency Law II: Apparent Authority & Liability", readings: "E&E Ch. 3–4 · Casebook Ch. 1 (pp. 51–100) · Restatement §§2.03, 7.03", tasks: "E&E Problems 3.1–3.3 · Brief Watteau v. Fenwick — what is 'inherent agency power' and how does it differ from actual and apparent authority?" },
      { week: 3, topic: "Partnerships: Formation, Liability & Dissolution", readings: "E&E Ch. 6 · RUPA §§101–807 · Casebook Ch. 2 (pp. 101–160) · Meinhard v. Salmon", tasks: "Brief Meinhard v. Salmon in full (Cardozo majority + Andrews dissent) · Articulate: what exactly did Salmon do wrong, and why was the standard so demanding?" },
      { week: 4, topic: "LLCs: Formation, Operating Agreements & Member Liability", readings: "E&E Ch. 8 · ULLCA §§101–1106 (key sections) · Casebook Ch. 3 (pp. 161–220)", tasks: "Brief Elf Atochem North America v. Jaffari — what happens when an LLC operating agreement conflicts with the Delaware LLC Act? Which controls?" },
      { week: 5, topic: "Corporations: Formation, Structure & the Corporate Veil", readings: "E&E Ch. 9–10 · DGCL §§102, 141 · Casebook Ch. 4 (pp. 221–290)", tasks: "Brief Walkovszky v. Carlton · Brief Sea-Land Services v. Pepper Source — compare the piercing tests across jurisdictions: what factor is most determinative?" },
      { week: 6, topic: "The Board of Directors: Duty of Care & Business Judgment Rule", readings: "E&E Ch. 11 · Smith v. Van Gorkom · Casebook Ch. 5 (pp. 291–360)", tasks: "Brief Smith v. Van Gorkom in full · What specifically did the Trans Union board fail to do? Would the outcome differ under DGCL §102(b)(7) exculpation?" },
      { week: 7, topic: "Duty of Loyalty: Self-Dealing & Conflict Transactions", readings: "E&E Ch. 12 · DGCL §144 · In re Caremark · Casebook Ch. 6 (pp. 361–420)", tasks: "Brief In re Caremark International · Brief In re Walt Disney Co. Derivative Litigation — what level of oversight failure crosses the line from negligence into bad faith under Caremark?" },
      { week: 8, topic: "Shareholder Rights & Derivative Suits", readings: "E&E Ch. 13 · FRCP Rule 23.1 · Casebook Ch. 7 (pp. 421–480)", tasks: "E&E Problems 13.1–13.2 · Brief Aronson v. Lewis — what must a plaintiff show to excuse pre-suit demand on the board in a derivative action?" },
      { week: 9, topic: "Shareholder Primacy vs. Stakeholder Theory", readings: "eBay v. Newmark · Dodge v. Ford · Casebook Ch. 7 (pp. 481–520) · Delaware benefit corporation statute", tasks: "Brief eBay Domestic Holdings v. Newmark · Brief Dodge v. Ford Motor Co. — compare the two cases: has shareholder primacy always been the law, or is it more contested than it appears?" },
      { week: 10, topic: "Mergers & Acquisitions: Structural Forms", readings: "E&E Ch. 15 · DGCL §§251–262 · Casebook Ch. 8 (pp. 521–580)", tasks: "Brief Farris v. Glen Alden Corp. — when does an asset acquisition trigger appraisal rights? Apply DGCL §262 to the facts" },
      { week: 11, topic: "M&A: Fiduciary Duties in Change-of-Control", readings: "Weinberger v. UOP · Revlon v. MacAndrews · Casebook Ch. 9 (pp. 581–640)", tasks: "Brief Weinberger v. UOP and Revlon v. MacAndrews & Forbes back-to-back · Articulate: what triggers Revlon duties and what must the board do once triggered?" },
      { week: 12, topic: "Securities Regulation Overview & Synthesis", readings: "E&E Ch. 16 · Securities Act §§4, 5 · Casebook Ch. 10 (pp. 641–680)", tasks: "Brief SEC v. Texas Gulf Sulphur Co. — what constitutes 'material' inside information? · Write a one-page synthesis: how do agency, fiduciary duty, and securities law interact in an M&A transaction?" },
    ],
  },
  {
    id: "law-economics", code: "LAW 112", title: "Law & Economics (Elements of the Law)", semester: 1, credits: 3,
    duration: "10 weeks (parallel lens — apply alongside other courses)", hoursPerWeek: "3 hrs",
    schoolNote: "Required 1L at University of Chicago · Lens applied throughout curriculum at all top schools",
    businessRelevance: "Teaches you to ask 'what is the efficient rule?' — the same cost-benefit framework used by regulators, courts, and sophisticated counsel in every major deal and dispute.",
    overview: "Law viewed through the lens of economics — efficiency, incentives, and the cost-benefit analysis underlying legal rules. The intellectual framework of the University of Chicago Law School.",
    keyConceptsForBusiness: [
      "The Coase Theorem — when parties bargain to efficient outcomes regardless of legal rules (and when they don't)",
      "The Hand Formula (B < PL) — the economic test for negligence used in Carroll Towing",
      "Externalities and legal remedies — when law corrects market failures",
      "Property rights as incentive structures — how ownership shapes behavior",
      "Efficient breach — why it's sometimes economically rational to break a contract",
      "Regulatory cost-benefit analysis — how agencies are required to justify major rules",
    ],
    canonicalTextbook: { title: "Economic Analysis of Law", authors: "Posner", edition: "9th ed., 2014", note: "The foundational text — Judge Richard Posner's magnum opus" },
    supplements: [
      { type: "Seminal Article", title: "The Problem of Social Cost", authors: "Coase (1960)", note: "Free on JSTOR — possibly the most cited law review article ever written" },
      { type: "Introductory Text", title: "An Introduction to Law and Economics", authors: "Polinsky", note: "The most accessible entry point — short and rigorous" },
      { type: "Case Companion", title: "The Economics of Contract Law", authors: "Kronman & Posner", note: "Connects doctrine to economic theory" },
    ],
    lectures: [
      { source: "University of Chicago Law School", title: "Elements of the Law — UChicago Recorded Lectures", url: "https://www.law.uchicago.edu/recordings", note: "Public archive of faculty lectures including law-and-economics content" },
      { source: "Coursera / Vanderbilt", title: "Understanding Economic Analysis of Law", url: "https://www.coursera.org/learn/understanding-economics-healthcare", note: "Accessible intro to the analytical framework" },
      { source: "EconTalk Podcast", title: "Law & Economics Episodes — Russ Roberts", url: "https://www.econtalk.org", note: "Search 'Posner', 'Coase', or 'tort' — many excellent episodes" },
    ],
    primaryCases: [
      { name: "United States v. Carroll Towing (1947)", lesson: "Judge Hand's BPL formula — the economic model of negligence" },
      { name: "Peevyhouse v. Garland Coal (1962)", lesson: "Economic efficiency vs. literal performance — when courts refuse 'wasteful' remedies" },
      { name: "Boomer v. Atlantic Cement Co. (1970)", lesson: "Injunction vs. damages — courts choose economically efficient remedies" },
    ],
    weeklySchedule: [
      { week: 1, topic: "Introduction: Why Economics & Law?", readings: "Polinsky Ch. 1–2 · Posner Ch. 1 (pp. 1–30) · Coase: Problem of Social Cost (pp. 1–15)", tasks: "Brief Boomer v. Atlantic Cement (economic reading) · What outcome would maximize total social welfare? Compare to what the court actually did" },
      { week: 2, topic: "The Coase Theorem: Bargaining & Transaction Costs", readings: "Polinsky Ch. 3 · Posner Ch. 3 (pp. 50–90) · Coase (pp. 15–44)", tasks: "Re-read Sturges v. Bridgman through a Coasean lens · Would the parties have bargained to the same outcome regardless of who won? Why or why not?" },
      { week: 3, topic: "Property Rights as Economic Incentives", readings: "Posner Ch. 2 (pp. 31–49) · Polinsky Ch. 4 · Casebook: Pierson v. Post economic analysis", tasks: "Re-read Pierson v. Post as an economist · What rule does Posner say maximizes the value of foxhunting as an activity? Does the court's outcome match?" },
      { week: 4, topic: "The Economics of Tort Law: Hand Formula", readings: "Posner Ch. 6 (pp. 167–200) · Carroll Towing · Polinsky Ch. 6", tasks: "Brief Carroll Towing · Plug in the actual numbers Judge Hand used (B, P, L) · Then apply the formula to the facts of Grimshaw v. Ford — was Ford's cost-benefit analysis legally and ethically defensible?" },
      { week: 5, topic: "Strict Liability vs. Negligence: Economic Comparison", readings: "Posner Ch. 7 (pp. 201–230) · Polinsky Ch. 7 · Escola (economic reading)", tasks: "Re-read Traynor's concurrence in Escola as a law-and-economics argument · Does strict liability or negligence produce better incentives for a manufacturer? Build the case for each" },
      { week: 6, topic: "The Economics of Contract Law: Efficient Breach", readings: "Posner Ch. 4 (pp. 91–130) · Polinsky Ch. 5 · Peevyhouse v. Garland Coal", tasks: "Brief Peevyhouse v. Garland Coal · Calculate the economic cost of specific performance vs. expectation damages on these facts · Was the court's award economically efficient?" },
      { week: 7, topic: "Remedies & Incentive Design: Damages vs. Injunctions", readings: "Posner Ch. 5 (pp. 131–166) · Boomer v. Atlantic Cement · Polinsky Ch. 8", tasks: "Brief Boomer v. Atlantic Cement · Apply Calabresi and Melamed's four-rule framework to the cement plant dispute — which rule did the court choose and why?" },
      { week: 8, topic: "The Economics of Criminal Law: Deterrence", readings: "Posner Ch. 7 (pp. 231–265) · Polinsky Ch. 10 · Becker: Crime and Punishment article", tasks: "Re-read United States v. Park through a deterrence lens · Is executive criminal liability an efficient deterrence mechanism? Apply Becker's expected punishment formula to the facts" },
      { week: 9, topic: "Regulatory Cost-Benefit Analysis", readings: "Posner Ch. 17 (pp. 500–540) · OMB Circular A-4 (free, online)", tasks: "Find the Regulatory Impact Analysis for the EPA's 2011 Mercury and Air Toxics Standards on reginfo.gov · Identify monetized costs and benefits · How did the Supreme Court treat these numbers in Michigan v. EPA (2015)?" },
      { week: 10, topic: "Synthesis: Economic Lens Applied Across Doctrine", readings: "Polinsky Review · Posner conclusion chapters", tasks: "Write a 1-page economic analysis of Hadley v. Baxendale: what rule does limiting damages to foreseeable losses create, and how does it affect pre-contract information disclosure incentives? Cite Posner's treatment" },
    ],
  },
  {
    id: "legislation", code: "LAW 113", title: "Legislation & Statutory Interpretation", semester: 2, credits: 3,
    duration: "10 weeks", hoursPerWeek: "3–4 hrs",
    schoolNote: "Required 1L at University of Chicago · Elective at Northwestern & Michigan",
    businessRelevance: "How to read statutes and regulations the way courts do — essential for compliance, regulatory strategy, and understanding how agency rules can be challenged or exploited.",
    overview: "How statutes are made, interpreted, and applied — the legislative process, tools of statutory construction, and the relationship between courts and administrative agencies.",
    keyConceptsForBusiness: [
      "Textualism vs. purposivism — the two dominant approaches to reading statutes (and why it matters for compliance)",
      "Canons of construction — the interpretive rules courts use to resolve ambiguous text",
      "The legislative process — how bills become law and how legislative history is used",
      "Delegated authority — when Congress hands rulemaking power to agencies like the SEC, EPA, or FDA",
      "Chevron deference (overruled 2024) and Loper Bright — the current state of judicial deference to agency interpretations",
      "Notice-and-comment rulemaking — how regulations are made and how to challenge them",
    ],
    canonicalTextbook: { title: "Legislation and Statutory Interpretation", authors: "Eskridge, Frickey & Garrett", edition: "3rd ed., 2012", note: "Standard at UChicago, Yale, and Georgetown" },
    supplements: [
      { type: "Treatise", title: "Reading Law: The Interpretation of Legal Texts", authors: "Scalia & Garner", note: "The definitive textualist manifesto — essential for current Supreme Court doctrine" },
      { type: "Counterpoint", title: "Making Our Democracy Work", authors: "Breyer", note: "The purposivist response from Justice Breyer — read alongside Scalia" },
      { type: "Free Resource", title: "U.S. Code (Full Text)", authors: "Office of the Law Revision Counsel", note: "law.cornell.edu/uscode — read statutes in the areas relevant to your business" },
    ],
    lectures: [
      { source: "University of Chicago Law School", title: "Legislation — UChicago Spring 1L Lecture Archive", url: "https://www.law.uchicago.edu/recordings", note: "Legislation is a required spring course at UChicago; some recordings are public" },
      { source: "C-SPAN", title: "Supreme Court Statutory Interpretation Arguments", url: "https://www.c-span.org/supremecourt/", note: "Watch oral arguments in major statutory cases — free archive" },
      { source: "Yale Law Journal", title: "The New Textualism — Article by William Eskridge", url: "https://www.jstor.org/stable/796316", note: "Foundational academic piece on modern statutory interpretation" },
    ],
    primaryCases: [
      { name: "Chevron U.S.A. v. NRDC (1984)", lesson: "Landmark agency deference doctrine — overruled in 2024 but shaped 40 years of regulatory law" },
      { name: "Loper Bright Enterprises v. Raimondo (2024)", lesson: "SCOTUS overrules Chevron — courts now independently interpret statutes rather than deferring to agencies" },
      { name: "King v. Burwell (2015)", lesson: "Purposivism in action — Court reads ACA ambiguity in light of statutory purpose" },
      { name: "Yates v. United States (2015)", lesson: "Canons of construction — a fish is not a 'tangible object' under Sarbanes-Oxley (noscitur a sociis)" },
    ],
    weeklySchedule: [
      { week: 1, topic: "The Legislative Process: How Statutes Are Made", readings: "Eskridge Ch. 1 (pp. 1–50) · U.S. Constitution Art. I §§1–7 · Scalia & Garner Ch. 1", tasks: "Find the committee report for the Sarbanes-Oxley Act (SOX) on Congress.gov · What problem was Congress trying to solve? How does the legislative history inform the statute's scope?" },
      { week: 2, topic: "Plain Meaning & Textualism", readings: "Eskridge Ch. 2 (pp. 51–110) · Scalia & Garner Ch. 2–3 · Caminetti v. United States", tasks: "Brief Caminetti v. United States · Brief Yates v. United States — apply the plain meaning rule to 'tangible object' and compare Scalia's dissent in Yates to the Caminetti majority" },
      { week: 3, topic: "Purposivism & Legislative History", readings: "Eskridge Ch. 3 (pp. 111–170) · Breyer Ch. 1–2 · Holy Trinity Church v. United States", tasks: "Brief Holy Trinity Church v. United States · Brief Bob Jones University v. United States — when the plain text is silent, how far can a court look to congressional purpose to fill the gap?" },
      { week: 4, topic: "Canons of Statutory Construction", readings: "Eskridge Ch. 4 (pp. 171–230) · Scalia & Garner Ch. 4–6 · Yates v. United States", tasks: "Brief Yates v. United States in full · Identify which canons each side invoked · Apply ejusdem generis and noscitur a sociis to the phrase 'any tangible object' — which canon controls?" },
      { week: 5, topic: "Textualism vs. Purposivism: The Live Debate", readings: "Eskridge Ch. 5 (pp. 231–280) · King v. Burwell · Scalia & Garner vs. Breyer selected passages", tasks: "Brief King v. Burwell using both textualist and purposivist frameworks · Brief Scalia's dissent · Which approach produces a more predictable rule for future cases?" },
      { week: 6, topic: "Administrative Agencies: Delegation of Legislative Power", readings: "Eskridge Ch. 6 (pp. 281–340) · APA §§551–559 · Scalia & Garner Ch. 9", tasks: "Brief Whitman v. American Trucking Associations — what is the intelligible principle test for non-delegation? Apply it to EPA's authority to set air quality standards" },
      { week: 7, topic: "Chevron Deference: The Old Framework", readings: "Eskridge Ch. 7 (pp. 341–400) · Chevron U.S.A. v. NRDC · Two-step analysis", tasks: "Brief Chevron U.S.A. v. NRDC in full · Apply both steps to the EPA's interpretation of 'stationary source' · Brief MCI Telecommunications v. AT&T — where did Chevron deference end?" },
      { week: 8, topic: "Post-Chevron: Loper Bright & the New Framework", readings: "Eskridge Ch. 7 (cont.) · Loper Bright v. Raimondo (2024) · Major Questions Doctrine (West Virginia v. EPA)", tasks: "Brief Loper Bright v. Raimondo · Brief West Virginia v. EPA — what is the major questions doctrine and how does it interact with Loper Bright's new framework?" },
      { week: 9, topic: "Notice-and-Comment Rulemaking: How to Challenge Regulations", readings: "APA §553 · Eskridge Ch. 8 (pp. 401–450) · Motor Vehicle Mfrs. v. State Farm", tasks: "Brief Motor Vehicle Manufacturers v. State Farm · Apply the arbitrary and capricious standard to NHTSA's rescission of the passive restraint rule — what reasoning was missing?" },
      { week: 10, topic: "Synthesis: Reading the Regulatory Stack", readings: "Scalia & Garner review · Breyer review · Cornell LII resources", tasks: "Pick one statute from the course (ACA, SOX, Clean Air Act, or FCPA) · Trace it: Constitution → statute → key regulation → agency guidance · Apply textualist and purposivist readings to one ambiguous term. Write one page arguing which interpretation a court should now adopt post-Loper Bright" },
    ],
  },
];

const phaseMap = [
  { label: "Foundation", months: "Months 1–4", courses: ["contracts", "torts", "legal-writing", "law-economics"], color: "#1a1a2e", accent: "#e8c547" },
  { label: "Systems", months: "Months 5–8", courses: ["civil-procedure", "property", "legislation"], color: "#16213e", accent: "#4ecdc4" },
  { label: "Power & Accountability", months: "Months 9–12", courses: ["constitutional-law", "criminal-law", "business-associations"], color: "#0f3460", accent: "#f5645a" },
];

const businessPaths = [
  { label: "Startup Founder", courses: ["contracts", "business-associations", "legislation", "constitutional-law"], note: "Entity structure, IP, regulatory exposure, funding" },
  { label: "Corporate Executive", courses: ["contracts", "business-associations", "civil-procedure", "criminal-law"], note: "Deal risk, governance, litigation, compliance" },
  { label: "Real Estate", courses: ["property", "contracts", "legislation", "constitutional-law"], note: "Title, covenants, zoning law, takings" },
  { label: "General Counsel Prep", courses: ["contracts", "torts", "civil-procedure", "criminal-law", "business-associations", "legislation"], note: "Full cross-functional coverage" },
];

const CLIENT_ID = "308432175062-9b2kvp0ihdjr81k0258mi46lrefgs7ja.apps.googleusercontent.com";
const SHEET_ID  = "1LnUdUEDZ9oFgj6lpNdLIlet6KWYvPaAPVLd0vVbCxXg";
const SCOPES    = "https://www.googleapis.com/auth/spreadsheets";
const API_BASE  = "https://sheets.googleapis.com/v4/spreadsheets";

export default function LawCurriculum() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState("concepts");
  const [selectedPath, setSelectedPath] = useState(null);
  const [completed, setCompleted] = useState({});
  const [courseStartDates, setCourseStartDates] = useState({});
  const [confirmReset, setConfirmReset] = useState(null);

  // ── Google Sheets integration state ──────────────────────────
  const [gToken, setGToken] = useState(null);
  const [gUser, setGUser] = useState(null);
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | synced | error
  const [lastSynced, setLastSynced] = useState(null);
  const [syncError, setSyncError] = useState(null);
  const [gsiReady, setGsiReady] = useState(false);

  const tokenClientRef = useRef(null);

  useEffect(() => {
    // GSI script is loaded via index.html — just mark ready when available
    const check = () => {
      if (window.google) { setGsiReady(true); }
      else { setTimeout(check, 100); }
    };
    check();
  }, []);

  useEffect(() => {
    if (!gsiReady || !window.google) return;
    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (resp) => {
        if (resp.error) { setSyncError(resp.error); setSyncStatus("error"); return; }
        setGToken(resp.access_token);
        // Decode user info from id_token if present, else just mark connected
        setGUser("Connected");
        await pullFromSheet(resp.access_token);
      },
    });
  }, [gsiReady]);

  const signIn = () => {
    setSyncError(null);
    setSyncStatus("syncing");
    if (tokenClientRef.current) tokenClientRef.current.requestAccessToken();
  };

  const signOut = () => {
    if (gToken && window.google) window.google.accounts.oauth2.revoke(gToken);
    setGToken(null); setGUser(null); setSyncStatus("idle"); setLastSynced(null);
  };

  // ── Sheet helpers ─────────────────────────────────────────────
  const sheetGet = async (token, range) => {
    const url = `${API_BASE}/${SHEET_ID}/values/${encodeURIComponent(range)}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`Sheets read error: ${r.status}`);
    return r.json();
  };

  const sheetUpdate = async (token, range, values) => {
    const url = `${API_BASE}/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
    const r = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ range, majorDimension: "ROWS", values }),
    });
    if (!r.ok) throw new Error(`Sheets write error: ${r.status}`);
    return r.json();
  };

  const sheetBatchUpdate = async (token, data) => {
    const url = `${API_BASE}/${SHEET_ID}/values:batchUpdate`;
    const r = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
    });
    if (!r.ok) throw new Error(`Sheets batch write error: ${r.status}`);
    return r.json();
  };

  // Course code → Sheet row (row 5 = index 0, row 6 = index 1 ...)
  const courseRowMap = Object.fromEntries(
    curriculum.map((c, i) => [c.code, i + 5])
  );

  // ── PULL: Sheet → App state ───────────────────────────────────
  const pullFromSheet = async (token) => {
    setSyncStatus("syncing");
    setSyncError(null);
    try {
      // Read Course Tracker: cols A–E (code + start date in col E), rows 5–14
      const tracker = await sheetGet(token, "Course Tracker!A5:E14");
      const rows = tracker.values || [];
      const newStartDates = {};
      rows.forEach((row) => {
        const code = row[0];
        const startDateStr = row[4]; // col E
        if (code && startDateStr) {
          const course = curriculum.find((c) => c.code === code);
          if (course) {
            const d = new Date(startDateStr);
            if (!isNaN(d)) newStartDates[course.id] = d.toISOString();
          }
        }
      });
      setCourseStartDates(newStartDates);

      // Read Progress tab if it exists
      try {
        const prog = await sheetGet(token, "Progress!A2:C500");
        const progRows = prog.values || [];
        const newCompleted = {};
        progRows.forEach((row) => {
          const [key, val] = row;
          if (key && val === "TRUE") newCompleted[key] = true;
        });
        setCompleted(newCompleted);
      } catch {
        // Progress sheet doesn't exist yet — will be created on first write
      }

      setLastSynced(new Date());
      setSyncStatus("synced");
    } catch (err) {
      setSyncError(err.message);
      setSyncStatus("error");
    }
  };

  // ── PUSH start date: App → Sheet ─────────────────────────────
  const pushStartDate = async (courseId, isoDate) => {
    if (!gToken) return;
    const course = curriculum.find((c) => c.id === courseId);
    if (!course) return;
    const row = courseRowMap[course.code];
    if (!row) return;
    const formatted = new Date(isoDate).toLocaleDateString("en-US", {
      month: "2-digit", day: "2-digit", year: "numeric",
    });
    try {
      await sheetUpdate(gToken, `Course Tracker!E${row}`, [[formatted]]);
      setLastSynced(new Date());
      setSyncStatus("synced");
    } catch (err) {
      setSyncError(err.message); setSyncStatus("error");
    }
  };

  // ── PUSH start date clear: App → Sheet ───────────────────────
  const clearStartDate = async (courseId) => {
    if (!gToken) return;
    const course = curriculum.find((c) => c.id === courseId);
    if (!course) return;
    const row = courseRowMap[course.code];
    try {
      await sheetUpdate(gToken, `Course Tracker!E${row}`, [[""]]);
      setLastSynced(new Date());
    } catch (err) {
      setSyncError(err.message);
    }
  };

  // ── PUSH completion: App → Sheet (Progress tab) ───────────────
  const pushCompletion = async (key, value) => {
    if (!gToken) return;
    try {
      // Find or append row for this key
      let prog;
      try { prog = await sheetGet(gToken, "Progress!A2:A500"); } catch { prog = { values: [] }; }
      const rows = prog.values || [];
      const rowIdx = rows.findIndex((r) => r[0] === key);
      const sheetRow = rowIdx >= 0 ? rowIdx + 2 : rows.length + 2;
      await sheetUpdate(gToken, `Progress!A${sheetRow}:C${sheetRow}`, [
        [key, value ? "TRUE" : "FALSE", new Date().toISOString()],
      ]);
      setLastSynced(new Date());
    } catch (err) {
      setSyncError(err.message);
    }
  };

  // ── Wrapped state setters that also push to Sheet ─────────────
  const startCourse = (courseId) => {
    const iso = new Date().toISOString();
    setCourseStartDates((prev) => ({ ...prev, [courseId]: iso }));
    pushStartDate(courseId, iso);
  };

  const resetCourse = (courseId) => {
    setCourseStartDates((prev) => { const n = { ...prev }; delete n[courseId]; return n; });
    clearStartDate(courseId);
  };

  const selectedCourse = curriculum.find((c) => c.id === expandedCourse);

  const toggleItem = (courseId, week, type) => {
    const key = `${courseId}.${week}.${type}`;
    const newVal = !completed[key];
    setCompleted((prev) => ({ ...prev, [key]: newVal }));
    pushCompletion(key, newVal);
  };

  const courseProgress = (courseId) => {
    const course = curriculum.find((c) => c.id === courseId);
    if (!course) return { pct: 0, done: 0, total: 0 };
    const total = course.weeklySchedule.length * 2;
    const done = course.weeklySchedule.reduce((acc, w) => {
      if (completed[`${courseId}.${w.week}.read`]) acc++;
      if (completed[`${courseId}.${w.week}.do`]) acc++;
      return acc;
    }, 0);
    return { pct: total > 0 ? Math.round((done / total) * 100) : 0, done, total };
  };

  const ProgressBar = ({ courseId, accent, compact = false }) => {
    const { pct, done, total } = courseProgress(courseId);
    const color = accent || phaseAccent(courseId);
    if (compact) {
      return (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#555", letterSpacing: "0.08em" }}>PROGRESS</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: pct === 100 ? color : "#555" }}>{pct}%</span>
          </div>
          <div style={{ height: 3, background: "#1e1f2a", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2, transition: "width 0.3s ease" }} />
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: 16, background: "#14151e", border: "1px solid #1e1f2a", borderRadius: 8, padding: "14px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em" }}>COURSE PROGRESS</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700, color: pct === 100 ? color : "#e8e8e8" }}>
            {pct === 100 ? "✓ COMPLETE" : `${done} / ${total} items`}
          </span>
        </div>
        <div style={{ height: 6, background: "#0d0e16", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.3s ease" }} />
        </div>
        {pct > 0 && pct < 100 && (
          <div style={{ marginTop: 6, fontSize: 11, color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{pct}% complete</div>
        )}
      </div>
    );
  };

  const exportProgress = () => {
    const rows = [
      ["COURSE_CODE", "COURSE_TITLE", "PHASE", "START_DATE", "CURRENT_WEEK", "TOTAL_WEEKS", "READ_COMPLETED", "DO_COMPLETED", "TOTAL_ITEMS_COMPLETED", "TOTAL_ITEMS", "PCT_COMPLETE"],
    ];
    curriculum.forEach((course) => {
      const phase = phaseMap.find((p) => p.courses.includes(course.id));
      const startedAt = courseStartDates[course.id] || "";
      const totalWeeks = course.weeklySchedule.length;
      const currentWeek = startedAt
        ? Math.min(Math.floor((Date.now() - new Date(startedAt)) / (7 * 24 * 60 * 60 * 1000)) + 1, totalWeeks)
        : "";
      const startFormatted = startedAt
        ? new Date(startedAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
        : "";
      let readDone = 0, doDone = 0;
      course.weeklySchedule.forEach((w) => {
        if (completed[`${course.id}.${w.week}.read`]) readDone++;
        if (completed[`${course.id}.${w.week}.do`]) doDone++;
      });
      const totalItems = totalWeeks * 2;
      const totalDone = readDone + doDone;
      const pct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;
      rows.push([
        course.code,
        course.title,
        phase?.label || "",
        startFormatted,
        currentWeek,
        totalWeeks,
        readDone,
        doDone,
        totalDone,
        totalItems,
        `${pct}%`,
      ]);
    });

    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `law-curriculum-progress-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabStyle = (id, active) => ({
    padding: "10px 20px",
    color: active ? "#e8c547" : "#aaa",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #e8c547" : "2px solid transparent",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'IBM Plex Mono', monospace",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    transition: "color 0.2s",
  });

  const phaseAccent = (courseId) => {
    const p = phaseMap.find((ph) => ph.courses.includes(courseId));
    return p ? p.accent : "#555";
  };

  return (
    <div style={{ background: "#0b0c10", minHeight: "100vh", color: "#e8e8e8", fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#111218", borderBottom: "1px solid #222", padding: "32px 40px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#e8c547", letterSpacing: "0.15em", marginBottom: 8 }}>SELF-DIRECTED CURRICULUM</div>
              <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 700, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                First-Year Law School<br /><span style={{ color: "#e8c547" }}>for Business Professionals</span>
              </h1>
              <p style={{ color: "#888", marginTop: 12, fontSize: 14, maxWidth: 560, lineHeight: 1.6 }}>
                A structured 12-month self-study program covering the full 1L curriculum — built for executives, entrepreneurs, and operators who need legal fluency, not a law degree.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", minWidth: 200 }}>
              {/* Stats */}
              <div style={{ display: "flex", gap: 8 }}>
                {[{ n: "10", label: "Courses" }, { n: "12 mo", label: "Timeline" }, { n: "34", label: "Cases" }].map((s) => (
                  <div key={s.label} style={{ background: "#1a1b22", border: "1px solid #2a2b35", borderRadius: 6, padding: "8px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace" }}>{s.n}</div>
                    <div style={{ fontSize: 9, color: "#666", letterSpacing: "0.1em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Google Sheets connection */}
              {!gToken ? (
                <button
                  onClick={signIn}
                  disabled={!gsiReady || syncStatus === "syncing"}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "#14151e", border: "1px solid #2a2b35", borderRadius: 6, padding: "9px 14px", cursor: gsiReady ? "pointer" : "not-allowed", width: "100%", justifyContent: "center", transition: "border-color 0.2s", boxSizing: "border-box" }}
                  onMouseEnter={(e) => { if (gsiReady) e.currentTarget.style.borderColor = "#4ecdc4"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2b35"; }}
                >
                  {syncStatus === "syncing" ? (
                    <span style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>CONNECTING…</span>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="7" height="7" rx="1" fill="#4ecdc4"/>
                        <rect x="14" y="3" width="7" height="7" rx="1" fill="#e8c547"/>
                        <rect x="3" y="14" width="7" height="7" rx="1" fill="#f5645a"/>
                        <rect x="14" y="14" width="7" height="7" rx="1" fill="#4ecdc4" opacity="0.5"/>
                      </svg>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#4ecdc4", letterSpacing: "0.08em" }}>CONNECT GOOGLE SHEET</span>
                    </>
                  )}
                </button>
              ) : (
                <div style={{ background: "#0a1a0e", border: "1px solid #1a3020", borderRadius: 6, padding: "8px 12px", width: "100%", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: syncStatus === "syncing" ? "#e8c547" : syncStatus === "error" ? "#f5645a" : "#4caf50", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: syncStatus === "error" ? "#f5645a" : "#4caf50", letterSpacing: "0.06em" }}>
                        {syncStatus === "syncing" ? "SYNCING…" : syncStatus === "error" ? "SYNC ERROR" : "SHEET CONNECTED"}
                      </span>
                    </div>
                    <button onClick={signOut} style={{ background: "none", border: "none", color: "#444", fontSize: 9, cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", padding: 0 }}>disconnect</button>
                  </div>
                  {syncError && <div style={{ fontSize: 9, color: "#f5645a", marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace", wordBreak: "break-all" }}>{syncError}</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 9, color: "#444", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {lastSynced ? `Synced ${lastSynced.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
                    </span>
                    <button onClick={() => pullFromSheet(gToken)} style={{ background: "none", border: "none", color: "#4ecdc4", fontSize: 9, cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", padding: 0 }}>↻ refresh</button>
                  </div>
                </div>
              )}

              {/* Export CSV */}
              <button
                onClick={exportProgress}
                title="Export progress as CSV"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#1a1b22", border: "1px solid #2a2b35", borderRadius: 6, padding: "8px 14px", cursor: "pointer", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e8c547")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2b35")}
              >
                <span style={{ fontSize: 12, color: "#e8c547" }}>↓</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#e8c547", letterSpacing: "0.08em" }}>EXPORT CSV</span>
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #222", overflowX: "auto" }}>
            {[
              { id: "roadmap", label: "ROADMAP" },
              { id: "courses", label: "COURSES" },
              { id: "paths", label: "BUSINESS PATHS" },
              { id: "resources", label: "HOW TO STUDY" },
              { id: "reading-list", label: "READING LIST" },
            ].map((t) => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setExpandedCourse(null); }} style={tabStyle(t.id, activeTab === t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 40px" }}>

        {/* ROADMAP */}
        {activeTab === "roadmap" && (
          <div>
            <p style={{ color: "#888", marginBottom: 32, fontSize: 14 }}>
              Sequenced to mirror the 1L experience at Harvard, Yale, Stanford, Northwestern, UChicago, and Michigan. Three courses — Business Associations, Law &amp; Economics, and Legislation — were added based on curricula at Northwestern and UChicago.
            </p>
            {phaseMap.map((phase) => (
              <div key={phase.label} style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 3, height: 40, background: phase.accent, borderRadius: 2 }} />
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: phase.accent, letterSpacing: "0.12em" }}>{phase.months}</div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{phase.label}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                  {curriculum.filter((c) => phase.courses.includes(c.id)).map((course) => (
                    <div
                      key={course.id}
                      onClick={() => { setExpandedCourse(course.id); setActiveTab("courses"); setActiveSection("concepts"); }}
                      style={{ background: "#14151e", border: "1px solid #222", borderLeft: `3px solid ${phase.accent}`, borderRadius: 8, padding: 20, cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1b25")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#14151e")}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#555" }}>{course.code}</span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#555" }}>{course.credits} CR · {course.hoursPerWeek}</span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{course.title}</div>
                      <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 8 }}>{course.overview}</div>
                      {course.schoolNote && <div style={{ fontSize: 10, color: "#7b9fd4", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8, lineHeight: 1.4 }}>🏛 {course.schoolNote}</div>}
                      <div style={{ background: "#0d0e16", borderRadius: 5, padding: "8px 12px", fontSize: 11, color: phase.accent, lineHeight: 1.5, marginBottom: 10 }}>💼 {course.businessRelevance}</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#555" }}>{course.duration} · View curriculum →</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COURSES LIST */}
        {activeTab === "courses" && !expandedCourse && (
          <div>
            <p style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>Select a course to see concepts, weekly schedule, textbooks, lectures, and landmark cases.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {curriculum.map((course) => {
                const phase = phaseMap.find((p) => p.courses.includes(course.id));
                const accent = phase?.accent || "#e8c547";
                const startedAt = courseStartDates[course.id];
                const currentWeek = startedAt
                  ? Math.min(Math.floor((Date.now() - new Date(startedAt)) / (7 * 24 * 60 * 60 * 1000)) + 1, course.weeklySchedule.length)
                  : null;
                const { pct } = courseProgress(course.id);
                const isComplete = pct === 100;
                return (
                  <div key={course.id} onClick={() => { setExpandedCourse(course.id); setActiveSection("concepts"); }}
                    style={{ background: "#14151e", border: `1px solid ${startedAt ? accent + "40" : "#222"}`, borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: 18, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1b25")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#14151e")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#555" }}>{course.code} · {course.duration}</div>
                      {isComplete ? (
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#4caf50", background: "#0e1f0e", border: "1px solid #1a3020", borderRadius: 3, padding: "2px 7px", letterSpacing: "0.06em" }}>✓ DONE</span>
                      ) : startedAt ? (
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: accent, background: accent + "18", border: `1px solid ${accent}44`, borderRadius: 3, padding: "2px 7px", letterSpacing: "0.06em" }}>WK {currentWeek}/{course.weeklySchedule.length}</span>
                      ) : (
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#444", background: "#111", border: "1px solid #222", borderRadius: 3, padding: "2px 7px", letterSpacing: "0.06em" }}>NOT STARTED</span>
                      )}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{course.title}</div>
                    <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5, marginBottom: startedAt ? 8 : 0 }}>{course.overview}</div>
                    {startedAt && (
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#444", marginBottom: 2 }}>
                        Started {new Date(startedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    )}
                    <ProgressBar courseId={course.id} accent={accent} compact />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* COURSE DETAIL */}
        {activeTab === "courses" && expandedCourse && selectedCourse && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button onClick={() => setExpandedCourse(null)} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "6px 14px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
                ← All Courses
              </button>
              {(() => {
                const started = courseStartDates[selectedCourse.id];
                const accent = phaseAccent(selectedCourse.id);
                if (started) {
                  const d = new Date(started);
                  const weeksElapsed = Math.floor((Date.now() - d) / (7 * 24 * 60 * 60 * 1000));
                  const currentWeek = Math.min(weeksElapsed + 1, selectedCourse.weeklySchedule.length);
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: accent, letterSpacing: "0.1em" }}>
                          WEEK {currentWeek} OF {selectedCourse.weeklySchedule.length}
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#444", marginTop: 2 }}>
                          Started {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                      {confirmReset === selectedCourse.id ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#888" }}>Sure?</span>
                          <button
                            onClick={() => { resetCourse(selectedCourse.id); setConfirmReset(null); }}
                            style={{ background: "#3a1010", border: "1px solid #5a2020", color: "#f5645a", padding: "4px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                          >Yes</button>
                          <button
                            onClick={() => setConfirmReset(null)}
                            style={{ background: "none", border: "1px solid #2a2b35", color: "#555", padding: "4px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                          >No</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmReset(selectedCourse.id)}
                          style={{ background: "none", border: "1px solid #2a2b35", color: "#555", padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                        >Reset</button>
                      )}
                    </div>
                  );
                }
                return (
                  <button
                    onClick={() => startCourse(selectedCourse.id)}
                    style={{ background: accent, border: "none", color: "#0b0c10", padding: "9px 20px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 7 }}
                  >
                    ▶ START COURSE
                  </button>
                );
              })()}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", marginBottom: 4 }}>
                {selectedCourse.code} — {selectedCourse.credits} Credits · {selectedCourse.duration} · {selectedCourse.hoursPerWeek}/week
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{selectedCourse.title}</h2>
              <p style={{ color: "#888", fontSize: 14, margin: "0 0 12px", maxWidth: 680, lineHeight: 1.6 }}>{selectedCourse.overview}</p>
              {selectedCourse.schoolNote && (
                <div style={{ background: "#111830", border: "1px solid #1e2a4a", borderRadius: 6, padding: "8px 14px", display: "inline-block", fontSize: 11, color: "#7b9fd4", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 12 }}>
                  🏛 {selectedCourse.schoolNote}
                </div>
              )}
              <div style={{ background: "#1a1b22", border: "1px solid #2a2b35", borderRadius: 6, padding: "12px 16px", display: "inline-block", fontSize: 13, color: "#e8c547" }}>
                💼 {selectedCourse.businessRelevance}
              </div>
              <ProgressBar courseId={selectedCourse.id} accent={phaseAccent(selectedCourse.id)} />
            </div>

            {/* Sub-tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #222", marginBottom: 24, overflowX: "auto" }}>
              {[
                { id: "concepts", label: "CONCEPTS" },
                { id: "schedule", label: "WEEKLY SCHEDULE" },
                { id: "textbooks", label: "TEXTBOOKS" },
                { id: "lectures", label: "LECTURES" },
                { id: "cases", label: "CASES" },
              ].map((s) => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} style={tabStyle(s.id, activeSection === s.id)}>
                  {s.label}
                </button>
              ))}
            </div>

            {/* CONCEPTS */}
            {activeSection === "concepts" && (
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 16 }}>KEY CONCEPTS FOR BUSINESS</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {selectedCourse.keyConceptsForBusiness.map((concept, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, background: "#14151e", border: "1px solid #1e1f2a", borderRadius: 7, padding: "14px 18px", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#e8c547", flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 14, color: "#ddd", lineHeight: 1.5 }}>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WEEKLY SCHEDULE */}
            {activeSection === "schedule" && (() => {
              const phase = phaseMap.find((p) => p.courses.includes(selectedCourse.id));
              const accent = phase?.accent || "#e8c547";
              const startedAt = courseStartDates[selectedCourse.id];
              const currentWeek = startedAt
                ? Math.min(Math.floor((Date.now() - new Date(startedAt)) / (7 * 24 * 60 * 60 * 1000)) + 1, selectedCourse.weeklySchedule.length)
                : null;
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: accent, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", margin: "0 0 4px" }}>WEEKLY SCHEDULE</h3>
                      <p style={{ fontSize: 12, color: "#555", margin: 0 }}>{selectedCourse.duration} · {selectedCourse.hoursPerWeek} per week · {selectedCourse.weeklySchedule.length} weeks</p>
                    </div>
                    <div style={{ display: "flex", gap: 14, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {[{ color: "#e8c547", label: "READ" }, { color: "#4ecdc4", label: "DO" }].map((l) => (
                        <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, color: "#555" }}>
                          <div style={{ width: 20, height: 14, background: l.color === "#e8c547" ? "#1a1808" : "#081a1a", border: `1px solid ${l.color === "#e8c547" ? "#2a2810" : "#102828"}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 8, color: l.color }}>{l.label}</span>
                          </div>
                          {l.label === "READ" ? "Readings" : "Tasks"}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {selectedCourse.weeklySchedule.map((w) => {
                      const readDone = !!completed[`${selectedCourse.id}.${w.week}.read`];
                      const doDone = !!completed[`${selectedCourse.id}.${w.week}.do`];
                      const weekDone = readDone && doDone;
                      const isCurrent = currentWeek === w.week;
                      return (
                        <div key={w.week} style={{ background: weekDone ? "#0e1510" : isCurrent ? "#141520" : "#14151e", border: `1px solid ${weekDone ? "#1a3020" : isCurrent ? accent + "55" : "#1e1f2a"}`, borderRadius: 8, display: "flex", overflow: "hidden", transition: "background 0.2s, border-color 0.2s", boxShadow: isCurrent && !weekDone ? `0 0 0 1px ${accent}33` : "none" }}>
                          <div style={{ background: weekDone ? "#0a1a0e" : "#0d0e16", borderRight: `1px solid ${weekDone ? "#1a3020" : "#1e1f2a"}`, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 52, flexShrink: 0 }}>
                            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: "#444", letterSpacing: "0.1em", marginBottom: 2 }}>WK</div>
                            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 700, color: weekDone ? "#4caf50" : accent, lineHeight: 1 }}>{String(w.week).padStart(2, "0")}</div>
                            {isCurrent && !weekDone && (
                              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: accent, letterSpacing: "0.06em", marginTop: 4, background: accent + "22", borderRadius: 2, padding: "1px 4px" }}>NOW</div>
                            )}
                          </div>
                          <div style={{ padding: "14px 18px", flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: weekDone ? "#888" : "#e8e8e8", marginBottom: 10, lineHeight: 1.3, textDecoration: weekDone ? "line-through" : "none" }}>{w.topic}</div>
                            <div style={{ display: "grid", gap: 7 }}>
                              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <button
                                  onClick={() => toggleItem(selectedCourse.id, w.week, "read")}
                                  title={readDone ? "Mark as incomplete" : "Mark as complete"}
                                  style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${readDone ? "#e8c547" : "#333"}`, background: readDone ? "#e8c547" : "transparent", flexShrink: 0, marginTop: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, transition: "all 0.15s" }}
                                >
                                  {readDone && <span style={{ fontSize: 9, color: "#0b0c10", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                                </button>
                                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: readDone ? "#555" : "#e8c547", background: readDone ? "#111" : "#1a1808", border: `1px solid ${readDone ? "#222" : "#2a2810"}`, borderRadius: 3, padding: "2px 5px", flexShrink: 0, marginTop: 2, letterSpacing: "0.04em" }}>READ</span>
                                <span style={{ fontSize: 12, color: readDone ? "#555" : "#aaa", lineHeight: 1.5, textDecoration: readDone ? "line-through" : "none" }}>{w.readings}</span>
                              </div>
                              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <button
                                  onClick={() => toggleItem(selectedCourse.id, w.week, "do")}
                                  title={doDone ? "Mark as incomplete" : "Mark as complete"}
                                  style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${doDone ? "#4ecdc4" : "#333"}`, background: doDone ? "#4ecdc4" : "transparent", flexShrink: 0, marginTop: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, transition: "all 0.15s" }}
                                >
                                  {doDone && <span style={{ fontSize: 9, color: "#0b0c10", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                                </button>
                                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: doDone ? "#555" : "#4ecdc4", background: doDone ? "#111" : "#081a1a", border: `1px solid ${doDone ? "#222" : "#102828"}`, borderRadius: 3, padding: "2px 6px", flexShrink: 0, marginTop: 2, letterSpacing: "0.04em" }}>DO</span>
                                <span style={{ fontSize: 12, color: doDone ? "#555" : "#888", lineHeight: 1.5, textDecoration: doDone ? "line-through" : "none" }}>{w.tasks}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* TEXTBOOKS */}
            {activeSection === "textbooks" && (
              <div>
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 14 }}>CANONICAL CASEBOOK</h3>
                  <div style={{ background: "#14151e", border: "1px solid #2a2b35", borderLeft: "3px solid #e8c547", borderRadius: 8, padding: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{selectedCourse.canonicalTextbook.title}</div>
                    <div style={{ fontSize: 13, color: "#aaa", marginBottom: 4 }}>{selectedCourse.canonicalTextbook.authors}</div>
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>{selectedCourse.canonicalTextbook.edition}</div>
                    <div style={{ fontSize: 12, color: "#888", background: "#0d0e16", borderRadius: 5, padding: "6px 10px", display: "inline-block" }}>{selectedCourse.canonicalTextbook.note}</div>
                  </div>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#4ecdc4", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 14 }}>SUPPLEMENTS & STUDY AIDS</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {selectedCourse.supplements.map((s, i) => (
                    <div key={i} style={{ background: "#14151e", border: "1px solid #1e1f2a", borderRadius: 8, padding: 18, display: "flex", gap: 16 }}>
                      <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: "#4ecdc4", background: "#0d1f1f", border: "1px solid #1a3535", borderRadius: 4, padding: "3px 8px", height: "fit-content", whiteSpace: "nowrap", marginTop: 2 }}>{s.type}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: "#777", marginBottom: 4 }}>{s.authors}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LECTURES */}
            {activeSection === "lectures" && (
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#f5645a", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 14 }}>PUBLICLY AVAILABLE LECTURES</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {selectedCourse.lectures.map((l, i) => (
                    <div key={i} style={{ background: "#14151e", border: "1px solid #1e1f2a", borderRadius: 8, padding: 18 }}>
                      <div style={{ fontSize: 11, color: "#f5645a", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6 }}>{l.source}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{l.title}</div>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{l.note}</div>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#e8c547", textDecoration: "none", fontFamily: "'IBM Plex Mono', monospace" }}>{l.url} ↗</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CASES */}
            {activeSection === "cases" && (
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#888", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 14 }}>LANDMARK CASES — WHAT YOU NEED TO KNOW</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>You don't need to read full case opinions. Read the facts, holding, and business lesson from each case.</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {selectedCourse.primaryCases.map((c, i) => (
                    <div key={i} style={{ background: "#14151e", border: "1px solid #1e1f2a", borderRadius: 8, padding: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: "#2a2b35", fontWeight: 700, flexShrink: 0, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, fontStyle: "italic" }}>{c.name}</div>
                        <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>{c.lesson}</div>
                        <a href={`https://www.oyez.org/search#q=${encodeURIComponent(c.name.split("(")[0].trim())}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#555", fontFamily: "'IBM Plex Mono', monospace", marginTop: 8, display: "block", textDecoration: "none" }}>Search on Oyez ↗</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BUSINESS PATHS */}
        {activeTab === "paths" && (
          <div>
            <p style={{ color: "#888", marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>
              Not everyone needs equal depth in every subject. These paths prioritize the courses most relevant to your business context.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 36 }}>
              {businessPaths.map((path) => (
                <div key={path.label} onClick={() => setSelectedPath(selectedPath === path.label ? null : path.label)}
                  style={{ background: selectedPath === path.label ? "#1a1b25" : "#14151e", border: selectedPath === path.label ? "1px solid #e8c547" : "1px solid #222", borderRadius: 8, padding: 18, cursor: "pointer" }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: selectedPath === path.label ? "#e8c547" : "#e8e8e8" }}>{path.label}</div>
                  <div style={{ fontSize: 12, color: "#777", marginBottom: 12 }}>{path.note}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {path.courses.map((cid) => {
                      const c = curriculum.find((x) => x.id === cid);
                      return <span key={cid} style={{ fontSize: 10, background: "#0d0e16", border: "1px solid #2a2b35", borderRadius: 4, padding: "2px 8px", color: "#aaa", fontFamily: "'IBM Plex Mono', monospace" }}>{c?.title}</span>;
                    })}
                  </div>
                </div>
              ))}
            </div>
            {selectedPath && (
              <div>
                <h3 style={{ fontSize: 13, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 16 }}>{selectedPath.toUpperCase()} — PRIORITY CURRICULUM</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {businessPaths.find((p) => p.label === selectedPath)?.courses.map((cid, i) => {
                    const course = curriculum.find((c) => c.id === cid);
                    const phase = phaseMap.find((p) => p.courses.includes(cid));
                    return (
                      <div key={cid} onClick={() => { setExpandedCourse(cid); setActiveTab("courses"); setActiveSection("concepts"); }}
                        style={{ background: "#14151e", border: "1px solid #1e1f2a", borderLeft: `3px solid ${phase?.accent}`, borderRadius: 8, padding: 18, cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1b25")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#14151e")}
                      >
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{course?.title}</div>
                          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{course?.overview}</div>
                          <div style={{ fontSize: 11, color: phase?.accent }}>💼 {course?.businessRelevance}</div>
                        </div>
                        <span style={{ fontSize: 11, color: "#555", fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>→</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HOW TO STUDY */}
        {activeTab === "resources" && (
          <div style={{ maxWidth: 720 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>How to Study Law Without Law School</h2>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Law school pedagogy is Socratic and case-based. You learn by reading judicial opinions and asking: What happened? What did the court decide? Why? What's the rule? Here's how to replicate that rigorously on your own.
            </p>
            {[
              { step: "01", title: "Read Cases Before Textbooks", accent: "#e8c547", content: "For each landmark case, read the full opinion on Oyez.org or Justia.com. Then read the textbook's treatment. The case first forces you to reason from facts — which is how legal thinking works. Textbooks synthesize; cases teach." },
              { step: "02", title: "Brief Every Case with IRAC", accent: "#4ecdc4", content: "Write a 1-page case brief: Issue (legal question), Rule (what law applies), Analysis (how the court applied it), Conclusion (result). This is the core skill. After 20 briefs, you'll read contracts and statutes differently." },
              { step: "03", title: "Follow the Weekly Schedule", accent: "#f5645a", content: "Each course has a week-by-week schedule with specific READ and DO tasks. The DO tasks are case-based: a specific case to brief, a comparison to draw between two opinions, or a doctrine question to answer using the cases as your source material. These move you from passive reading to active legal reasoning." },
              { step: "04", title: "Use Study Aids to Synthesize", accent: "#a78bfa", content: "After working through 3–5 cases in an area, read the corresponding E&E or Nutshell chapter. This crystallizes doctrine. The Examples & Explanations (E&E) series is the best self-study supplement ever written — do the problems, not just the text." },
              { step: "05", title: "Apply to Real Business Situations", accent: "#e8c547", content: "After each doctrine, ask: Where does this appear in my work? Read a vendor contract after studying Contracts. Read your company's privacy policy after studying Constitutional Law's due process. Read public M&A filings after studying Property." },
              { step: "06", title: "Monthly: Discuss with an Attorney", accent: "#4ecdc4", content: "Find a lawyer — in-house counsel, a friend, an outside advisor — and spend 45 minutes monthly discussing what you learned. Ask: When do you see this issue? How does it actually play out? What do most non-lawyers get wrong?" },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: 24, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid #1a1b22" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: "#1e1f2a", flexShrink: 0, lineHeight: 1, minWidth: 40 }}>{item.step}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: item.accent }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#999", lineHeight: 1.7 }}>{item.content}</div>
                </div>
              </div>
            ))}
            <div style={{ background: "#14151e", border: "1px solid #2a2b35", borderRadius: 8, padding: 24, marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 12 }}>ALWAYS-OPEN TABS</div>
              {[
                { name: "Cornell LII (Wex)", url: "https://www.law.cornell.edu/wex", note: "Free legal dictionary and doctrine explainers" },
                { name: "Oyez.org", url: "https://www.oyez.org", note: "SCOTUS case audio, facts, and holdings" },
                { name: "Justia.com", url: "https://law.justia.com", note: "Full text of cases, statutes, and regulations" },
                { name: "Google Scholar (Cases)", url: "https://scholar.google.com", note: "Free full-text opinions from federal and state courts" },
                { name: "FRCP (Full Text)", url: "https://www.law.cornell.edu/rules/frcp", note: "Federal Rules of Civil Procedure — read all 86 rules" },
              ].map((r) => (
                <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #1a1b22" }}>
                  <div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "#ddd", textDecoration: "none" }}>{r.name}</a>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{r.note}</div>
                  </div>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0, marginLeft: 16, textDecoration: "none" }}>↗</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* READING LIST */}
        {activeTab === "reading-list" && (() => {
          const typeConfig = {
            "Casebook":          { color: "#e8c547", bg: "#1f1c0a" },
            "Hornbook":          { color: "#4ecdc4", bg: "#0a1f1e" },
            "Study Aid":         { color: "#a78bfa", bg: "#130f1f" },
            "Treatise":          { color: "#f5645a", bg: "#1f0f0e" },
            "Restatement":       { color: "#f5645a", bg: "#1f0f0e" },
            "Primary Source":    { color: "#888",    bg: "#141414" },
            "Practice Guide":    { color: "#4ecdc4", bg: "#0a1f1e" },
            "Writing Guide":     { color: "#a78bfa", bg: "#130f1f" },
            "Research Guide":    { color: "#a78bfa", bg: "#130f1f" },
            "Free Resource":     { color: "#4ecdc4", bg: "#0a1f1e" },
            "Business Focus":    { color: "#f5645a", bg: "#1f0f0e" },
            "Seminal Article":   { color: "#e8c547", bg: "#1f1c0a" },
            "Introductory Text": { color: "#4ecdc4", bg: "#0a1f1e" },
            "Case Companion":    { color: "#888",    bg: "#141414" },
            "Counterpoint":      { color: "#a78bfa", bg: "#130f1f" },
          };
          const fallback = { color: "#888", bg: "#141414" };
          const seen = new Set();
          const allBooks = [];
          curriculum.forEach((course) => {
            const cbKey = `${course.canonicalTextbook.title}|${course.canonicalTextbook.authors}`;
            if (!seen.has(cbKey)) { seen.add(cbKey); allBooks.push({ ...course.canonicalTextbook, type: "Casebook", course: course.title, courseId: course.id }); }
            course.supplements.forEach((s) => {
              const key = `${s.title}|${s.authors}`;
              if (!seen.has(key)) { seen.add(key); allBooks.push({ ...s, course: course.title, courseId: course.id }); }
            });
          });
          const grouped = {};
          allBooks.forEach((b) => { const t = b.type || "Other"; if (!grouped[t]) grouped[t] = []; grouped[t].push(b); });
          const typeOrder = ["Casebook", "Study Aid", "Hornbook", "Treatise", "Restatement", "Seminal Article", "Introductory Text", "Case Companion", "Primary Source", "Practice Guide", "Writing Guide", "Research Guide", "Free Resource", "Business Focus", "Counterpoint"];
          const sortedTypes = typeOrder.filter((t) => grouped[t]);
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>Required Texts</h2>
                  <p style={{ color: "#888", fontSize: 14, margin: 0 }}>{allBooks.length} titles across {curriculum.length} courses — grouped by type, attributed to course.</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[{ label: "Casebook", color: "#e8c547" }, { label: "Study Aid", color: "#a78bfa" }, { label: "Hornbook", color: "#4ecdc4" }, { label: "Treatise / Article", color: "#f5645a" }, { label: "Primary Source", color: "#888" }].map((leg) => (
                    <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: leg.color }} />{leg.label}
                    </div>
                  ))}
                </div>
              </div>
              {sortedTypes.map((type) => {
                const cfg = typeConfig[type] || fallback;
                return (
                  <div key={type} style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 3, height: 20, background: cfg.color, borderRadius: 2 }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: cfg.color, letterSpacing: "0.12em" }}>{type.toUpperCase()} — {grouped[type].length}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 10 }}>
                      {grouped[type].map((book, i) => (
                        <div key={i} onClick={() => { setExpandedCourse(book.courseId); setActiveTab("courses"); setActiveSection("textbooks"); }}
                          style={{ background: "#14151e", border: "1px solid #1e1f2a", borderLeft: `3px solid ${cfg.color}`, borderRadius: 7, padding: "14px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1b25")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#14151e")}
                        >
                          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{book.title}</div>
                          <div style={{ fontSize: 11, color: "#777" }}>{book.authors}{book.edition ? ` — ${book.edition}` : ""}</div>
                          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{book.note}</div>
                          <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: phaseAccent(book.courseId), flexShrink: 0 }} />
                            <span style={{ fontSize: 10, color: "#555", fontFamily: "'IBM Plex Mono', monospace" }}>{book.course}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
                <div style={{ background: "#14151e", border: "1px solid #1e2a1e", borderLeft: "3px solid #4ecdc4", borderRadius: 8, padding: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#4ecdc4", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 10 }}>FREE — START HERE</div>
                  {[
                    { title: "Cornell LII (Wex)", url: "https://www.law.cornell.edu/wex", note: "Legal definitions, doctrine summaries, full U.S. Code" },
                    { title: "Oyez.org", url: "https://www.oyez.org", note: "Full SCOTUS case audio, facts, and holdings" },
                    { title: "Justia.com", url: "https://law.justia.com", note: "Full-text opinions, statutes, regulations" },
                    { title: "Google Scholar (Cases)", url: "https://scholar.google.com", note: "Federal and state court opinions" },
                    { title: "Coase — The Problem of Social Cost", url: "https://www.jstor.org/stable/724810", note: "JSTOR — most cited law article ever written" },
                    { title: "DOJ FCPA Resource Guide", url: "https://www.justice.gov/criminal/criminal-fraud/fcpa-guidance", note: "Free PDF — definitive white-collar compliance guide" },
                  ].map((r) => (
                    <div key={r.title} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid #1a2a1a" }}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: "#ddd", textDecoration: "none", display: "block", marginBottom: 2 }}>{r.title} ↗</a>
                      <div style={{ fontSize: 11, color: "#666" }}>{r.note}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#14151e", border: "1px solid #2a2a1e", borderLeft: "3px solid #e8c547", borderRadius: 8, padding: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e8c547", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", marginBottom: 10 }}>BUY — PRIORITY ORDER</div>
                  <p style={{ fontSize: 12, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>If budget is a constraint, buy in this order. Each E&amp;E can substitute for its casebook for self-study.</p>
                  {[
                    { rank: "01", title: "E&E: Contracts — Blum", note: "Most foundational subject; E&E alone is sufficient for self-study" },
                    { rank: "02", title: "E&E: Civil Procedure — Glannon", note: "Gold standard; widely considered the best law school supplement ever written" },
                    { rank: "03", title: "Business Associations (Casebook) — Klein et al.", note: "No great E&E substitute; buy the casebook" },
                    { rank: "04", title: "Economic Analysis of Law — Posner", note: "Shapes how you think about every other subject" },
                    { rank: "05", title: "Reading Law — Scalia & Garner", note: "Essential for understanding how courts read statutes today" },
                    { rank: "06", title: "E&E: Torts — Glannon", note: "Then E&Es for Property and Criminal Law as needed" },
                  ].map((r) => (
                    <div key={r.rank} style={{ display: "flex", gap: 12, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid #2a2a14" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#333", fontWeight: 700, flexShrink: 0 }}>{r.rank}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd", marginBottom: 2 }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: "#666" }}>{r.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      <div style={{ borderTop: "1px solid #1a1b22", padding: "24px 40px", textAlign: "center" }}>
        <p style={{ color: "#444", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", margin: 0 }}>
          CURRICULUM BASED ON 1L PROGRAMS AT HARVARD · YALE · STANFORD · COLUMBIA · NORTHWESTERN · UCHICAGO · MICHIGAN
        </p>
      </div>
    </div>
  );
}
