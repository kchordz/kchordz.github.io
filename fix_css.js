const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The grep output shows duplicate keys:
// display: grid; display: flex; ...
// aspect-ratio: 4/5; aspect-ratio: 16/9; ...

// Let's rewrite the .projects-grid and .project-card exactly.
const pGridRegex = /\.projects-grid\s*\{[\s\S]*?\}/;
const pCardRegex = /\.project-card\s*\{[\s\S]*?\}/;

html = html.replace(pGridRegex, `.projects-grid {
            display: flex;
            flex-direction: column;
            gap: 4vw;
        }`);

html = html.replace(pCardRegex, `.project-card {
            position: relative;
            display: block;
            text-align: left;
            border-radius: var(--radius-lg);
            overflow: hidden;
            background: #080808;
            border: 1px solid var(--border-color);
            aspect-ratio: 16/9;
            max-height: 80vh;
            transform: translateZ(0);
        }`);

// Mobile fix:
html = html.replace(/\.project-card \{ aspect-ratio: 1\/1 !important; \}/g, '.project-card { aspect-ratio: 4/5 !important; max-height: auto; }');

fs.writeFileSync('index.html', html);
