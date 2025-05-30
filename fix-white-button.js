const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

// Update white button text color to dark blue
function updateWhiteButton(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Directly target the white button's class and update its text color
        content = content.replace(
            /(class=["']flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md\s*)(text-\[#003B70\]|text-blue-700)(\s*bg-white hover:bg-gray-100 hover:text-\[#003B70\])/g,
            '$1text-[#003B70] bg-white hover:bg-gray-100 hover:text-[#003B70]'
        );
        
        // If the above doesn't catch it, try a more specific replacement
        content = content.replace(
            /(<a\s+[^>]*href=["']explore-products\.html["'][^>]*class=["'])([^"']*)(text-\[#003B70\]|text-blue-700)([^"']*["'])/g,
            '$1$2text-[#003B70]$4'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated white button in ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

// Process all files
console.log('Updating white button text color...');
files.forEach(file => {
    updateWhiteButton(path.join(__dirname, file));
});

console.log('White button updates complete!');
