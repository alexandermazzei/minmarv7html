const fs = require('fs');
const path = require('path');

// Get the header from index.html (everything up to <main>)
function getHeader() {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const headerMatch = indexContent.match(/([\s\S]*?)(?=<main[^>]*>)/i);
    if (!headerMatch) throw new Error('Could not find header in index.html');
    
    // Remove any existing DOCTYPE and HTML tags
    let header = headerMatch[1].trim();
    header = header.replace(/<!DOCTYPE[^>]*>/i, '');
    header = header.replace(/<html[^>]*>/i, '');
    header = header.replace(/<\/html>/i, '');
    header = header.replace(/<head>[\s\S]*<\/head>/i, '');
    
    return header.trim();
}

// Get the footer from index.html
function getFooter() {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const footerMatch = indexContent.match(/(<footer[\s\S]*<\/footer>)/i);
    if (!footerMatch) throw new Error('Could not find footer in index.html');
    return footerMatch[1].trim();
}

// Get the head content from index.html
function getHead() {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const headMatch = indexContent.match(/<head>([\s\S]*?)<\/head>/i);
    if (!headMatch) throw new Error('Could not find head in index.html');
    return headMatch[0].trim();
}

// Update a single HTML file
function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get main content (between <main> tags)
    const mainMatch = content.match(/<main[^>]*>([\s\S]*)<\/main>/i);
    if (!mainMatch) {
        console.log(`Skipping ${filePath} - no <main> tag found`);
        return;
    }
    
    const mainContent = mainMatch[0];
    const head = getHead();
    const header = getHeader();
    const footer = getFooter();
    
    // Rebuild the file with consistent header and footer
    const newContent = `<!DOCTYPE html>
<html lang="en">
${head}
${header}
${mainContent}
${footer}
</body>
</html>`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
}

// Process all HTML files
function processAllFiles() {
    const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
        if (file === 'index.html') return; // Skip index.html as it's our reference
        const filePath = path.join(__dirname, file);
        updateFile(filePath);
    });
    
    console.log('All pages have been updated with consistent headers and footers');
}

// Run the update
// First update the news.html and sustainability.html specifically
const newsPath = path.join(__dirname, 'news.html');
const sustainabilityPath = path.join(__dirname, 'sustainability.html');

// Process all files
processAllFiles();

// Then update the footer links in all files
const footerUpdateScript = path.join(__dirname, 'update-footer-and-buttons.js');
if (fs.existsSync(footerUpdateScript)) {
    console.log('Updating footer links...');
    require(footerUpdateScript);
}
