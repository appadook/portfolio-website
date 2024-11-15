// components/ContactForm.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Resume from "./Resume";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormData({ name: "", email: "", message: "" });
      setSuccess("Thank you! Your message has been sent.");
    } catch (error) {
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-white/2 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-white">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-white">
              I&apos;m always open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <Resume />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full text-white"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full text-white"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full text-white"
            />
            <Button type="submit" disabled={isSubmitting} className="w-full text-white">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
