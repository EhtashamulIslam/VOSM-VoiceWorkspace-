import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE_CODE = `from flask import Flask, jsonify
from vosw_core import VoiceAssistant

app = Flask(__name__)
assistant = VoiceAssistant(model="llama-3-8b-local")

@app.route("/api/command", methods=["POST"])
def handle_command():
    """
    Handles voice commands sent from the frontend.
    """
    audio_data = request.files["audio"]
    transcript = assistant.transcribe(audio_data)
    
    # Process intent using local LLM
    intent = assistant.parse_intent(transcript)
    
    return jsonify({
        "transcript": transcript,
        "action": intent.action,
        "response": intent.response
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)`;

export default function Editor() {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Editor Toolbar */}
      <div className="h-12 border-b border-white/10 bg-[#252526] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-muted-foreground">app.py</span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Python</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-green-400">
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative font-mono text-sm p-4 overflow-auto">
        {/* Line Numbers */}
        <div className="absolute left-0 top-4 bottom-0 w-12 flex flex-col items-end pr-4 text-muted-foreground/30 select-none">
          {SAMPLE_CODE.split("\n").map((_, i) => (
            <div key={i} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Code Area */}
        <textarea 
          className="w-full h-full bg-transparent resize-none border-0 focus:ring-0 p-0 pl-12 leading-6 text-[#d4d4d4] outline-none font-mono"
          defaultValue={SAMPLE_CODE}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
