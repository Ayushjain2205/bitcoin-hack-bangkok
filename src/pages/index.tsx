"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Star, Sparkles, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import Link from "next/link";

interface Agent {
  id: number;
  name: string;
  image: string;
  specialization: string;
  funkinessLevel: number;
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Disco Dan",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/Convo_Agent_89ef084f87.png",
    specialization: "Disco Data Analysis",
    funkinessLevel: 85,
  },
  {
    id: 2,
    name: "Funky Fiona",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_599f368aa5.jpeg",
    specialization: "Funk Content Creation",
    funkinessLevel: 92,
  },
  {
    id: 3,
    name: "Jazz Jack",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_34c4330acc.png",
    specialization: "Jazz Research Assistant",
    funkinessLevel: 78,
  },
  {
    id: 4,
    name: "Rock Rita",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_c89d85529b.png",
    specialization: "Rock Process Automation",
    funkinessLevel: 88,
  },
  {
    id: 5,
    name: "Techno Tim",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_4ebbeeec1f.jpeg",
    specialization: "Techno Task Management",
    funkinessLevel: 95,
  },
  {
    id: 6,
    name: "Soulful Sara",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_875049faab.png",
    specialization: "Soul Sentiment Analysis",
    funkinessLevel: 89,
  },
];

const topAgents = agents
  .sort((a, b) => b.funkinessLevel - a.funkinessLevel)
  .slice(0, 4);

export default function Home() {
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredAgent(Math.floor(Math.random() * agents.length) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const calculateScrollWidth = () => {
      const cardWidth = 256; // 16rem or 256px
      const gap = 24; // 1.5rem or 24px
      const totalWidth = topAgents.length * (cardWidth + gap);
      setScrollWidth(totalWidth);
    };

    calculateScrollWidth();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIgc3Ryb2tlPSIjMDBmZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Top Agents Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center justify-center">
              <Trophy className="w-8 h-8 mr-2 text-yellow-500" />
              Top Groovin' Agents
            </h2>
            <div
              className="relative overflow-hidden"
              style={{ height: "300px" }}
            >
              <motion.div
                className="flex space-x-6 absolute"
                animate={{
                  x: [-scrollWidth / 2, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                style={{ width: `${scrollWidth * 2}px` }}
              >
                {[...topAgents, ...topAgents, ...topAgents, ...topAgents].map(
                  (agent, index) => (
                    <Link href="/agent" key={`${agent.id}-${index}`}>
                      <Card className="w-64 flex-shrink-0 bg-white/80 backdrop-blur-sm border-purple-300 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <CardContent className="p-4">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
                          />
                          <h3 className="text-lg font-bold mb-2 text-purple-800">
                            {agent.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                              {agent.specialization}
                            </Badge>
                            <div className="flex items-center">
                              <Zap className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium text-purple-700">
                                {agent.funkinessLevel}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                )}
              </motion.div>
            </div>
          </div>

          {/* All Agents Grid */}
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {agents.map((agent) => (
              <Link href="/agent" key={agent.id}>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: hoveredAgent === agent.id ? [0, -5, 5, -5, 0] : 0,
                  }}
                  onHoverStart={() => setHoveredAgent(agent.id)}
                  onHoverEnd={() => setHoveredAgent(null)}
                >
                  <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-purple-300 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-48 h-48 object-cover rounded-lg mx-auto"
                        />
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500">
                          {agent.specialization}
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-purple-800">
                        {agent.name}
                      </h2>
                      <div className="flex items-center mb-4">
                        <Brain className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm text-purple-700">
                          {agent.specialization}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                          <span className="text-sm font-medium text-purple-700">
                            Funkiness Level
                          </span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-5 h-5 ${
                                index < Math.floor(agent.funkinessLevel / 20)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Floating particles */}
        {windowSize.width > 0 &&
          [...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              animate={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Sparkles
                className="text-purple-400 opacity-30"
                size={Math.random() * 20 + 10}
              />
            </motion.div>
          ))}
      </div>
    </Layout>
  );
}
