const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    let textToAnalyze = "";

    if (body.text) {
      textToAnalyze = body.text;
    } else if (body.file && body.filename) {
      const base64Data = body.file.split(',')[1] || body.file;
      const fileContent = atob(base64Data);
      textToAnalyze = fileContent;
    } else {
      throw new Error("No text or file provided");
    }

    const analysis = analyzeLegalText(textToAnalyze);

    return new Response(
      JSON.stringify(analysis),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Analysis failed" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function analyzeLegalText(text: string) {
  const lowerText = text.toLowerCase();

  const keywords = {
    contract: /\b(contract|agreement|lease|terms|conditions|clause)\b/gi,
    rental: /\b(rent|rental|landlord|tenant|lease|evict|property)\b/gi,
    employment: /\b(employ|job|work|salary|wage|termination|non-compete|fired)\b/gi,
    business: /\b(business|company|partner|llc|corporation|profit|investment)\b/gi,
    consumer: /\b(purchase|buy|refund|warranty|defect|consumer|product)\b/gi,
    estate: /\b(will|estate|inherit|heir|property|death|beneficiary)\b/gi,
    dispute: /\b(dispute|conflict|disagree|breach|violat|sue|lawsuit)\b/gi,
    money: /\$[0-9,]+/g,
  };

  let category = "General Legal";
  if (keywords.rental.test(text)) category = "Landlord-Tenant Law";
  else if (keywords.employment.test(text)) category = "Employment Law";
  else if (keywords.business.test(text)) category = "Business Law";
  else if (keywords.consumer.test(text)) category = "Consumer Protection";
  else if (keywords.estate.test(text)) category = "Estate Law";

  const hasDispute = keywords.dispute.test(text);
  const moneyAmounts = text.match(keywords.money) || [];

  const summary = generateSummary(text, category, hasDispute);
  const legal_points = generateLegalPoints(text, category);
  const risks = generateRisks(text, category, hasDispute);
  const advice = generateAdvice(text, category, hasDispute);
  const template = generateTemplate(category);

  return {
    summary,
    legal_points,
    risks,
    advice,
    template,
  };
}

function generateSummary(text: string, category: string, hasDispute: boolean): string {
  const wordCount = text.split(/\s+/).length;
  const complexityLevel = wordCount > 200 ? "complex" : wordCount > 100 ? "moderate" : "straightforward";

  let summary = `This appears to be a ${complexityLevel} ${category.toLowerCase()} matter. `;

  if (hasDispute) {
    summary += "There appears to be a dispute or disagreement involved. ";
  }

  if (category === "Landlord-Tenant Law") {
    summary += "The issue involves rights and obligations between a landlord and tenant, which are typically governed by state-specific rental laws and the terms of the lease agreement. ";
  } else if (category === "Employment Law") {
    summary += "This concerns employment-related rights and obligations, which are governed by federal and state labor laws, as well as any employment contract terms. ";
  } else if (category === "Business Law") {
    summary += "This involves business relationships and obligations, which are governed by contract law, business entity regulations, and applicable commercial codes. ";
  } else if (category === "Consumer Protection") {
    summary += "This relates to consumer rights and seller obligations, which are protected by federal and state consumer protection laws, warranty laws, and the Uniform Commercial Code. ";
  } else if (category === "Estate Law") {
    summary += "This concerns estate planning and inheritance matters, which are governed by state probate laws and specific statutory requirements for valid wills and trusts. ";
  }

  summary += "The situation requires careful review of applicable laws and any relevant written agreements.";

  return summary;
}

