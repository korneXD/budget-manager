import React from 'react'
import { Globe, Anchor, Hourglass, Database, HardDriveUpload, Camera } from "lucide-react";
import Navbar from '../components/Navbar';
import { Spotlight } from '../components/Spotlight';

export const WhyChooseUs = ()=> {
  const features = [
    { icon: Globe, title: "Modern Design", description: "We use the latest technology to meet people's demands." },
    { icon: Anchor, title: "Creative Design", description: "We always listen to our customers and create the best designs." },
    { icon: Hourglass, title: "24 x 7 User Support", description: "We are always happy to help our customers with any queries." },
    { icon: Database, title: "Business Growth", description: "Success comes from continuous growth and improvement." },
    { icon: HardDriveUpload, title: "Market Strategy", description: "We use innovative strategies to stay ahead in the market." },
    { icon: Camera, title: "Affordable Cost", description: "We provide high-quality services at an affordable price." },
  ];

  return (
    <div>
    <Navbar />
    <div className="py-10 min-h-screen flex items-center">
      <div className="container mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <h4 className="text-3xl font-bold text-sky-400 relative inline-block">
            Why Choose <span className="text-gray-800">Us?</span>
            <span className="block w-16 h-1 bg-sky-500 mx-auto mt-2"></span>
          </h4>
          <p className="text-white mx-auto mt-4 max-w-4xl">
          When you choose us, you'll feel the benefit of 10 years' experience of Web Development. Because we know the digital world and we know that how to handle it. With working knowledge of online, SEO and social media.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="bg-transparent text-center p-6 rounded-2xl shadow-lg border-2 border-sky-950 hover:bg-sky-500 hover:text-white transition flex flex-col items-center"
            >
              <Icon className="text-sky-900 text-4xl mb-4" size={48} />
              <h6 className="text-xl text-sky-700 font-semibold">{title}</h6>
              <p className="text-white group-hover:text-white">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Spotlight />
    </div>
  );
}