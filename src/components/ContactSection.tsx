import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'kurtik.appadoo.2002@outlook.com',
      href: 'mailto:kurtik.appadoo.2002@outlook.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+1 (929) 373-9126',
      href: 'tel:+19293739126',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'United States',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com/appadook',
      color: 'hover:text-white',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kurtik-appadoo-863019244/',
      color: 'hover:text-blue-500',
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-sky-500',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      href: 'mailto:kurtik.appadoo.2002@outlook.com',
      color: 'hover:text-primary',
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss opportunities, collaborations, or just have a chat about technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-2xl">Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-input/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-input/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project or just say hello..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-input/50 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white glow-effect transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl">Connect with me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center p-4 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:scale-105 group ${link.color}`}
                    >
                      <div className="mr-3 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Available for new opportunities
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Currently open to full-time positions, consulting projects, and interesting collaborations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;