import { useState, useEffect } from "react";

export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  content?: string;
  children?: FileNode[];
  updatedAt: string;
};

const MOCK_FILES: FileNode[] = [
  {
    id: "root",
    name: "root",
    type: "folder",
    path: "/",
    updatedAt: new Date().toISOString(),
    children: [
      {
        id: "1",
        name: "projects",
        type: "folder",
        path: "/projects",
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: "2",
            name: "vosw-core",
            type: "folder",
            path: "/projects/vosw-core",
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: "3",
                name: "app.py",
                type: "file",
                path: "/projects/vosw-core/app.py",
                updatedAt: new Date().toISOString(),
                content: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello VOSW'",
              },
              {
                id: "4",
                name: "README.md",
                type: "file",
                path: "/projects/vosw-core/README.md",
                updatedAt: new Date().toISOString(),
                content: "# VOSW Core\n\nVoice Operated Smart Workspace backend implementation.",
              },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "documents",
        type: "folder",
        path: "/documents",
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: "6",
            name: "notes.txt",
            type: "file",
            path: "/documents/notes.txt",
            updatedAt: new Date().toISOString(),
            content: "Meeting notes:\n- Discuss architecture\n- Review UI mocks",
          },
        ],
      },
    ],
  },
];

export const mockApi = {
  async getFiles(): Promise<FileNode[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_FILES;
  },

  async readFile(path: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Simple DFS to find file
    const findFile = (nodes: FileNode[]): string | null => {
      for (const node of nodes) {
        if (node.path === path && node.type === "file") return node.content || "";
        if (node.children) {
          const found = findFile(node.children);
          if (found !== null) return found;
        }
      }
      return null;
    };
    
    const content = findFile(MOCK_FILES);
    if (content === null) throw new Error("File not found");
    return content;
  },

  async sendCommand(command: string): Promise<{ type: string; message: string; action?: any }> {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate LLM processing
    
    const lowerCmd = command.toLowerCase();
    
    if (lowerCmd.includes("open")) {
      return {
        type: "action",
        message: `Opening ${command.split("open ")[1] || "file"}...`,
        action: { type: "navigate", to: "/files" }
      };
    }
    
    if (lowerCmd.includes("create")) {
      return {
        type: "success",
        message: "Created new file successfully.",
        action: { type: "refresh_files" }
      };
    }

    if (lowerCmd.includes("hello") || lowerCmd.includes("hi")) {
      return {
        type: "response",
        message: "Hello! I am VOSW, your voice-operated assistant. How can I help you today?",
      };
    }

    return {
      type: "response",
      message: `I processed your command: "${command}". In the real backend, this would execute safe OS operations or file manipulations.`,
    };
  }
};
