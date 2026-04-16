const fs = require('fs');
const file = './src/components/sections/SectionHandoff.tsx';
let content = fs.readFileSync(file, 'utf8');

// Title italics and color styling
const oldTitle = `Никаких привязок. <span className="text-white/40">Реальный экспорт.</span>`;
const newTitle = `Никаких привязок. <span className="font-serif italic font-light text-accent">Реальный экспорт.</span>`;
content = content.replace(oldTitle, newTitle);

// Card 1: Emerald -> Accent
content = content.replace(/emerald-500\/10/g, 'accent/10');
content = content.replace(/#10b981/g, '#C8CFA0'); // Accent hex
content = content.replace(/emerald-500\/30/g, 'accent/30');
content = content.replace(/emerald-400/g, 'accent/80');
content = content.replace(/bg-emerald-500/g, 'bg-accent');
content = content.replace(/shadow-\[0_0_20px_rgba\(16,185,129,0\.15\)\]/g, 'shadow-[0_0_20px_rgba(200,207,160,0.15)]');
content = content.replace(/shadow-\[0_0_30px_rgba\(16,185,129,0\.3\)\]/g, 'shadow-[0_0_30px_rgba(200,207,160,0.3)]');

// Card 2: Indigo -> Accent
content = content.replace(/indigo-500\/10/g, 'accent/10');
content = content.replace(/border-indigo-500\/20/g, 'border-accent/20');
content = content.replace(/text-indigo-400/g, 'text-accent');

// Card 3: Pink / Blue -> Accent & White/Gray
content = content.replace(/pink-500\/20/g, 'accent/20');
content = content.replace(/pink-500\/50/g, 'accent/50');
content = content.replace(/text-pink-300/g, 'text-accent');

content = content.replace(/blue-500\/20/g, 'white/10');
content = content.replace(/blue-500\/50/g, 'white/20');
content = content.replace(/text-blue-300/g, 'text-white/60');

content = content.replace(/text-pink-400/g, 'text-white'); // Cursor color

// Other minor changes for strictly black/white/accent
content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-[#050505]');
content = content.replace(/bg-\[\#111\]/g, 'bg-[#0a0a0c]');

fs.writeFileSync(file, content);
console.log("Done");