import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ExternalLink, Trophy, Code2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodingProfiles = () => {
  const profiles = [
    {
      name: "GitHub",
      username: "@rajapandip59-prog",
      url: "https://github.com/rajapandip59-prog",
      stats: { label: "Repositories", value: "1+" },
      color: "from-purple-500 to-pink-500",
      icon: "🐙",
    },
    {
      name: "LeetCode",
      username: "@coder",
      url: "https://leetcode.com/coder",
      stats: { label: "Problems Solved", value: "500+" },
      color: "from-orange-500 to-yellow-500",
      icon: "💻",
    },
    {
      name: "CodeForces",
      username: "@competitive",
      url: "https://codeforces.com/profile/competitive",
      stats: { label: "Rating", value: "1800+" },
      color: "from-blue-500 to-cyan-500",
      icon: "⚡",
    },
    {
      name: "HackerRank",
      username: "@hacker",
      url: "https://www.hackerrank.com/hacker",
      stats: { label: "Stars", value: "5 ⭐" },
      color: "from-green-500 to-emerald-500",
      icon: "🏆",
    },
    {
      name: "Stack Overflow",
      username: "@expert",
      url: "https://stackoverflow.com/users/12345678/expert",
      stats: { label: "Reputation", value: "15k+" },
      color: "from-orange-600 to-orange-400",
      icon: "📚",
    },
    {
      name: "Codepen",
      username: "@creative",
      url: "https://codepen.io/creative",
      stats: { label: "Projects", value: "80+" },
      color: "from-pink-500 to-rose-500",
      icon: "🎨",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden pt-24 pb-16">
        <ParticleBackground />
        
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Coding Profiles
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow my journey across various coding platforms and communities
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover:glow-primary transition-all duration-300 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{profile.icon}</div>
                  
                  <h3 className="text-2xl font-bold mb-2 gradient-text">
                    {profile.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {profile.username}
                  </p>

                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary/80 hover:text-primary underline underline-offset-2 mb-4 inline-block"
                  >
                    {profile.url}
                  </a>

                  <div className="mb-6 p-4 rounded-xl bg-background/50">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      {profile.stats.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {profile.stats.label}
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn border-primary/50 hover:bg-primary/10"
                  >
                    <a href={profile.url} target="_blank" rel="noreferrer">
                      Visit Profile
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center glow-primary">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 gradient-text">
                    Competitive Programming Achievements
                  </h3>
                  <p className="text-muted-foreground">
                    Ranked in top 5% globally across multiple platforms. Active contributor
                    to open-source projects with over 1000+ GitHub stars earned.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CodingProfiles;