function generateLegalPoints(text: string, category: string): string[] {
  const points: string[] = [];

  if (category === "Landlord-Tenant Law") {
    points.push("Lease agreements are legally binding contracts that establish rights and obligations for both parties.");
    points.push("Most jurisdictions prohibit mid-lease rent increases unless specifically allowed in the lease agreement.");
    points.push("Landlords must follow state-specific procedures for lease modifications, evictions, and deposit handling.");
    points.push("Tenants have rights to habitable living conditions and protection against retaliatory actions.");
  } else if (category === "Employment Law") {
    points.push("Employment relationships can be at-will or governed by contract terms, affecting termination rights.");
    points.push("Non-compete clauses must be reasonable in scope, duration, and geographic area to be enforceable.");
    points.push("Employers must comply with wage and hour laws, including minimum wage and overtime requirements.");
    points.push("Employees have protections against discrimination, harassment, and certain retaliatory actions.");
  } else if (category === "Business Law") {
    points.push("Partnership agreements should clearly define ownership percentages, profit distribution, and exit procedures.");
    points.push("Verbal agreements can be legally binding but are difficult to prove and enforce.");
    points.push("Business dissolution requires following state-specific procedures and addressing all outstanding obligations.");
    points.push("Partners generally have fiduciary duties to each other and to the business entity.");
  } else if (category === "Consumer Protection") {
    points.push("Sellers have obligations regarding product quality, accurate descriptions, and implied warranties.");
    points.push("Many jurisdictions provide consumers with rights to refunds or replacements for defective products.");
    points.push("The Uniform Commercial Code governs many aspects of sales transactions and consumer rights.");
    points.push("Consumers may have additional protections under federal and state consumer protection statutes.");
  } else if (category === "Estate Law") {
    points.push("Valid wills must meet specific state requirements regarding execution, witnesses, and testator capacity.");
    points.push("Dying without a will (intestate) results in state laws determining asset distribution.");
    points.push("Handwritten (holographic) wills are valid in some states but have specific requirements.");
    points.push("Estate planning should consider tax implications, beneficiary designations, and probate avoidance strategies.");
  } else {
    points.push("Written contracts are generally more enforceable than oral agreements.");
    points.push("Both parties to a contract must provide consideration (something of value) for the agreement to be valid.");
    points.push("Contracts may be voidable if obtained through fraud, duress, or lack of capacity.");
    points.push("Jurisdiction and applicable law can significantly affect legal rights and remedies.");
  }

  return points;
}

function generateRisks(text: string, category: string, hasDispute: boolean): string[] {
  const risks: string[] = [];

  if (hasDispute) {
    risks.push("Disputes can escalate quickly without proper documentation and timely action.");
    risks.push("Delayed response to legal issues may result in waiver of certain rights or defenses.");
  }

  if (category === "Landlord-Tenant Law") {
    risks.push("Illegal eviction attempts or lease violations can result in penalties and tenant protections.");
    risks.push("Failure to document communications and lease violations may weaken your legal position.");
    risks.push("Some jurisdictions have strict tenant protection laws that limit landlord remedies.");
  } else if (category === "Employment Law") {
    risks.push("Overly broad non-compete clauses may be unenforceable and could limit career opportunities unnecessarily.");
    risks.push("Employment disputes can affect future job references and career prospects.");
    risks.push("Failure to follow proper termination procedures can expose parties to wrongful termination claims.");
  } else if (category === "Business Law") {
    risks.push("Operating without clear written agreements exposes parties to disputes over ownership and obligations.");
    risks.push("Partnership disputes can result in business dissolution and financial losses.");
    risks.push("Inadequate documentation of contributions and decisions can complicate dispute resolution.");
  } else if (category === "Consumer Protection") {
    risks.push("Missing refund or return deadlines may result in loss of consumer protection rights.");
    risks.push("Accepting store credit instead of refunds may limit your remedies.");
    risks.push("Failure to document product defects and seller communications can weaken claims.");
  } else if (category === "Estate Law") {
    risks.push("Improperly executed wills may be invalid, resulting in intestate distribution.");
    risks.push("Failure to update estate plans after major life changes can result in unintended consequences.");
    risks.push("DIY wills without legal review may contain errors that cause disputes or invalidation.");
  } else {
    risks.push("Proceeding without legal advice in complex matters may result in unfavorable outcomes.");
    risks.push("Statute of limitations may limit the time available to pursue legal remedies.");
  }

  risks.push("This analysis is AI-generated and may not account for jurisdiction-specific laws or recent legal changes.");

  return risks;
}

