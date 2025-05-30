const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

// Update white button directly
function updateWhiteButton(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Directly target the white button and add inline style
        content = content.replace(
            /(<a\s+[^>]*href=["']explore-products\.html["'][^>]*class=["'][^"']*)(["'])/g,
            '$1 text-[#003B70] hover:text-[#003B70]" style="color: #003B70 !important;"'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated white button in ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

// Process all files
console.log('Updating white button text color directly...');
files.forEach(file => {
    updateWhiteButton(path.join(__dirname, file));
});

console.log('White button updates complete!');
