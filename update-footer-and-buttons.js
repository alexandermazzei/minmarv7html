const fs = require('fs');
const path = require('path');

// Update footer links and buttons
function updateFooter() {
    const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove placeholders and update footer links
        content = content.replace(/<a href="#!" class="[^"]*">(News|Sustainability)<\/a>/g, '');
        
        // Update footer structure
        content = content.replace(
            /<div class="lg:col-span-1 lg:col-start-5">[\s\S]*?<\/div>[\s\s]*<\/div>[\s\s]*<div class="mt-8 pt-8 border-t border-gray-700"/,
            '<div class="lg:col-span-1 lg:col-start-5">\n' +
            '    <h3 class="text-lg font-semibold mb-4">Quick Links</h3>\n' +
            '    <ul class="space-y-2">\n' +
            '        <li><a href="news.html" class="text-gray-300 hover:text-white transition-colors">News & Updates</a></li>\n' +
            '        <li><a href="sustainability.html" class="text-gray-300 hover:text-white transition-colors">Sustainability</a></li>\n' +
            '        <li><a href="career-opportunities.html" class="text-gray-300 hover:text-white transition-colors">Careers</a></li>\n' +
            '        <li><a href="contact-us.html" class="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>\n' +
            '    </ul>\n' +
            '</div>\n' +
            '    </div>\n' +
            '    <div class="mt-8 pt-8 border-t border-gray-700"'
        );
        
        // Update buttons in the final CTA section
        content = content.replace(
            /<div class="btn-wrapper">\s*<a href="get-a-quote\.html" class="btn btn-lg btn-white">\s*Claim My FREE Home Assessment Now!\s*<\/a>\s*<\/div>\s*<div class="btn-wrapper">\s*<a href="explore-products\.html" class="btn btn-lg btn-white">\s*Explore Our Product Range\s*<\/a>\s*<\/div>/,
            '<div class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">\n' +
            '    <a href="get-a-quote.html" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md">\n' +
            '        Get Your Free Quote\n' +
            '        <svg class="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n' +
            '            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />\n' +
            '        </svg>\n' +
            '    </a>\n' +
            '    <a href="explore-products.html" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md">\n' +
            '        View Products\n' +
            '        <svg class="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n' +
            '            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />\n' +
            '        </svg>\n' +
            '    </a>\n' +
            '</div>'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated footer and buttons in ${file}`);
    });
}

// Run the update
updateFooter();
console.log('All footers and buttons have been updated successfully!');
