"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo"
import { ArrowLeftIcon, ListIcon, XIcon } from "@phosphor-icons/react"
import AuthFooter from "@/components/auth-footer"

const tocSections = [
  { id: "our-services", title: "Our Services" },
  { id: "intellectual-property", title: "Intellectual Property Rights" },
  { id: "user-representations", title: "User Representations" },
  { id: "user-registration", title: "User Registration" },
  { id: "purchases-payment", title: "Purchases and Payment" },
  { id: "subscriptions", title: "Subscriptions" },
  { id: "prohibited-activities", title: "Prohibited Activities" },
  { id: "user-contributions", title: "User Generated Contributions" },
  { id: "contribution-license", title: "Contribution License" },
  { id: "social-media", title: "Social Media" },
  { id: "services-management", title: "Services Management" },
  { id: "privacy-policy", title: "Privacy Policy" },
  { id: "copyright-infringements", title: "Copyright Infringements" },
  { id: "term-termination", title: "Term and Termination" },
  { id: "modifications-interruptions", title: "Modifications and Interruptions" },
  { id: "governing-law", title: "Governing Law" },
  { id: "dispute-resolution", title: "Dispute Resolution" },
  { id: "corrections", title: "Corrections" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "limitations-liability", title: "Limitations of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "user-data", title: "User Data" },
  { id: "electronic-communications", title: "Electronic Communications" },
  { id: "california-users", title: "California Users and Residents" },
  { id: "miscellaneous", title: "Miscellaneous" },
  { id: "contact-us", title: "Contact Us" },
]

const sectionBodyClass = "text-[13.5px] leading-[1.9] text-muted-foreground"
const sectionTitleClass = "text-[17px] font-semibold tracking-tight text-foreground"
const subTitleClass = "text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground/60 mt-8 mb-3"

export default function TermsPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = React.useState(tocSections[0].id)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )

    for (const section of tocSections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMobileNavOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0f0e1a]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] -top-[10%] h-[70vh] w-[70vh] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-indigo-500/6 blur-[100px]" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-6">
          <BrandLogo />
          <nav className="ml-8 hidden items-center gap-7 md:flex">
            <Link href="#" className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground">Product</Link>
            <Link href="#" className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground">Resources</Link>
          </nav>
          <Button asChild className="ml-auto h-9 rounded-none px-5 text-[13px] font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 pt-[calc(4rem+2rem)] pb-10 lg:pt-[calc(4rem+2.5rem)] lg:pb-16">
        <div className="mx-auto w-full max-w-5xl">
          {/* Back link */}
          <button
            onClick={() => router.back()}
            className="mb-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeftIcon size={12} weight="bold" />
            Back
          </button>

          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
            {/* Side navigation — desktop */}
            <aside className="hidden lg:block lg:self-start lg:sticky lg:top-[calc(4rem+2rem)]">
              <nav className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded border border-white/[0.06] bg-white/[0.02] p-4 pb-5">
                <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Contents
                </p>
                <div className="space-y-0.5">
                  {tocSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-sm px-2.5 py-[7px] text-left text-[11.5px] leading-snug transition-all duration-200",
                        activeSection === section.id
                          ? "bg-primary/10 text-white font-medium"
                          : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
                      )}
                    >
                      <span className={cn(
                        "w-4 shrink-0 tabular-nums text-right text-[10px] mt-px",
                        activeSection === section.id ? "text-primary" : ""
                      )}>{index + 1}</span>
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0">
              {/* Mobile TOC toggle */}
              <div className="mb-4 lg:hidden">
                <Button
                  variant="outline"
                  className="h-9 w-full gap-2 rounded-none border-white/15 bg-white/5 text-[12px] font-medium text-white/60 hover:bg-white/10 hover:text-white/80"
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                >
                  {mobileNavOpen ? <XIcon size={14} weight="bold" /> : <ListIcon size={14} weight="bold" />}
                  Table of Contents
                </Button>
                {mobileNavOpen && (
                  <div className="mt-2 space-y-0.5 rounded-sm border border-white/10 bg-[#1a1928] p-3">
                    {tocSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="flex w-full items-start gap-2 px-2 py-1.5 text-left text-[12px] leading-snug text-white/50 transition-colors hover:text-white/80"
                      >
                        <span className="w-5 shrink-0 tabular-nums text-right">{index + 1}.</span>
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Card className="rounded-none border-0 border-t-2 border-t-primary/25 py-0 gap-0 shadow-[0_4px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.04)]">
                <CardContent className="p-8 sm:p-10">
                  {/* Card header */}
                  <div className="mb-8">
                    <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
                      Terms and Conditions
                    </h1>
                    <p className="mt-1.5 text-[12px] text-muted-foreground/60">
                      Last updated February 16, 2026 &middot; {tocSections.length} sections
                    </p>
                  </div>

                  {/* Agreement intro */}
                  <div className="border-l-2 border-primary/20 pl-5 space-y-3">
                    <h2 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-foreground">Agreement to Our Legal Terms</h2>
                    <p className={sectionBodyClass}>
                      We are Asesley Inc (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
                    </p>
                    <p className={sectionBodyClass}>
                      We operate the website http://www.asesley.com (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
                    </p>
                    <p className={sectionBodyClass}>
                      These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Asesley Inc, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </p>
                    <p className={sectionBodyClass}>
                      We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
                    </p>
                    <p className={sectionBodyClass}>
                      All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
                    </p>
                    <p className={sectionBodyClass}>We recommend that you print a copy of these Legal Terms for your records.</p>
                  </div>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 1. OUR SERVICES */}
                  <section id="our-services" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>1. Our Services</h2>
                    <p className={sectionBodyClass}>
                      The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                    </p>
                    <p className={sectionBodyClass}>
                      The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 2. INTELLECTUAL PROPERTY RIGHTS */}
                  <section id="intellectual-property" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>2. Intellectual Property Rights</h2>

                    <h3 className={subTitleClass}>Our intellectual property</h3>
                    <p className={sectionBodyClass}>
                      We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
                    </p>
                    <p className={sectionBodyClass}>
                      Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
                    </p>
                    <p className={sectionBodyClass}>
                      The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
                    </p>

                    <h3 className={subTitleClass}>Your use of our Services</h3>
                    <p className={sectionBodyClass}>
                      Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to: access the Services; and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.
                    </p>
                    <p className={sectionBodyClass}>
                      Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                    </p>
                    <p className={sectionBodyClass}>
                      We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
                    </p>
                    <p className={sectionBodyClass}>
                      Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
                    </p>

                    <h3 className={subTitleClass}>Your submissions and contributions</h3>
                    <p className={sectionBodyClass}>
                      Please review this section and the &quot;PROHIBITED ACTIVITIES&quot; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
                    </p>
                    <p className={sectionBodyClass}>
                      <strong className="text-foreground">Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                    </p>
                    <p className={sectionBodyClass}>
                      <strong className="text-foreground">Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material (&quot;Contributions&quot;). Any Submission that is publicly posted shall also be treated as a Contribution.
                    </p>
                    <p className={sectionBodyClass}>
                      When you post Contributions, you grant us a license (including use of your name, trademarks, and logos): By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section.
                    </p>
                    <p className={sectionBodyClass}>
                      <strong className="text-foreground">You are responsible for what you post or upload:</strong> By sending us Submissions and/or posting Contributions through any part of the Services, you confirm that you have read and agree with our &quot;PROHIBITED ACTIVITIES&quot; and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading.
                    </p>
                    <p className={sectionBodyClass}>
                      <strong className="text-foreground">We may remove or edit your Content:</strong> Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 3. USER REPRESENTATIONS */}
                  <section id="user-representations" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>3. User Representations</h2>
                    <p className={sectionBodyClass}>
                      By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.
                    </p>
                    <p className={sectionBodyClass}>
                      If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 4. USER REGISTRATION */}
                  <section id="user-registration" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>4. User Registration</h2>
                    <p className={sectionBodyClass}>
                      You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 5. PURCHASES AND PAYMENT */}
                  <section id="purchases-payment" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>5. Purchases and Payment</h2>
                    <p className={sectionBodyClass}>We accept the following forms of payment:</p>
                    <ul className="list-disc pl-5 space-y-1 marker:text-primary/40">
                      <li className={sectionBodyClass}>Visa</li>
                      <li className={sectionBodyClass}>Mastercard</li>
                      <li className={sectionBodyClass}>American Express</li>
                    </ul>
                    <p className={sectionBodyClass}>
                      You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.
                    </p>
                    <p className={sectionBodyClass}>
                      You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
                    </p>
                    <p className={sectionBodyClass}>
                      We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 6. SUBSCRIPTIONS */}
                  <section id="subscriptions" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>6. Subscriptions</h2>

                    <h3 className={subTitleClass}>Billing and Renewal</h3>
                    <p className={sectionBodyClass}>
                      Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.
                    </p>

                    <h3 className={subTitleClass}>Cancellation</h3>
                    <p className={sectionBodyClass}>
                      All purchases are non-refundable. You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term.
                    </p>

                    <h3 className={subTitleClass}>Fee Changes</h3>
                    <p className={sectionBodyClass}>
                      We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 7. PROHIBITED ACTIVITIES */}
                  <section id="prohibited-activities" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>7. Prohibited Activities</h2>
                    <p className={sectionBodyClass}>
                      You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                    <p className={sectionBodyClass}>As a user of the Services, you agree not to:</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary/40">
                      <li className={sectionBodyClass}>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                      <li className={sectionBodyClass}>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                      <li className={sectionBodyClass}>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                      <li className={sectionBodyClass}>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                      <li className={sectionBodyClass}>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                      <li className={sectionBodyClass}>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                      <li className={sectionBodyClass}>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                      <li className={sectionBodyClass}>Engage in unauthorized framing of or linking to the Services.</li>
                      <li className={sectionBodyClass}>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party&apos;s uninterrupted use and enjoyment of the Services.</li>
                      <li className={sectionBodyClass}>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                      <li className={sectionBodyClass}>Delete the copyright or other proprietary rights notice from any Content.</li>
                      <li className={sectionBodyClass}>Attempt to impersonate another user or person or use the username of another user.</li>
                      <li className={sectionBodyClass}>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                      <li className={sectionBodyClass}>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                      <li className={sectionBodyClass}>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                      <li className={sectionBodyClass}>Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                      <li className={sectionBodyClass}>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                      <li className={sectionBodyClass}>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                      <li className={sectionBodyClass}>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                      <li className={sectionBodyClass}>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                      <li className={sectionBodyClass}>Use the Services to advertise or offer to sell goods and services.</li>
                      <li className={sectionBodyClass}>Sell or otherwise transfer your profile.</li>
                    </ul>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 8. USER GENERATED CONTRIBUTIONS */}
                  <section id="user-contributions" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>8. User Generated Contributions</h2>
                    <p className={sectionBodyClass}>
                      The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary/40">
                      <li className={sectionBodyClass}>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights of any third party.</li>
                      <li className={sectionBodyClass}>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                      <li className={sectionBodyClass}>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person.</li>
                      <li className={sectionBodyClass}>Your Contributions are not false, inaccurate, or misleading.</li>
                      <li className={sectionBodyClass}>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                      <li className={sectionBodyClass}>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
                      <li className={sectionBodyClass}>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                      <li className={sectionBodyClass}>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                      <li className={sectionBodyClass}>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                      <li className={sectionBodyClass}>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                    </ul>
                    <p className={sectionBodyClass}>
                      Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 9. CONTRIBUTION LICENSE */}
                  <section id="contribution-license" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>9. Contribution License</h2>
                    <p className={sectionBodyClass}>
                      By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
                    </p>
                    <p className={sectionBodyClass}>
                      We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
                    </p>
                    <p className={sectionBodyClass}>
                      We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 10. SOCIAL MEDIA */}
                  <section id="social-media" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>10. Social Media</h2>
                    <p className={sectionBodyClass}>
                      As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a &quot;Third-Party Account&quot;) by either: (1) providing your Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.
                    </p>
                    <p className={sectionBodyClass}>
                      By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account so that it is available on and through the Services via your account, and (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account.
                    </p>
                    <p className={sectionBodyClass}>
                      PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 11. SERVICES MANAGEMENT */}
                  <section id="services-management" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>11. Services Management</h2>
                    <p className={sectionBodyClass}>
                      We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 12. PRIVACY POLICY */}
                  <section id="privacy-policy" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>12. Privacy Policy</h2>
                    <p className={sectionBodyClass}>
                      We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Canada and United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Canada and United States, then through your continued use of the Services, you are transferring your data to Canada and United States, and you expressly consent to have your data transferred to and processed in Canada and United States.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 13. COPYRIGHT INFRINGEMENTS */}
                  <section id="copyright-infringements" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>13. Copyright Infringements</h2>
                    <p className={sectionBodyClass}>
                      We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a &quot;Notification&quot;). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 14. TERM AND TERMINATION */}
                  <section id="term-termination" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>14. Term and Termination</h2>
                    <p className={sectionBodyClass}>
                      These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
                    </p>
                    <p className={sectionBodyClass}>
                      If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 15. MODIFICATIONS AND INTERRUPTIONS */}
                  <section id="modifications-interruptions" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>15. Modifications and Interruptions</h2>
                    <p className={sectionBodyClass}>
                      We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                    </p>
                    <p className={sectionBodyClass}>
                      We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 16. GOVERNING LAW */}
                  <section id="governing-law" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>16. Governing Law</h2>
                    <p className={sectionBodyClass}>
                      These Legal Terms shall be governed by and defined following the laws of Canada. Asesley Inc and yourself irrevocably consent that the courts of Canada shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 17. DISPUTE RESOLUTION */}
                  <section id="dispute-resolution" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>17. Dispute Resolution</h2>

                    <h3 className={subTitleClass}>Informal Negotiations</h3>
                    <p className={sectionBodyClass}>
                      To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a &quot;Dispute&quot; and collectively, the &quot;Disputes&quot;) brought by either you or us (individually, a &quot;Party&quot; and collectively, the &quot;Parties&quot;), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
                    </p>

                    <h3 className={subTitleClass}>Binding Arbitration</h3>
                    <p className={sectionBodyClass}>
                      Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC. The number of arbitrators shall be three (3). The seat, or legal place, or arbitration shall be Toronto, Canada. The language of the proceedings shall be English. The governing law of these Legal Terms shall be substantive law of Canada.
                    </p>

                    <h3 className={subTitleClass}>Restrictions</h3>
                    <p className={sectionBodyClass}>
                      The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
                    </p>

                    <h3 className={subTitleClass}>Exceptions to Informal Negotiations and Arbitration</h3>
                    <p className={sectionBodyClass}>
                      The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 18. CORRECTIONS */}
                  <section id="corrections" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>18. Corrections</h2>
                    <p className={sectionBodyClass}>
                      There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 19. DISCLAIMER */}
                  <section id="disclaimer" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>19. Disclaimer</h2>
                    <p className={cn(sectionBodyClass, "uppercase")}>
                      THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 20. LIMITATIONS OF LIABILITY */}
                  <section id="limitations-liability" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>20. Limitations of Liability</h2>
                    <p className={cn(sectionBodyClass, "uppercase")}>
                      IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 21. INDEMNIFICATION */}
                  <section id="indemnification" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>21. Indemnification</h2>
                    <p className={sectionBodyClass}>
                      You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 22. USER DATA */}
                  <section id="user-data" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>22. User Data</h2>
                    <p className={sectionBodyClass}>
                      We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 23. ELECTRONIC COMMUNICATIONS */}
                  <section id="electronic-communications" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>23. Electronic Communications, Transactions, and Signatures</h2>
                    <p className={sectionBodyClass}>
                      Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 24. CALIFORNIA USERS */}
                  <section id="california-users" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>24. California Users and Residents</h2>
                    <p className={sectionBodyClass}>
                      If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 25. MISCELLANEOUS */}
                  <section id="miscellaneous" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>25. Miscellaneous</h2>
                    <p className={sectionBodyClass}>
                      These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 26. CONTACT US */}
                  <section id="contact-us" className="scroll-mt-24 space-y-3">
                    <h2 className={sectionTitleClass}>26. Contact Us</h2>
                    <p className={sectionBodyClass}>
                      In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                    </p>
                    <p className={cn(sectionBodyClass, "font-medium text-foreground")}>
                      Asesley Inc
                      <br />
                      support@asesley.com
                    </p>
                  </section>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
