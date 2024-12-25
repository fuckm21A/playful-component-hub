import { Laptop, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Responsive Design",
    description: "Looks great on any device, from mobile to desktop.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Performance",
    description: "Optimized for speed and efficiency out of the box.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure by Default",
    description: "Built with security best practices in mind.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;