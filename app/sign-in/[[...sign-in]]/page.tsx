import { SignIn } from "@clerk/nextjs";
import { Cpu, Share2, FileText } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex w-1/2 bg-elevated border-r border-surface-border flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-12 pt-10">
          <div className="h-7 w-7 rounded-lg bg-brand flex-shrink-0" />
          <span className="text-copy-primary text-sm font-semibold tracking-tight">Ghost AI</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-12">
          <div className="max-w-md">
            <h1 className="text-copy-primary text-4xl font-bold leading-tight tracking-tight mb-4">
              Design systems at the<br />speed of thought.
            </h1>
            <p className="text-copy-muted text-base leading-relaxed mb-12">
              Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
            </p>

            <ul className="space-y-7">
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-subtle border border-surface-border flex items-center justify-center">
                    <Icon className="h-4 w-4 text-copy-secondary" />
                  </div>
                  <div>
                    <p className="text-copy-primary text-sm font-semibold mb-0.5">{title}</p>
                    <p className="text-copy-muted text-sm leading-relaxed">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-12 pb-10">
          <p className="text-copy-faint text-xs">© 2026 Ghost AI. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 bg-base flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </div>
  );
}