function generateAdvice(text: string, category: string, hasDispute: boolean): string[] {
  const advice: string[] = [];

  advice.push("Document everything: Keep copies of all relevant documents, communications, and evidence.");

  if (hasDispute) {
    advice.push("Consider attempting informal resolution through direct communication before pursuing legal action.");
    advice.push("Research your jurisdiction's specific laws and regulations related to this matter.");
  }

  if (category === "Landlord-Tenant Law") {
    advice.push("Review your lease agreement carefully to understand all terms and conditions.");
    advice.push("Send written communications (certified mail or email) to create a paper trail.");
    advice.push("Contact your local tenant rights organization or housing authority for guidance.");
    advice.push("If the dispute continues, consider mediation before pursuing litigation.");
  } else if (category === "Employment Law") {
    advice.push("Have the employment contract or non-compete agreement reviewed by an employment attorney.");
    advice.push("Research the enforceability of restrictive covenants in your specific state.");
    advice.push("Do not sign documents under pressure; request time to review with legal counsel.");
    advice.push("Keep records of all employment communications, performance reviews, and agreements.");
  } else if (category === "Business Law") {
    advice.push("Create a written partnership agreement immediately if one doesn't exist.");
    advice.push("Consult with a business attorney to understand dissolution procedures and obligations.");
    advice.push("Have a business valuation performed to determine fair market value.");
    advice.push("Consider mediation to resolve partnership disputes and avoid costly litigation.");
  } else if (category === "Consumer Protection") {
    advice.push("Send a formal written complaint to the seller documenting the product defect.");
    advice.push("Research your state's consumer protection laws and lemon laws if applicable.");
    advice.push("File a complaint with the Better Business Bureau and your state attorney general's office.");
    advice.push("Consider small claims court if the amount in dispute is within jurisdictional limits.");
  } else if (category === "Estate Law") {
    advice.push("Consult with an estate planning attorney to ensure your will meets all legal requirements.");
    advice.push("Consider additional estate planning tools like trusts, powers of attorney, and healthcare directives.");
    advice.push("Ensure your will is properly witnessed and executed according to state law.");
    advice.push("Review and update your estate plan regularly, especially after major life events.");
  } else {
    advice.push("Consult with a qualified attorney who specializes in this area of law.");
    advice.push("Research the applicable statutes and regulations in your jurisdiction.");
    advice.push("Do not take any irreversible actions without legal guidance.");
  }

  advice.push("Seek consultation with a licensed attorney for specific legal advice tailored to your situation.");

  return advice;
}

