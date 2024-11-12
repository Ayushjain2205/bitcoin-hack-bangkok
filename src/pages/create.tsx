"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Upload, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const personalityTraits = [
    "Analytical",
    "Creative",
    "Strategic",
    "Empathetic",
    "Logical",
    "Innovative",
    "Adaptive",
    "Decisive",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIgc3Ryb2tlPSIjZmYwMGZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIgc3Ryb2tlPSIjMDBmZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-10" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto space-y-8 backdrop-blur-sm bg-white/70 p-8 rounded-lg border border-purple-300 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <motion.h1
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 relative"
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
              Groovy Agent Creator
            </motion.h1>
            <p className="text-purple-600 font-medium">
              Design your far-out AI companion, man!
            </p>
          </div>

          {/* Form Content */}
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Agent's Funky Name"
                  className="bg-white/50 border-purple-300 text-purple-800 h-12 pl-10"
                />
                <Brain className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />
              </div>

              <div className="relative">
                <Input
                  placeholder="Groovy Identifier (GID)"
                  className="bg-white/50 border-purple-300 text-purple-800 h-12 pl-10"
                />
                <Cpu className="absolute left-3 top-3.5 h-5 w-5 text-purple-400" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-purple-800">
                Funkiness Level
              </label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="[&>span]:bg-purple-400"
              />

              <label className="text-sm font-medium text-purple-800">
                Groovy Specialization
              </label>
              <Select>
                <SelectTrigger className="bg-white/50 border-purple-300 text-purple-800">
                  <SelectValue placeholder="Select primary function" />
                </SelectTrigger>
                <SelectContent className="bg-white border-purple-300">
                  <SelectItem value="disco">Disco Data Analysis</SelectItem>
                  <SelectItem value="funk">Funk Content Creation</SelectItem>
                  <SelectItem value="jazz">Jazz Research Assistant</SelectItem>
                  <SelectItem value="rock">Rock Process Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-purple-800">
                Personality Vibes
              </label>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((trait) => (
                  <Badge
                    key={trait}
                    variant={
                      selectedTraits.includes(trait) ? "default" : "outline"
                    }
                    className="cursor-pointer bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    onClick={() => {
                      setSelectedTraits(
                        selectedTraits.includes(trait)
                          ? selectedTraits.filter((t) => t !== trait)
                          : [...selectedTraits, trait]
                      );
                    }}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Lay down the groovy rules and ethics, baby..."
              className="bg-white/50 border-purple-300 text-purple-800 min-h-[120px]"
            />

            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center space-y-4 bg-white/30">
              <div className="flex justify-center">
                <Upload className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-800">Upload a funky image or</p>
                <p className="text-pink-600 font-bold">
                  generate with Psychedelic Imaging™
                </p>
              </div>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-800 hover:bg-purple-100"
              >
                Choose Groovy File
              </Button>
            </div>

            <Button className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white font-bold relative overflow-hidden group">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Activate Groovy Protocol
              </span>
            </Button>
          </div>

          <p className="text-sm text-purple-600/70 text-center">
            Once your agent starts groovin', there's no stopping the funk!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
