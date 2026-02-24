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
  { id: "information-collect", title: "What Information Do We Collect?" },
  { id: "process-information", title: "How Do We Process Your Information?" },
  { id: "share-information", title: "When and With Whom Do We Share Your Information?" },
  { id: "cookies-tracking", title: "Cookies and Tracking Technologies" },
  { id: "social-logins", title: "How Do We Handle Your Social Logins?" },
  { id: "international-transfers", title: "International Transfers" },
  { id: "retention", title: "How Long Do We Keep Your Information?" },
  { id: "minors", title: "Do We Collect Information From Minors?" },
  { id: "privacy-rights", title: "What Are Your Privacy Rights?" },
  { id: "do-not-track", title: "Controls for Do-Not-Track Features" },
  { id: "updates", title: "Do We Make Updates to This Notice?" },
  { id: "contact", title: "How Can You Contact Us?" },
  { id: "review-data", title: "How Can You Review, Update, or Delete Your Data?" },
]

const bodyClass = "text-[13.5px] leading-[1.9] text-muted-foreground"
const titleClass = "text-[17px] font-semibold tracking-tight text-foreground"
const subTitleClass = "text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground/60 mt-8 mb-3"

export default function PrivacyPolicyPage() {
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
          <BrandLogo variant="full" href="/create-account" />
          <nav className="ml-8 hidden items-center gap-7 md:flex">
            <Link href="#" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Product</Link>
            <Link href="/pricing" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Resources</Link>
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
                      Privacy Policy
                    </h1>
                    <p className="mt-1.5 text-[12px] text-muted-foreground/60">
                      Last updated February 16, 2026 &middot; {tocSections.length} sections
                    </p>
                  </div>

                  {/* Intro */}
                  <div className="border-l-2 border-primary/20 pl-5 space-y-3">
                    <p className={bodyClass}>
                      This Privacy Notice for Asesley Inc (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and why we might access, collect, store, use, and/or share (&quot;process&quot;) your personal information when you use our services (&quot;Services&quot;).
                    </p>
                    <p className={bodyClass}>
                      Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
                    </p>
                  </div>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* Summary of key points */}
                  <div className="rounded border border-border/40 bg-muted/30 p-6 space-y-3">
                    <h2 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-foreground">Summary of Key Points</h2>
                    <p className={bodyClass}>
                      This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using the table of contents to find the section you are looking for.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">Do we collect any information from third parties?</strong> We may collect information from public databases, marketing partners, social media platforms, and other outside sources.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                    </p>
                  </div>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 1. WHAT INFORMATION DO WE COLLECT? */}
                  <section id="information-collect" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>1. What Information Do We Collect?</h2>

                    <h3 className={subTitleClass}>Personal information you disclose to us</h3>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We collect personal information that you provide to us.
                    </p>
                    <p className={bodyClass}>
                      We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">Sensitive Information.</strong> We do not process sensitive information.
                    </p>
                    <p className={bodyClass}>
                      All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                    </p>

                    <h3 className={subTitleClass}>Information automatically collected</h3>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                    </p>
                    <p className={bodyClass}>
                      We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                    </p>
                    <p className={bodyClass}>
                      Like many businesses, we also collect information through cookies and similar technologies.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 2. HOW DO WE PROCESS YOUR INFORMATION? */}
                  <section id="process-information" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>2. How Do We Process Your Information?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                    </p>
                    <p className={bodyClass}>
                      We process your personal information for a variety of reasons, depending on how you interact with our Services.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? */}
                  <section id="share-information" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>3. When and With Whom Do We Share Your Personal Information?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We may share information in specific situations described in this section and/or with the following third parties.
                    </p>
                    <p className={bodyClass}>
                      We may need to share your personal information in the following situations:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary/40">
                      <li className={bodyClass}>
                        <strong className="text-foreground">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                      </li>
                      <li className={bodyClass}>
                        <strong className="text-foreground">Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                      </li>
                      <li className={bodyClass}>
                        <strong className="text-foreground">Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.
                      </li>
                    </ul>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 4. COOKIES AND TRACKING */}
                  <section id="cookies-tracking" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>4. Do We Use Cookies and Other Tracking Technologies?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We may use cookies and other tracking technologies to collect and store your information.
                    </p>
                    <p className={bodyClass}>
                      We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                    </p>
                    <p className={bodyClass}>
                      We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                    </p>
                    <p className={bodyClass}>
                      Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 5. SOCIAL LOGINS */}
                  <section id="social-logins" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>5. How Do We Handle Your Social Logins?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
                    </p>
                    <p className={bodyClass}>
                      Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                    </p>
                    <p className={bodyClass}>
                      We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 6. INTERNATIONAL TRANSFERS */}
                  <section id="international-transfers" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>6. Is Your Information Transferred Internationally?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We may transfer, store, and process your information in countries other than your own.
                    </p>
                    <p className={bodyClass}>
                      Please be aware that your information may be transferred to, stored by, and processed by us in our facilities and in the facilities of the third parties with whom we may share your personal information, including facilities in Canada, the United States, and other countries.
                    </p>
                    <p className={bodyClass}>
                      If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 7. RETENTION */}
                  <section id="retention" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>7. How Long Do We Keep Your Information?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                    </p>
                    <p className={bodyClass}>
                      We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                    </p>
                    <p className={bodyClass}>
                      When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 8. MINORS */}
                  <section id="minors" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>8. Do We Collect Information From Minors?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: We do not knowingly collect data from or market to children under 18 years of age.
                    </p>
                    <p className={bodyClass}>
                      We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&apos;s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 9. PRIVACY RIGHTS */}
                  <section id="privacy-rights" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>9. What Are Your Privacy Rights?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
                    </p>
                    <p className={bodyClass}>
                      <strong className="text-foreground">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot; below.
                    </p>
                    <p className={bodyClass}>
                      However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                    </p>

                    <h3 className={subTitleClass}>Account Information</h3>
                    <p className={bodyClass}>
                      If you would at any time like to review or change the information in your account or terminate your account, you can contact us using the information provided. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 10. DO-NOT-TRACK */}
                  <section id="do-not-track" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>10. Controls for Do-Not-Track Features</h2>
                    <p className={bodyClass}>
                      Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 11. UPDATES */}
                  <section id="updates" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>11. Do We Make Updates to This Notice?</h2>
                    <p className={cn(bodyClass, "italic")}>
                      In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                    </p>
                    <p className={bodyClass}>
                      We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 12. CONTACT */}
                  <section id="contact" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>12. How Can You Contact Us About This Notice?</h2>
                    <p className={bodyClass}>
                      If you have questions or comments about this notice, you may contact us by post at:
                    </p>
                    <p className={cn(bodyClass, "font-medium text-foreground")}>
                      Asesley Inc
                      <br />
                      support@asesley.com
                    </p>
                  </section>

                  <div className="my-10 flex justify-center">
                    <div className="h-px w-16 bg-border/40" />
                  </div>

                  {/* 13. REVIEW DATA */}
                  <section id="review-data" className="scroll-mt-24 space-y-3">
                    <h2 className={titleClass}>13. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
                    <p className={bodyClass}>
                      Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please submit a data subject access request by contacting us using the information above.
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
