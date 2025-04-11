import React from "react";
import {
  Globe,
  Anchor,
  Hourglass,
  Database,
  HardDriveUpload,
  Camera,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Spotlight } from "../components/Spotlight";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Globe,
      title: "Modern Design",
      description: "We use the latest technology to meet people's demands.",
    },
    {
      icon: Anchor,
      title: "Creative Design",
      description:
        "We always listen to our customers and create the best designs.",
    },
    {
      icon: Hourglass,
      title: "24 x 7 User Support",
      description:
        "We are always happy to help our customers with any queries.",
    },
    {
      icon: Database,
      title: "Business Growth",
      description: "Success comes from continuous growth and improvement.",
    },
    {
      icon: HardDriveUpload,
      title: "Market Strategy",
      description: "We use innovative strategies to stay ahead in the market.",
    },
    {
      icon: Camera,
      title: "Affordable Cost",
      description: "We provide high-quality services at an affordable price.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center py-10">
        <div className="container mx-auto w-full px-6">
          <div className="mb-12 text-center">
            <h4 className="relative inline-block text-3xl font-bold text-sky-400">
              Why Choose <span className="text-gray-800">Us?</span>
              <span className="mx-auto mt-2 block h-1 w-16 bg-sky-500"></span>
            </h4>
            <p className="mx-auto mt-4 max-w-4xl text-white">
              When you choose us, you'll feel the benefit of 10 years'
              experience of Web Development. Because we know the digital world
              and we know that how to handle it. With working knowledge of
              online, SEO and social media.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border-2 border-sky-950 bg-transparent p-6 text-center shadow-lg transition hover:bg-sky-500 hover:text-white"
              >
                <Icon className="mb-4 text-4xl text-sky-900" size={48} />
                <h6 className="text-xl font-semibold text-sky-700">{title}</h6>
                <p className="text-white group-hover:text-white">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Spotlight />
    </div>
  );
};
