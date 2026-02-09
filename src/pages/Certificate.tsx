import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Award, Calendar, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

const Certificate = () => {
  const certificates = [
    {
      title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations",
      issuer: "Oracle ",
      date: "2024-05-16",
      image: "https://drive.google.com/uc?export=view&id=1digs3-bAPHucQpwthJ-NFTaZnO5NKlPq",
      credentialUrl: "https://drive.google.com/file/d/1digs3-bAPHucQpwthJ-NFTaZnO5NKlPq/view?usp=sharing",
      gradient: "from-primary to-accent",
    },
    {
      title: "AWS Blockchain Node Runner For BNB Chain",
      issuer: "Binance & AWS",
      date: "2025-09-13",
      image: "https://drive.google.com/uc?export=view&id=1digs3-bAPHucQpwthJ-NFTaZnO5NKlPq",
      credentialUrl: "https://drive.google.com/file/d/1YJGsua17qPoZPbWtZjTlXuZB8wD--TA5/view?usp=sharing",
      gradient: "from-secondary to-primary",
    },
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-09-10",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000",
      credentialUrl: "#",
      gradient: "from-accent to-secondary",
    },
    {
      title: "Effective sales and marketing strategies for Entrepreneurs/ Startups",
      issuer: "Vel Tech",
      date: "2024-11-22",
      image: "https://drive.google.com/file/d/1dNtJnfqK9QngneXI820_cLJVvB1-R73y/view?usp=sharing",
      credentialUrl: "https://drive.google.com/file/d/1dNtJnfqK9QngneXI820_cLJVvB1-R73y/view?usp=sharing",
      gradient: "from-primary to-secondary",
    },
    {
      title: "Continuous Integration and Delivery - DevOps",
      issuer: "Infosys",
      date: "2025-10-08",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
      credentialUrl: "https://drive.google.com/file/d/1SItnyxpBPANwQu36uMrjOGaSP78GFRPG/view?usp=sharing",
      gradient: "from-secondary to-accent",
    },
    {
      title: "ChtaGPT & AI Tools Workshop",
      issuer: "ChatGPT",
      date: "2024-03-30",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      credentialUrl: "https://drive.google.com/file/d/1d7VKALv8S1-hDGxk7Asmp_3CEeRmQYnx/view?usp=sharing",
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Certifications
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and achievements in my career journey
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <Dialog key={cert.title}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-300 group cursor-pointer h-full flex flex-col"
                  >
                    <div className={`h-48 bg-gradient-to-br ${cert.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3 gradient-text group-hover:scale-105 transition-transform">
                        {cert.title}
                      </h3>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(cert.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <Button asChild variant="outline" className="w-full group/btn">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Certificate
                            <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                  <div className="relative w-full aspect-video">
                    <DialogTitle className="sr-only">Certificate: {cert.title}</DialogTitle>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                      <p className="text-white/80">Issued by {cert.issuer} on {new Date(cert.date).toLocaleDateString()}</p>
                    </div>
                    <DialogClose className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
                      <X className="w-5 h-5" />
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Certificate;
