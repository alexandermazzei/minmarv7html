const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

// Update button colors
function updateButtonColors(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update the white button's text color to dark blue
        content = content.replace(
            /class=(["'])flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100[^"']*\1/g,
            'class="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-[#003B70] bg-white hover:bg-gray-100 hover:text-[#003B70] transition-all duration-200 transform hover:scale-105 shadow-md"'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated buttons in ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
    }
}

// Process all files
console.log('Updating button colors...');
files.forEach(file => {
    updateButtonColors(path.join(__dirname, file));
});

console.log('Button color updates complete!');
