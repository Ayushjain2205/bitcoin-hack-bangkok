"use client";

import { useState, type FormEvent } from "react";
import { useSendGatewayTransaction } from "@gobob/sats-wagmi";
import { type Hex, parseUnits } from "viem";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";

export default function Gateway() {
  const [isHovered, setIsHovered] = useState(false);
  const {
    data: hash,
    error,
    isPending,
    sendGatewayTransaction,
  } = useSendGatewayTransaction({ toChain: "bob-sepolia" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const evmAddress = formData.get("address") as Hex;
    const value = formData.get("value") as string;

    sendGatewayTransaction({
      toToken: "tBTC",
      evmAddress,
      value: parseUnits(value, 8),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-purple-300 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500"
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
              BOB Gateway
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Input
                required
                name="address"
                placeholder="EVM Address"
                className="bg-white/50 border-purple-300 text-purple-800 placeholder-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Input
                required
                name="value"
                placeholder="Amount (BTC)"
                step="0.00000001"
                type="number"
                className="bg-white/50 border-purple-300 text-purple-800 placeholder-purple-400"
              />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white font-bold relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                animate={{
                  opacity: isHovered ? [0, 0.5, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                {isPending ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send
                  </>
                )}
              </span>
            </Button>
          </form>
          {hash && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg"
            >
              Transaction Hash: {hash}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg"
            >
              Error: {error.message}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
