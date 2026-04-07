const fs = require('fs');
const path = require('path');

const srcDir = '../Design/stitch';
const destDir = '.';

const pages = [
  { src: 'Homepage/code.html', dest: 'index.html', depth: 0 },
  { src: 'contact_page/code.html', dest: 'contact.html', depth: 0 },
  { src: 'pool_maintenance_service_page/code.html', dest: 'services/pool-maintenance.html', depth: 1 },
  { src: 'equipment_maintenance_repair/code.html', dest: 'services/equipment-repair.html', depth: 1 },
  { src: 'restoration_cleaning_page/code.html', dest: 'services/restoration.html', depth: 1 },
  { src: 'mesa_service_area/code.html', dest: 'areas/mesa.html', depth: 1 },
  { src: 'phoenix_service_area_updated_cta/code.html', dest: 'areas/phoenix.html', depth: 1 },
  { src: 'scottsdale_service_area_updated_cta/code.html', dest: 'areas/scottsdale.html', depth: 1 }
];

['services', 'areas', 'css', 'js'].forEach(d => {
  const p = path.join(destDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

for (let p of pages) {
  let content = '';
  try {
    content = fs.readFileSync(path.join(srcDir, p.src), 'utf8');
  } catch(e) {
    console.log("Could not read " + p.src);
    continue;
  }
  
  const relPath = p.depth === 0 ? '' : '../';
  
  content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, '');
  content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[\s\S]*?"><\/script>/, 
    `<script src="${relPath}js/tailwind-config.js"></script>\n<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>\n<script src="${relPath}js/script.js" defer></script>`);
    
  content = content.replace(/<style>[\s\S]*?<\/style>/, `<link rel="stylesheet" href="${relPath}css/style.css" />`);

  const logoPath = p.depth === 0 ? 'Assests/Ref images/Logo.png' : '../Assests/Ref images/Logo.png';
  const logoHtml = `<img src="${logoPath}" alt="JerBear Pool Care Logo" class="h-14 w-auto">`;
  
  const navHtml = `
  <!-- Unified TopNavBar -->
  <nav class="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-surface-container transition-all duration-300">
    <div class="flex justify-between items-center max-w-7xl mx-auto px-8 py-3">
        <div class="brand-logo">
            <a href="${relPath}index.html">
                ${logoHtml}
            </a>
        </div>
        <div class="hidden md:flex gap-8 items-center font-headline text-sm font-bold tracking-wide">
            <a class="text-slate-600 hover:text-primary transition-colors" href="${relPath}index.html">Home</a>
            
            <!-- Services Dropdown -->
            <div class="relative group">
                <a class="text-slate-600 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer py-4">
                    Services <span class="material-symbols-outlined text-sm">expand_more</span>
                </a>
                <div class="absolute top-[80%] -left-4 w-64 bg-white rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100">
                    <a href="${relPath}services/pool-maintenance.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-100">Weekly Pool Cleaning</a>
                    <a href="${relPath}services/equipment-repair.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-100">Equipment Repair</a>
                    <a href="${relPath}services/restoration.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-100">One-Time Deep Clean</a>
                    <a href="${relPath}index.html#services" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">See All Services</a>
                </div>
            </div>

            <!-- Areas Dropdown -->
            <div class="relative group">
                <a class="text-slate-600 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer py-4">
                    Areas <span class="material-symbols-outlined text-sm">expand_more</span>
                </a>
                <div class="absolute top-[80%] -left-4 w-56 bg-white rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100">
                    <a href="${relPath}areas/phoenix.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-100">Phoenix</a>
                    <a href="${relPath}areas/scottsdale.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-100">Scottsdale</a>
                    <a href="${relPath}areas/mesa.html" class="block px-6 py-4 text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">Mesa</a>
                </div>
            </div>

            <a class="text-slate-600 hover:text-primary transition-colors" href="${relPath}contact.html">Contact</a>
            
            <a href="tel:5552487631" class="ml-2 px-6 py-2 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">phone_in_talk</span>
                (555) 248-7631
            </a>
        </div>
        <button class="md:hidden text-primary">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
    </div>
  </nav>
  `;

  // Replace Entire Navbar or Header
  content = content.replace(/<nav[\s\S]*?<\/nav>/i, navHtml);

  // Still replace footer logos or other raw text logos
  content = content.replace(/<div class="([^"]*?)">\s*JerBear Pool Care\s*<\/div>/g, (match, classes) => {
    return `<div class="${classes} brand-logo"><a href="${relPath}index.html">${logoHtml}</a></div>`;
  });
  content = content.replace(/<div class="text-2xl font-extrabold text-cyan-900 tracking-tighter font-headline">\s*JerBear Pool Care\s*<\/div>/g, 
    `<div class="brand-logo"><a href="${relPath}index.html">${logoHtml}</a></div>`);


  // Replace links
  const mapLink = (text, originalHref) => {
    // Basic decode of HTML entities for matching
    text = text.trim().replace(/&amp;/g, '&');
    
    if (text === 'Services') return `${relPath}index.html#services`;
    if (text === 'Areas' || text === 'Service Areas') return `${relPath}areas/scottsdale.html`; 
    if (text === 'Contact' || text === 'Contact Us') return `${relPath}contact.html`;
    if (text === 'Weekly Maintenance' || text === 'Weekly Cleaning' || text === 'Maintenance' || text === 'Cleaning') return `${relPath}services/pool-maintenance.html`;
    if (text === 'Chemical Balancing') return `${relPath}services/pool-maintenance.html`;
    if (text === 'Equipment Repair' || text === 'Repair & Install' || text === 'Repairs' || text === 'Automation Setup' || text === 'Salt Conversions') return `${relPath}services/equipment-repair.html`;
    if (text === 'Restoration') return `${relPath}services/restoration.html`;
    
    if (text === 'Phoenix' || text.includes('location_on Phoenix') || text.includes('location_on\nPhoenix')) return `${relPath}areas/phoenix.html`;
    if (text === 'Mesa' || text.includes('location_on Mesa') || text.includes('location_on\nMesa')) return `${relPath}areas/mesa.html`;
    if (text === 'Scottsdale' || text.includes('location_on Scottsdale') || text.includes('location_on\nScottsdale')) return `${relPath}areas/scottsdale.html`;
    if (text === 'Paradise Valley' || text === 'Chandler' || text === 'Gilbert' || text.includes('location_on Paradise') || text.includes('location_on Chandler') || text.includes('location_on Gilbert') || text.includes('location_on\nParadise') || text.includes('location_on\nChandler') || text.includes('location_on\nGilbert')) return `${relPath}areas/scottsdale.html`; // Point to an existing area for now
    
    // Pages that don't exist yet but we don't want a broken hash
    if (text === 'About' || text === 'About Us' || text === 'About Our Team' || text === 'Our Story') return `${relPath}index.html#why-us`;
    if (text === 'Privacy Policy' || text === 'Terms of Service' || text === 'Licensing') return `${relPath}index.html`;

    // Social links
    if (text === 'Instagram' || text === 'LinkedIn' || text === 'Twitter') return `https://www.${text.toLowerCase()}.com`;

    if (text === 'Book Now' || text === 'Get Free Quote' || text === 'Get a Quote' || text === 'Contact Us Now' || text === 'Request Your Free Estimate' || text === 'Request Professional Quote' || text.includes('Learn More') || text.includes('See All Areas') ) {
       return `${relPath}contact.html`;
    }
    
    // Default fallback to prevent empty href if we already have it handled or if it's an anchor
    return originalHref;
  };

  // Replace anchor hrefs based on their text content
  content = content.replace(/<a([^>]*)href="([^"]*)"([^>]*)>(.*?)<\/a>/gi, (match, before, href, after, innerText) => {
    // Strip tags from innerText for matching
    const cleanText = innerText.replace(/<[^>]*>?/gm, '').trim();
    const newHref = mapLink(cleanText, href);
    return `<a${before}href="${newHref}"${after}>${innerText}</a>`;
  });
  
  // Replace button onclicks if they should act as links
  // <button ...>Book Now</button>
  content = content.replace(/<button([^>]*)>(.*?)<\/button>/gi, (match, before, innerText) => {
    const cleanText = innerText.replace(/<[^>]*>?/gm, '').trim();
    const newHref = mapLink(cleanText, null);
    if (newHref && newHref !== null) {
      // Add onclick
      if (!before.includes('type="submit"') && !before.includes('md:hidden')) {
          return `<button${before} onclick="window.location.href='${newHref}'">${innerText}</button>`;
      }
    }
    return match;
  });

  // Ensure 'index.html' references in the roots are empty so they stay on same level, or relative
  // The relPath is already taking care of this

  content = content.replace(/<\/head>/i, `  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>`);
  content = content.replace(/<\/body>/i, `<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n<script>AOS.init({duration: 800, once: true});</script>\n</body>`);

  fs.writeFileSync(path.join(destDir, p.dest), content);
  console.log("Wrote " + p.dest);
}
