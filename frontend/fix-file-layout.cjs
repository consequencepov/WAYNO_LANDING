const fs = require('fs');
let code = fs.readFileSync('src/components/ui/PromptInput.tsx', 'utf8');

// Update Attached File Pill position
code = code.replace(
  'isExpanded ? "left-[14px] top-[74px]" : "left-[70px] top-[18px]"',
  'isExpanded ? "left-[76px] top-[24px]" : "left-[76px] top-[18px]"'
);

// Update textarea padding to make room for file if present
code = code.replace(
  'isExpanded ? "pt-[24px] pl-[76px] pr-[76px] pb-[80px]" : "pt-[24px] pl-[76px] pr-[76px] pb-[20px]"',
  'isExpanded ? (file ? "pt-[80px] pl-[76px] pr-[76px] pb-[80px]" : "pt-[24px] pl-[76px] pr-[76px] pb-[80px]") : (file ? "pt-[80px] pl-[76px] pr-[76px] pb-[20px]" : "pt-[24px] pl-[76px] pr-[76px] pb-[20px]")'
);

fs.writeFileSync('src/components/ui/PromptInput.tsx', code);
console.log('Fixed');
