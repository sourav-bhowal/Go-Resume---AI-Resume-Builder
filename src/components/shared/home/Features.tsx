
import {
  Lightbulb,
  FileText,
  Eye,
  Download,
  Puzzle,
  Clock,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Lightbulb />,
      title: "AI Writing Assistant",
      description:
        "Get smart suggestions and auto-complete features to craft compelling bullet points and descriptions.",
    },
    {
      icon: <FileText />,
      title: "ATS-Friendly Templates",
      description:
        "Ensure your resume passes Applicant Tracking Systems with our optimized templates.",
    },
    {
      icon: <Eye />,
      title: "Real-time Preview",
      description:
        "See changes instantly as you type with our dynamic preview feature.",
    },
    {
      icon: <Download />,
      title: "One-Click Download",
      description:
        "Export your resume in multiple formats including PDF, Word, and TXT.",
    },
    {
      icon: <Puzzle />,
      title: "Smart Formatting",
      description:
        "Automatic formatting and layout adjustments to keep your resume professional.",
    },
    {
      icon: <Clock />,
      title: "Version History",
      description:
        "Keep track of all your resume versions and easily switch between them.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-white py-20 transition-colors duration-300 dark:bg-gray-900/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="animate__animated animate__fadeInUp mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Powerful Features for Your Perfect Resume
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-1s text-xl text-gray-600 dark:text-gray-300">
            Create professional resumes in minutes with our AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`animate__animated animate__fadeInUp ${
                index % 3 === 1
                  ? "animate__delay-1s"
                  : index % 3 === 2
                    ? "animate__delay-2s"
                    : ""
              } rounded-xl bg-gray-50 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-neutral-900`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <div className="flex h-8 w-8 items-center justify-center text-purple-600 dark:text-purple-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
