import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
          Build Something
          <span className="text-primary"> Amazing</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Create beautiful, responsive web applications with our modern React template.
          Start building your next great idea today.
        </p>
        <div className="flex gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;