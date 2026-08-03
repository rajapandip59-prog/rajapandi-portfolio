import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const Contact = () => {
  const { contactInfo, addMessage } = usePortfolioData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: formData.message,
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactList = [
    { icon: Mail, label: "Email", value: contactInfo.email },
    { icon: Phone, label: "Phone", value: contactInfo.phone },
    { icon: MapPin, label: "Location", value: contactInfo.address },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's work together to create something amazing
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="bg-secondary/20 border-slate-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-secondary/20 border-slate-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="bg-secondary/20 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    className="bg-secondary/20 border-slate-700 text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Details & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-between space-y-8"
            >
              <div className="glass p-8 rounded-2xl space-y-6">
                <h2 className="text-3xl font-bold mb-6 gradient-text">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {contactList.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="text-lg font-semibold text-white mt-1">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {contactInfo.googleMapsEmbed && (
                <div className="glass p-4 rounded-2xl overflow-hidden h-64 border border-slate-800">
                  <iframe
                    src={contactInfo.googleMapsEmbed}
                    className="w-full h-full rounded-xl border-0"
                    loading="lazy"
                    title="Location Map"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
