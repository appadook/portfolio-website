
// components/ProfileSection.tsx

export const ProfileSection = () => {
  return (
    <div className="w-1/2 flex items-center justify-center px-8 z-10">
      <div className="flex flex-col items-center text-center text-white">
        <div className="w-48 h-48 rounded-full bg-gray-300 mb-8">
          <img src="/kurtik-appadoo.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl mb-4">
            Kurtik Appadoo
          </h1>
          <p className="text-xl text-white">
            Computer Science and Economics Double Major student at Union College with a passion for software development. 
          </p>
        </div>
      </div>
    </div>
  );
};