const fs = require('fs');

const sections = [
    {
        path: "frontend/src/components/sections/PinSectionCards.tsx",
        btn: `<div className="mt-12 flex justify-center w-full z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform relative z-50">Запросить бесплатный доступ</button></div>`,
        target: `          </div>\n        </div>\n      </div>\n    </section>`
    },
    {
        path: "frontend/src/components/sections/PinSectionCatalog.tsx",
        btn: `<div className="absolute bottom-16 right-12 z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-2xl hover:bg-gray-200 transition-colors">Запустить пилот</button></div>`,
        target: `    </section>`
    },
    {
        path: "frontend/src/components/sections/PinSectionFeatures.tsx",
        btn: `<div className="absolute top-1/2 right-12 -translate-y-1/2 z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="group relative px-6 py-3 font-bold text-white rounded-full overflow-hidden bg-surface border border-white/20 hover:border-accent transition-all"><span className="relative z-10">Бесплатный запуск</span><div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform"></div></button></div>`,
        target: `    </section>`
    },
    {
        path: "frontend/src/components/sections/PinSectionPartners.tsx",
        btn: `<div className="mt-8 flex justify-center w-full relative z-50 pointer-events-auto"><button onClick={() => setIsCtaOpen(true)} className="px-10 py-5 bg-white/10 backdrop-blur-md border hover:border-white/50 border-white/20 text-white rounded-[2rem] font-bold text-xl uppercase tracking-widest shadow-2xl hover:bg-white/20 transition-all">Запустить тест</button></div>`,
        target: `          </div>\n        </div>\n      </div>\n    </section>`
    }
];

sections.forEach(sec => {
    let content = fs.readFileSync(sec.path, 'utf8');

    if (!content.includes('import { useState }')) {
        content = "import { useState } from 'react'\n" + content;
    }
    if (!content.includes('CtaModal')) {
        content = content.replace(/(import .*? from '.*?')/, "$1\nimport { CtaModal } from '@/components/ui'");
    }

    if (!content.includes('setIsCtaOpen')) {
        // Need to find the function declaration to add state
        content = content.replace(/(export function \w+\(.*?\)\s*\{)/, "$1\n  const [isCtaOpen, setIsCtaOpen] = useState(false)");
    }

    if (!content.includes('setIsCtaOpen(true)')) {
        content = content.replace(sec.target, `      ${sec.btn}\n      <CtaModal isOpen={isCtaOpen} onClose={() => setIsCtaOpen(false)} />\n${sec.target}`);
    }

    fs.writeFileSync(sec.path, content);
});
console.log("Done modifying pin sections");