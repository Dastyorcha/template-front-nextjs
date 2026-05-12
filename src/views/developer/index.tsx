import DeveloperHero from "@/widgets/developer/hero";
import DeveloperBio from "@/widgets/developer/bio";
import DeveloperExperience from "@/widgets/developer/experience";
import DeveloperSkills from "@/widgets/developer/skills";
import DeveloperContact from "@/widgets/developer/contact";
import DeveloperFooter from "@/widgets/developer/footer";

export default function DeveloperPageView() {
  return (
    <main>
      <DeveloperHero />
      <DeveloperBio />
      <DeveloperExperience />
      <DeveloperSkills />
      <DeveloperContact />
      <DeveloperFooter />
    </main>
  );
}
