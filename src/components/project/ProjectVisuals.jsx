import React from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Box,
  Brain,
  Calculator,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  ExternalLink,
  GitBranch,
  Github,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Minimize2,
  Monitor,
  RefreshCw,
  Settings2,
  Shield,
  TerminalSquare,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const projectIconMap = {
  eye: Eye,
  calculator: Calculator,
  image: ImageIcon,
  activity: Activity,
  bot: Bot,
  'message-square': MessageSquare,
};

const highlightIconMap = {
  zap: Zap,
  shield: Shield,
  users: Users,
  cpu: Cpu,
  brain: Brain,
  layers: Layers,
  terminal: TerminalSquare,
  database: Database,
  minimize: Minimize2,
  monitor: Monitor,
  settings: Settings2,
  'git-branch': GitBranch,
  'check-circle': CheckCircle2,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  box: Box,
  'refresh-cw': RefreshCw,
};

export function ProjectIcon({ name, className = 'h-12 w-12', strokeWidth = 1.8 }) {
  const Icon = projectIconMap[name] || Bot;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

export function HighlightIcon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  const Icon = highlightIconMap[name] || Zap;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

export const UiIcons = {
  Github,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
};
