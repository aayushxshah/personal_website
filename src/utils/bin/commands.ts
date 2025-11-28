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
[ctrl+l]/clear: clear terminal.\n
`;
};

// export const chat = async (args: string[]): Promise<string> => {
//   if (!config.chat.active) {
//     return `Chat is not available yet.`;
//   } else {
//     return `Chat is not available yet.`;
//   }
// };

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'resume' - my resume.
'linkedin' - my linkedin profile.
'github' - my github profile.`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open('/resume', '_blank');
  return 'Opening resume...';
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`, '_blank');
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
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

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}}`;
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

export const cursor = async (args?: string[]): Promise<string> => {
  return `cursor? oh, you mean vscode with AI stickers slapped on?`;
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
Type 'about' to get started.
${config.chat.active ? "Type 'chat' to talk to my AI assistant." : ''}
`;
};
