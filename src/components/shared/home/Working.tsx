import { Button } from "@/components/ui/button";
import { FileText, Edit, Download, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Choose Template",
      description:
        "Select from our collection of ATS-friendly professional templates designed for your industry.",
      icon: <FileText className="h-10 w-10" />,
      animation: "animate__fadeInLeft",
    },
    {
      number: 2,
      title: "Add Your Content",
      description:
        "Input your details and let our AI assistant enhance your content with professional suggestions.",
      icon: <Edit className="h-10 w-10" />,
      animation: "animate__fadeInUp",
    },
    {
      number: 3,
      title: "Download & Share",
      description:
        "Export your polished resume in multiple formats and start applying for your dream job.",
      icon: <Download className="h-10 w-10" />,
      animation: "animate__fadeInRight",
    },
  ];

  return (
    <section
      id="howItWorks"
      className="bg-gray-100 py-20 transition-colors duration-300 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="animate__animated animate__fadeInUp mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-1s text-xl text-gray-600 dark:text-gray-400">
            Create your professional resume in three simple steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1/2 z-0 hidden h-1 w-full -translate-y-1/2 transform bg-purple-600 lg:block"></div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`animate__animated ${step.animation} transform rounded-xl bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-4 text-center text-2xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                <div className="mt-6 flex justify-center text-purple-600 dark:text-purple-400">
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="animate__animated animate__fadeInUp bg-purple-600 text-white transition-all duration-300 hover:scale-105 hover:bg-purple-700"
          >
            Start Building Your Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
