// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    c += Object.keys(bin).sort()[i - 1] + '\n';
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
clear: clear terminal.\n
`;
};

// export const chat = async (args: string[]): Promise<string> => {
//   if (!config.chat.active) {
//     return `Chat is not available yet.`;
//   } else {
//     return `Chat is not available yet.`;
//   }
// };

// Contact
export const email = async (args: string[]): Promise<string> => {
  return `Email: ${config.email}`;
};

export const gh = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`, '_blank');

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(
    `https://www.linkedin.com/in/${config.social.linkedin}/`,
    '_blank',
  );

  return 'Opening linkedin...';
};

export const experiences = async (args: string[]): Promise<string> => {
  return `experiences:
  - company: Ciroos
    location: Pleasanton, CA
    role: Member of Technical Staff
    dates: March 2026 - Present
  - company: Ciroos
    location: Pleasanton, CA
    role: Software Engineering Intern
    dates: July 2025 - March 2026
    highlights:
      - Designed an evaluation framework to verify an AI agent for SRE issue diagnosis and resolution.
      - Built multi-domain test applications and evaluation pipelines simulating realistic Kubernetes, GCP, and AWS enterprise workloads and faults.
      - Implemented a Kubernetes-native fault injection suite with 100+ deterministic scenarios and 90% fault coverage.
      - Created 50+ gcloud-based fault scenarios to reproduce realistic production issues in GCP deployments.
      - Recruited and managed engineering interns, assigning deliverables and providing technical guidance.
  - company: Berkeleytime
    location: Berkeley, CA
    role: Software Engineer
    dates: January 2025 - May 2026
    highlights:
      - UC Berkeley's most-used course catalog platform, serving 30,000+ users.
      - Lead observability work using OpenTelemetry collectors, Prometheus, Jaeger, and Grafana.
      - Instrumented platform services for end-to-end tracing and metrics aggregation across distributed systems.
      - Helped migrate the legacy JavaScript stack to TypeScript, rebuild the frontend in React, and integrate GraphQL through Apollo Client.
      - Developed a no-code internal dashboard that reduced site update time by 98%.
  - company: Cisco
    location: San Jose, CA
    role: Software Engineering Intern
    dates: May 2024 - August 2024
    highlights:
      - Built a documentation auto-generation tool with React, TypeScript, Node, and Next.js, increasing coverage by 35% and reducing creation time by 91%.
      - Created an interactive UI rendering playground where users could learn and interact with documentation components.
      - Designed CI/CD pipelines to automate documentation page generation and updates on new commits.
      - Conducted code reviews and collaborated across teams to improve software quality and development processes.`;
};

export const education = async (args: string[]): Promise<string> => {
  return `education:
  - school: University of California, Berkeley
    location: Berkeley, CA
    degree: Data Science and Computer Science
    graduation: May 2026
    relevant_coursework:
      - Data Structures and Algorithms
      - Computer Architecture
      - Discrete Mathematics and Probability Theory
      - Principles and Techniques of Data Science
      - Data Engineering
      - Internet Architecture
      - Data Mining
      - Artificial Intelligence`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `behold:
- your hopes
- your dreams
- node_modules (do not open)`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `error: this directory is paywalled.`;
};
export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim'? cute.
real hackers use 'nvim'. or so they say on reddit.`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? pfft.
elite programmers edit hex directly.`;
};

export const code = async (args?: string[]): Promise<string> => {
  return `'vscode' detected.
installing 500mb update in the background... forever.`;
};

export const claude = async (args?: string[]): Promise<string> => {
  return `sorry, claude is behind a velvet rope.
hire me and i'll buy the VIP pass.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  return `with great power comes great responsibility.
and also: sudo rm -rf / 😈`;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
   █████████                                           █████     
  ███░░░░░███                                         ░░███      
 ░███    ░███   ██████   █████ ████ █████ ████  █████  ░███████  
 ░███████████  ░░░░░███ ░░███ ░███ ░░███ ░███  ███░░   ░███░░███ 
 ░███░░░░░███   ███████  ░███ ░███  ░███ ░███ ░░█████  ░███ ░███ 
 ░███    ░███  ███░░███  ░███ ░███  ░███ ░███  ░░░░███ ░███ ░███ 
 █████   █████░░████████ ░░███████  ░░████████ ██████  ████ █████
░░░░░   ░░░░░  ░░░░░░░░   ░░░░░███   ░░░░░░░░ ░░░░░░  ░░░░ ░░░░░ 
                          ███ ░███                               
                         ░░██████                                
                          ░░░░░░                                 
  █████████  █████                █████                          
 ███░░░░░███░░███                ░░███                           
░███    ░░░  ░███████    ██████   ░███████                       
░░█████████  ░███░░███  ░░░░░███  ░███░░███                      
 ░░░░░░░░███ ░███ ░███   ███████  ░███ ░███                      
 ███    ░███ ░███ ░███  ███░░███  ░███ ░███                      
░░█████████  ████ █████░░████████ ████ █████                     
 ░░░░░░░░░  ░░░░ ░░░░░  ░░░░░░░░ ░░░░ ░░░░░                      


Type 'help' to see the list of available commands.
`;
};
