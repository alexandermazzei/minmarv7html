const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
    'index.html',
    'news.html',
    'sustainability.html',
    'about.html',
    'windows.html',
    'doors.html',
    'energy-savings.html',
    'resources.html',
    'support.html'
];

// Get the header from index.html
function getHeader() {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const headerMatch = indexContent.match(/([\s\S]*?)(?=<main[^>]*>)/i);
    if (!headerMatch) throw new Error('Could not find header in index.html');
    return headerMatch[1].trim();
}

// Get the footer from index.html
function getFooter() {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const footerMatch = indexContent.match(/(<footer[\s\S]*<\/footer>)/i);
    if (!footerMatch) throw new Error('Could not find footer in index.html');
    return footerMatch[1].trim();
}

// Fix button styling in the final CTA section
function fixButtons(content) {
    // Fix the button container structure
    return content.replace(
        /<div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch">\s*<div class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">([\s\S]*?)<\/div>\s*<\/div>/,
        '<div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch">\n' +
        '    <div class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl mx-auto">\n' +
        '        <a href="get-a-quote.html" class="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md">\n' +
        '            Get Your Free Quote\n' +
        '            <svg class="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n' +
        '                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />\n' +
        '            </svg>\n' +
        '        </a>\n' +
        '        <a href="explore-products.html" class="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md">\n' +
        '            View Our Products\n' +
        '            <svg class="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n' +
        '                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />\n' +
        '            </svg>\n' +
        '        </a>\n' +
        '    </div>\n' +
        '</div>'
    );
}

// Process all files
function processFiles() {
    const header = getHeader();
    const footer = getFooter();

    filesToUpdate.forEach(file => {
        const filePath = path.join(__dirname, file);
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Update header if needed
            if (!content.includes('<header class="sticky top-0 w-full bg-gradient-to-r from-[')) {
                content = content.replace(/<body[^>]*>([\s\S]*?)(?=<main)/i, 
                    match => match.replace(/(<body[^>]*>)[\s\S]*/i, `$1\n${header}`));
            }
            
            // Update footer if needed
            if (!content.includes('<footer class="bg-dark-blue text-white pt-12 pb-6">')) {
                content = content.replace(/(<\/main>)[\s\S]*/i, `$1\n${footer}\n</body>\n</html>`);
            }
            
            // Fix buttons in the final CTA section
            content = fixButtons(content);
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    console.log('All files have been updated successfully!');
}

// Run the updates
processFiles();
