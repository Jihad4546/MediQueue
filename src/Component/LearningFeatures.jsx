import { Button, Chip } from "@heroui/react";
import { Video, BookOpen, Clock, Users } from "lucide-react";

const LearningFeatures = () => {
  const features = [
    {
      title: "লাইভ ওয়ান-টু-ওয়ান ক্লাস",
      desc: "সরাসরি টিউটরের সাথে ভিডিও কলে আপনার সমস্যার সমাধান করুন।",
      icon: <Video className="text-primary" />,
      color: "bg-blue-50"
    },
    {
      title: "ডিজিটাল টোকেন বুকিং",
      desc: "ম্যানুয়াল ঝামেলা ছাড়াই ইনস্ট্যান্ট বুকিং এবং শিডিউল কনফার্মেশন।",
      icon: <BookOpen className="text-secondary" />,
      color: "bg-purple-50"
    },
    {
      title: "এক্সপার্ট মেন্টর সাপোর্ট",
      desc: "দেশের সেরা শিক্ষক ও ইন্ডাস্ট্রি বিশেষজ্ঞদের কাছ থেকে শেখার সুযোগ।",
      icon: <Users className="text-success" />,
      color: "bg-green-50"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">আমাদের লার্নিং ইকোসিস্টেম</h2>
          <p className="text-slate-500 max-w-xl mx-auto">MediQueue-এর মাধ্যমে আপনার লার্নিং জার্নিকে করুন সহজ, দ্রুত এবং কার্যকর।</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all">
              <div className={`p-4 rounded-2xl w-fit mb-6 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{f.desc}</p>
              <Button variant="flat" color="primary" className="font-semibold">
                বিস্তারিত জানুন
              </Button>
            </div>
          ))}
        </div>

        {/* Live Call to Action Banner */}
        <div className="mt-12 p-8 bg-slate-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">এখনই একটি লাইভ সেশন বুক করুন</h3>
            <p className="text-slate-400">১০০+ টিউটর থেকে আপনার পছন্দের শিক্ষক খুঁজে নিন মাত্র ১ ক্লিকে।</p>
          </div>
          <Button color="primary" size="lg" className="px-8 font-bold" startContent={<Clock size={18}/>}>
            সেশন বুকিং শুরু করুন
          </Button>
        </div>
      </div>
    </section>
  );
};
export default LearningFeatures;