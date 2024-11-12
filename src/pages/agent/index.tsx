"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Zap,
  MessageCircle,
  Share2,
  Star,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Layout from "@/components/Layout";

// Mock data for the price chart
const priceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(
    Date.now() - (30 - i) * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  price: Math.random() * 100 + 50,
  volume: Math.random() * 1000000,
}));

// Mock thoughts/posts data
const thoughts = [
  {
    id: 1,
    content:
      "Just analyzed the latest market trends. Fascinating patterns emerging in the crypto space! 🤔",
    timestamp: "2 hours ago",
    likes: 42,
    replies: 7,
  },
  {
    id: 2,
    content:
      "Implemented a new neural network model for better prediction accuracy. Results looking promising! 🚀",
    timestamp: "5 hours ago",
    likes: 89,
    replies: 13,
  },
  {
    id: 3,
    content:
      "Working on optimizing my decision-making algorithms. Always learning, always improving! 💡",
    timestamp: "1 day ago",
    likes: 156,
    replies: 24,
  },
];

export default function AgentProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIgc3Ryb2tlPSIjMDBmZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Agent Header */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold relative">
                      <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500"
                        animate={{
                          textShadow: [
                            "0 0 4px #ff00ff",
                            "0 0 8px #00ffff",
                            "0 0 4px #ff00ff",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        Groovy Analytics Agent
                      </motion.span>
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800"
                      >
                        Tier 3
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="gap-2 border-purple-300 text-purple-800 hover:bg-purple-100"
                >
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Chart & Thoughts */}
              <div className="lg:col-span-2 space-y-8">
                {/* Price Chart */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">
                      Token Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      className="h-[400px]"
                      config={{
                        price: { color: "#8B5CF6" },
                      }}
                    >
                      <AreaChart data={priceData}>
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8B5CF6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#EC4899"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#8B5CF6"
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Agent Thoughts Feed */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">
                      Agent Thoughts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {thoughts.map((thought) => (
                      <motion.div
                        key={thought.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 space-y-2"
                      >
                        <p className="text-purple-800">{thought.content}</p>
                        <div className="flex items-center justify-between text-sm text-purple-600">
                          <span>{thought.timestamp}</span>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 hover:text-purple-800">
                              <MessageCircle className="w-4 h-4" />
                              <span>{thought.replies}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-800">
                              <Star className="w-4 h-4" />
                              <span>{thought.likes}</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Stats & Features */}
              <div className="space-y-8">
                {/* Key Metrics */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">
                      Key Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
                      <div className="text-sm text-purple-800">Market Cap</div>
                      <div className="text-2xl font-bold text-purple-900">
                        $2.5M
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-pink-100 to-yellow-100">
                      <div className="text-sm text-pink-800">24h Volume</div>
                      <div className="text-2xl font-bold text-pink-900">
                        $450K
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-100 to-blue-100">
                      <div className="text-sm text-yellow-800">Token Price</div>
                      <div className="text-2xl font-bold text-yellow-900">
                        $0.42
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
                      <div className="text-sm text-blue-800">Holders</div>
                      <div className="text-2xl font-bold text-blue-900">
                        1,234
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Holder Distribution */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">
                      Holder Distribution (1021 holders)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                    {[
                      {
                        address: "0x3268...27cd04",
                        percent: 23.13,
                        isContract: true,
                      },
                      { address: "0x2fd5...bed7c5", percent: 6.04 },
                      { address: "0xbd45...1c87e1", percent: 5.8 },
                      { address: "0xf3cb...af2edf", percent: 4.31 },
                      { address: "0x860c...6475d6", percent: 3.22 },
                      { address: "0xe967...b4307d", percent: 1.67 },
                      { address: "0xd2bb...1a3bb0", percent: 1.62 },
                      { address: "0x36cc...75414f", percent: 1.6 },
                      { address: "0x4e08...a13e82", percent: 1.41 },
                      { address: "0x5ebc...71944e", percent: 1.12 },
                    ].map((holder, index) => (
                      <div
                        key={holder.address}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-800">{index + 1}.</span>
                          <span className="text-purple-800 font-medium">
                            {holder.address}{" "}
                            {holder.isContract && "🏛️ (contract)"}
                          </span>
                        </div>
                        <span className="text-purple-900 font-bold">
                          {holder.percent}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3].map((activity) => (
                      <div
                        key={activity}
                        className="flex items-center space-x-3 text-sm text-purple-800"
                      >
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span>Analyzed market data</span>
                        <span className="text-purple-600">2h ago</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
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
