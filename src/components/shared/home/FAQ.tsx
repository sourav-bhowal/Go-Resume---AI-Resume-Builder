import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI writing assistant work?",
    answer:
      "Our AI writing assistant analyzes your input and provides smart suggestions based on industry standards and successful resume patterns. It helps you highlight your achievements and skills in the most effective way.",
  },
  {
    question: "Are the templates ATS-friendly?",
    answer:
      "Yes, all our templates are designed to be ATS-friendly. They use standard fonts, proper formatting, and clear sections that can be easily parsed by Applicant Tracking Systems.",
  },
  {
    question: "Can I download my resume in different formats?",
    answer:
      "Yes, you can download your resume in PDF, DOCX, and TXT formats. Premium users also get access to additional export options and custom formatting.",
  },
  {
    question: "How many resumes can I create?",
    answer:
      "Free users can create one resume. Premium users can create unlimited resumes and save multiple versions for different job applications.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-neutral-100 py-20 transition-colors duration-300 dark:bg-gray-900/20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="animate__animated animate__fadeInUp mb-4 text-4xl font-bold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-1s text-xl text-neutral-600 dark:text-neutral-400">
            Everything you need to know about our AI Resume Builder
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="animate__animated animate__fadeInUp animate__delay-2s w-full"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium text-neutral-900 transition-colors hover:text-purple-600 dark:text-white dark:hover:text-purple-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700 dark:text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
