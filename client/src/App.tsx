import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { Sidebar } from "@/components/layout/sidebar";
import { VoiceCommandBar } from "@/components/voice/voice-command-bar";
import Dashboard from "@/pages/dashboard";
import FileManager from "@/pages/file-manager";
import Editor from "@/pages/editor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/files" component={FileManager} />
      <Route path="/editor" component={Editor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20">
        <Sidebar />
        
        <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-background/50">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Router />
          </div>
          
          {/* Floating Elements */}
          <VoiceCommandBar />
        </main>

        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