function generateTemplate(category: string): string {
  if (category === "Landlord-Tenant Law") {
    return `SAMPLE LETTER TO LANDLORD

[Your Name]
[Your Address]
[City, State ZIP]
[Date]

[Landlord Name]
[Landlord Address]
[City, State ZIP]

Re: Lease Agreement Dispute - [Property Address]

Dear [Landlord Name],

I am writing to formally address the recent notice regarding changes to our rental agreement dated [Lease Date]. According to Section [X] of our lease agreement, the monthly rent is fixed at $[Amount] for the duration of the lease term ending on [End Date].

I respectfully request that you honor the terms of our existing lease agreement. If you believe there are grounds for modification, please provide the specific lease provisions or legal authority that permits such changes.

I am committed to fulfilling all obligations under our lease agreement and expect the same from you as the landlord. I request a written response within [X] days.

Thank you for your attention to this matter.

Sincerely,
[Your Signature]
[Your Printed Name]`;
  } else if (category === "Employment Law") {
    return `SAMPLE LETTER REGARDING EMPLOYMENT AGREEMENT

[Your Name]
[Your Address]
[Date]

[Employer/HR Department]
[Company Name]
[Company Address]

Re: Employment Agreement Review Request

Dear [Recipient],

I am writing regarding the [employment agreement/non-compete clause] presented to me on [Date]. Before signing, I would like to request the following:

1. Additional time (at least [X] business days) to review the agreement with legal counsel
2. Clarification on Section [X] regarding [specific concern]
3. Written explanation of the enforceability of restrictive covenants in [State]

I am excited about this employment opportunity and want to ensure we have a clear mutual understanding of all terms and obligations.

I appreciate your understanding and look forward to your response.

Sincerely,
[Your Signature]
[Your Name]`;
  } else if (category === "Business Law") {
    return `SAMPLE PARTNERSHIP DISSOLUTION NOTICE

[Date]

Re: Notice of Intent to Dissolve Partnership

To: [Partner Name]
From: [Your Name]

This letter serves as formal notice of my intent to dissolve our business partnership in [Business Name], formed on [Date].

Proposed Next Steps:
1. Obtain professional business valuation
2. Inventory all business assets and liabilities
3. Review applicable state partnership dissolution laws
4. Engage mediation services if needed to resolve disputes
5. File necessary dissolution documents with state authorities

I propose we schedule a meeting within [X] days to discuss the dissolution process and timeline. I believe an amicable resolution is in both of our best interests.

Please acknowledge receipt of this notice and confirm your availability for a meeting.

Sincerely,
[Your Signature]
[Your Name]`;
  } else if (category === "Consumer Protection") {
    return `SAMPLE CONSUMER COMPLAINT LETTER

[Your Name]
[Your Address]
[Date]

[Seller/Company Name]
[Company Address]

Re: Defective Product Complaint - Order #[Number]

Dear Sir or Madam,

On [Purchase Date], I purchased a [Product Name] from your company for $[Amount] (Order #[Number]). The product failed on [Failure Date], only [X] days after purchase, due to what appears to be a manufacturing defect.

Under [State] consumer protection laws and the implied warranty of merchantability, I am entitled to a full refund or replacement for this defective product.

I request the following remedy:
[ ] Full refund of $[Amount]
[ ] Replacement product

I have attached copies of my receipt, photographs of the defect, and relevant correspondence.

Please respond within 14 days. If this matter is not resolved, I will file complaints with the Better Business Bureau and the [State] Attorney General's Consumer Protection Division.

Sincerely,
[Your Signature]
[Your Name]

Enclosures: [List]`;
  } else if (category === "Estate Law") {
    return `BASIC WILL TEMPLATE (CONSULT ATTORNEY FOR YOUR STATE)

LAST WILL AND TESTAMENT

I, [Your Full Legal Name], of [City, County, State], being of sound mind and legal age, do hereby declare this to be my Last Will and Testament, revoking all prior wills and codicils.

ARTICLE I: DECLARATIONS
I am [single/married/divorced]. I have [number] children: [names].

ARTICLE II: DEBTS AND EXPENSES
I direct my executor to pay all my legally enforceable debts and funeral expenses from my estate.

ARTICLE III: SPECIFIC BEQUESTS
I give [specific item] to [beneficiary name].

ARTICLE IV: RESIDUARY ESTATE
I give all remaining property to [beneficiary name(s)] in [equal shares/specified percentages].

ARTICLE V: EXECUTOR
I appoint [Executor Name] as executor. If unable to serve, I appoint [Alternate Name].

IN WITNESS WHEREOF, I have signed this Will on [Date].

_______________________
[Your Signature]

WITNESS ATTESTATION:
We declare that the testator signed this Will in our presence, and we signed as witnesses in the testator's presence and in each other's presence.

Witness 1: _______________  Date: _______
Print Name: _______________
Address: __________________

Witness 2: _______________  Date: _______
Print Name: _______________
Address: __________________

[Note: Requirements vary by state. Consult an attorney.]`;
  } else {
    return `SAMPLE LEGAL CORRESPONDENCE TEMPLATE

[Your Name]
[Your Address]
[City, State ZIP]
[Date]

[Recipient Name]
[Recipient Address]
[City, State ZIP]

Re: [Brief Description of Matter]

Dear [Recipient],

I am writing regarding [describe situation briefly]. This letter serves as formal notice of [state purpose].

[State facts clearly and chronologically]

[State your position and what you believe your rights are]

[State what action you want the recipient to take]

Please respond in writing within [reasonable timeframe, e.g., 14 days] to [your address/email].

If we cannot resolve this matter informally, I am prepared to pursue all available legal remedies.

Sincerely,
[Your Signature]
[Your Printed Name]

cc: [if applicable]
Enclosures: [if applicable]`;
  }
}