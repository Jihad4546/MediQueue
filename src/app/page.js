import AvailableTutor from "@/Component/AvailableTutor";
import Banner from "@/Component/Banner";
import FeaturedTutors from "@/Component/FeaturedTutors";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <AvailableTutor></AvailableTutor>
     <FeaturedTutors></FeaturedTutors>
    </div>
  );
}
