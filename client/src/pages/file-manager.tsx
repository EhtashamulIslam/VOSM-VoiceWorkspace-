import { useState, useEffect } from "react";
import { mockApi, FileNode } from "@/lib/mock-api";
import { Folder, FileText, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function FileManager() {
  const [files, setFiles] = useState<FileNode[]>([]);

  useEffect(() => {
    mockApi.getFiles().then(setFiles);
  }, []);

  const FileTree = ({ nodes, level = 0 }: { nodes: FileNode[], level?: number }) => {
    return (
      <div className="space-y-1">
        {nodes.map((node) => (
          <div key={node.id}>
            <div 
              className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
              style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
            >
              {node.type === "folder" ? (
                <Folder className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
              ) : (
                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              )}
              <span className={`text-sm font-mono ${node.type === "folder" ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {node.name}
              </span>
            </div>
            {node.children && <FileTree nodes={node.children} level={level + 1} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold">Filesystem</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search files..." className="pl-9 bg-card/50 border-white/10" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 rounded-xl border border-white/10 bg-card/30 backdrop-blur overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 bg-card/50 flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <span>root</span>
          <ChevronRight className="w-4 h-4" />
          <span>projects</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">vosw-core</span>
        </div>
        <div className="p-4 overflow-auto h-full">
          <FileTree nodes={files} />
        </div>
      </motion.div>
    </div>
  );
}
