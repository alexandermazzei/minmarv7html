const fs = require('fs');
const path = require('path');

// Files to update
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

// Update footer links and button colors
function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix button text color in the final CTA section
        content = content.replace(
            /class=["']flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800[^"']*["']/g,
            'class="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 hover:text-white"'
        );
        
        // Update footer links - remove placeholders and add proper links
        content = content.replace(
            /<a[^>]*>\s*News\s*\(Placeholder\)\s*<\/a>/gi,
            '<a href="news.html" class="text-gray-300 hover:text-white transition-colors">News & Updates</a>'
        );
        
        content = content.replace(
            /<a[^>]*>\s*Sustainability\s*\(Placeholder\)\s*<\/a>/gi,
            '<a href="sustainability.html" class="text-gray-300 hover:text-white transition-colors">Sustainability</a>'
        );
        
        // Also update any remaining placeholders in the footer
        content = content.replace(
            /<a[^>]*>\s*News\s*<\/a>/gi,
            '<a href="news.html" class="text-gray-300 hover:text-white transition-colors">News & Updates</a>'
        );
        
        content = content.replace(
            /<a[^>]*>\s*Sustainability\s*<\/a>/gi,
            '<a href="sustainability.html" class="text-gray-300 hover:text-white transition-colors">Sustainability</a>'
        );
        
        // Make sure the links are in the correct section
        if (content.includes('Quick Links')) {
            const quickLinksSection = content.match(/(<div[^>]*class="[^"]*lg:col-span-1 lg:col-start-5[^"]*"[^>]*>)[\s\S]*?(<\/div>)/i);
            if (quickLinksSection) {
                const currentLinks = quickLinksSection[0];
                if (!currentLinks.includes('news.html') || !currentLinks.includes('sustainability.html')) {
                    const newLinks = currentLinks
                        .replace(
                            /<ul[^>]*>([\s\S]*)<\/ul>/i,
                            '<ul class="space-y-2">\n' +
                            '    <li><a href="news.html" class="text-gray-300 hover:text-white transition-colors">News & Updates</a></li>\n' +
                            '    <li><a href="sustainability.html" class="text-gray-300 hover:text-white transition-colors">Sustainability</a></li>\n' +
                            '    <li><a href="career-opportunities.html" class="text-gray-300 hover:text-white transition-colors">Careers</a></li>\n' +
                            '    <li><a href="contact-us.html" class="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>\n' +
                            '</ul>'
                        );
                    content = content.replace(currentLinks, newLinks);
                }
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

// Process all files
console.log('Updating footer links and button styles...');
files.forEach(file => {
    updateFile(path.join(__dirname, file));
});

console.log('All files have been updated successfully!');
