import ProgrammingLanguages from './ProgrammingLanguages';
import Technologies from './Technologies';
import SlideRight from './ui/SlideRight';

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 relative bg-white/2 backdrop-blur-sm">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-white text-center">Skills</h2>
        <div className="flex flex-col gap-16">
          <ProgrammingLanguages />
          <SlideRight />
          <Technologies />
        </div>
      </div>
    </section>
  );
};

export default Skills;
