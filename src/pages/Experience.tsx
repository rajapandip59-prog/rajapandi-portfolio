import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const ExperiencePage = () => {
  const { experiences } = usePortfolioData();

  const sortedExperiences = [...experiences].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />

        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Work Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My professional journey, internships, and hands-on industry experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {sortedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass p-8 rounded-2xl hover:glow-primary transition-all duration-300 relative border border-slate-800/80"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <p className="text-base text-primary font-semibold">@ {exp.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {exp.startDate} – {exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        {exp.location}
                      </span>
                    )}
                    {exp.isCurrent && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Present
                      </span>
                    )}
                  </div>
                </div>

                {exp.description && exp.description.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ExperiencePage;
