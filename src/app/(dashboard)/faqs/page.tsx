"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageWrapper from "@/components/custom/page-wrapper";

// Optional: add your own categories or additional styling

export default function FAQsPage() {
    return (
        <PageWrapper
            title="FAQs"
            subtitle="Frequently Asked Questions"
            showBackButton
            // backHref="/dashboard"
            backLabel="Back to Dashboard"
            showInitialLoadingOnly={false}        >
            <div className=" mx-auto space-y-6">

                <h2 className="text-2xl font-semibold">General Questions</h2>

                <Accordion type="single" collapsible className="w-full space-y-2">

                    {/* FAQ 1 */}
                    <AccordionItem value="q1" className="border  rounded-lg px-4">
                        <AccordionTrigger className="text-left">
                            What is Pragati360?
                        </AccordionTrigger>
                        <AccordionContent>
                            Pragati360 is an AI-powered platform that helps businesses manage Google Business Profiles,
                            automate reviews, publish posts, track performance, and boost local ranking.
                        </AccordionContent>
                    </AccordionItem>

                    {/* FAQ 2 */}
                    <AccordionItem value="q2" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            How does Google Review Automation work?
                        </AccordionTrigger>
                        <AccordionContent>
                            Once you integrate your Google account, Pragati360 automatically pulls customer reviews,
                            allows you to reply instantly, and generates smart AI-based responses for faster engagement.
                        </AccordionContent>
                    </AccordionItem>

                    {/* FAQ 3 */}
                    <AccordionItem value="q3" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            Do I need technical knowledge to use this platform?
                        </AccordionTrigger>
                        <AccordionContent>
                            Not at all! The system is built to be user-friendly. Connect your Google Business account
                            once, and the dashboard takes care of the rest.
                        </AccordionContent>
                    </AccordionItem>

                    {/* FAQ 4 */}
                    <AccordionItem value="q4" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            Is my Google account safe with Pragati360?
                        </AccordionTrigger>
                        <AccordionContent>
                            Absolutely. We use Google OAuth, which means we never store your password. Your data is
                            encrypted and fully secured following industry best practices.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

                <h2 className="text-2xl font-semibold pt-6">Billing & Subscription</h2>

                <Accordion type="single" collapsible className="w-full space-y-2">

                    {/* Billing 1 */}
                    <AccordionItem value="b1" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            What payment methods do you support?
                        </AccordionTrigger>
                        <AccordionContent>
                            We support UPI, Credit/Debit Cards, NetBanking, and all Razorpay-supported payment options.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Billing 2 */}
                    <AccordionItem value="b2" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            Can I cancel my subscription anytime?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, you can cancel anytime from the Subscription page. You will continue to have access
                            until the end of your billing cycle.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Billing 3 */}
                    <AccordionItem value="b3" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            Will I get a refund?
                        </AccordionTrigger>
                        <AccordionContent>
                            Refunds are issued only if there is a billing error. Otherwise, subscriptions remain active
                            for the purchased period.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

                <h2 className="text-2xl font-semibold pt-6">Google Integration</h2>

                <Accordion type="single" collapsible className="w-full space-y-2">

                    {/* Google 1 */}
                    <AccordionItem value="g1" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            How do I connect my Google Business Profile?
                        </AccordionTrigger>
                        <AccordionContent>
                            Go to the Google Business section → Click “Connect Google” → Sign in → Select your business.
                            That’s it!
                        </AccordionContent>
                    </AccordionItem>

                    {/* Google 2 */}
                    <AccordionItem value="g2" className="border  rounded-lg px-4">
                        <AccordionTrigger>
                            Why are some of my locations not visible?
                        </AccordionTrigger>
                        <AccordionContent>
                            You may have multiple Google accounts or business managers. Ensure you selected the correct
                            account during integration.
                        </AccordionContent>
                    </AccordionItem>


                </Accordion>
            </div>
        </PageWrapper>
    );
}
