import AvailableTutor from "@/Component/AvailableTutor";
import Banner from "@/Component/Banner";
import FeaturedTutors from "@/Component/FeaturedTutors";
import LearningExperience from "@/Component/LearingExprence";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <LearningExperience></LearningExperience>
     <AvailableTutor></AvailableTutor>
     <FeaturedTutors></FeaturedTutors>
    </div>
  );
}
