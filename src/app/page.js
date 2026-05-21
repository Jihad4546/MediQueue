import AvailableTutor from "@/Component/AvailableTutor";
import Banner from "@/Component/Banner";
import FeaturedTutors from "@/Component/FeaturedTutors";
import LearningFeatures from "@/Component/LearningFeatures";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <AvailableTutor></AvailableTutor>
     <LearningFeatures></LearningFeatures>
     <FeaturedTutors></FeaturedTutors>
    </div>
  );
}
