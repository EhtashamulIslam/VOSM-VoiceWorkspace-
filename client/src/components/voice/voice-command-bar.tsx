import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VoiceVisualizer } from "./voice-visualizer";
import { mockApi } from "@/lib/mock-api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export function VoiceCommandBar() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock speech recognition
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      const phrases = [
        "Open project VOSW",
        "Create a new file called dashboard.py",
        "Summarize the last meeting notes",
        "Run system diagnostics",
      ];
      let i = 0;
      const targetPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      
      interval = setInterval(() => {
        if (i < targetPhrase.length) {
          setTranscript((prev) => prev + targetPhrase[i]);
          i++;
        } else {
          setIsListening(false);
          handleCommand(targetPhrase);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await mockApi.sendCommand(cmd);
      toast({
        title: "Assistant",
        description: response.message,
        variant: "default",
        className: "border-primary/50 bg-background/95 backdrop-blur",
      });
      setTranscript("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process command",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript("");
      setIsListening(true);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-0 right-0 flex justify-center"
          >
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 backdrop-blur-md flex items-center gap-2 text-sm font-mono">
              <Sparkles className="w-4 h-4 animate-spin" />
              Processing command...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl flex items-center gap-2 ring-1 ring-white/5">
        <Button
          size="icon"
          variant={isListening ? "default" : "ghost"}
          className={`h-12 w-12 rounded-xl transition-all duration-300 ${
            isListening 
              ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-pulse" 
              : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
          }`}
          onClick={toggleListening}
        >
          {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        <div className="flex-1 h-12 bg-black/20 rounded-xl flex items-center px-4 relative overflow-hidden border border-white/5">
          {isListening ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-primary font-mono text-lg truncate">{transcript}</span>
              <VoiceVisualizer isActive={true} />
            </div>
          ) : (
            <Input
              ref={inputRef}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(transcript)}
              placeholder="Type a command or say 'Hey VOSW'..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-full px-0 text-lg font-medium placeholder:text-muted-foreground/50"
            />
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-12 w-12 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => handleCommand(transcript)}
          disabled={!transcript || isListening || isProcessing}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
