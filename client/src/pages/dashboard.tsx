import { useEffect, useState } from "react";
import { mockApi, FileNode } from "@/lib/mock-api";
import { FileText, Folder, Clock, Cpu, Activity, HardDrive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [recentFiles, setRecentFiles] = useState<FileNode[]>([]);

  useEffect(() => {
    mockApi.getFiles().then((files) => {
      // Flatten and take first few files for demo
      const flatten = (nodes: FileNode[]): FileNode[] => {
        return nodes.reduce((acc: FileNode[], node) => {
          if (node.type === "file") acc.push(node);
          if (node.children) acc.push(...flatten(node.children));
          return acc;
        }, []);
      };
      setRecentFiles(flatten(files).slice(0, 4));
    });
  }, []);

  const stats = [
    { label: "CPU Usage", value: "12%", icon: Cpu, color: "text-blue-400" },
    { label: "Memory", value: "4.2 GB", icon: HardDrive, color: "text-purple-400" },
    { label: "LLM VRAM", value: "6.1 GB", icon: Activity, color: "text-primary" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold"
        >
          Welcome back, <span className="text-primary neon-text">Operator</span>
        </motion.h1>
        <p className="text-muted-foreground">System systems nominal. Voice assistant ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-mono font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentFiles.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="p-4 rounded-lg bg-card border border-white/5 hover:border-primary/50 transition-colors cursor-pointer flex items-center gap-4 group"
            >
              <div className="p-3 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium group-hover:text-primary transition-colors">{file.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{file.path}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
