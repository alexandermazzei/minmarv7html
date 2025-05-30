const fs = require('fs');
const path = require('path');

// The updated header HTML with proper spacing
const updatedHeader = `    <!-- Header -->
    <header class="sticky top-0 w-full bg-gradient-to-r from-[#003B70] to-[#0057A6] z-50 shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <a href="index.html" class="flex items-center">
          <div class="flex items-center justify-center" style="width: 240px; height: 100px;">
            <img 
              src="images/minmar logo.png" 
              alt="MINMAR Logo" 
              width="220" 
              height="90" 
              class="object-contain"
            />
          </div>
        </a>
    
        <div class="hidden md:flex items-center space-x-8 pr-8">
          <a href="windows.html" class="text-white hover:text-gray-200 font-medium transition-colors">Windows</a>
          <a href="doors.html" class="text-white hover:text-gray-200 font-medium transition-colors">Doors</a>
          <a href="energy-savings.html" class="text-white hover:text-gray-200 font-medium transition-colors">Energy Savings</a>
          <a href="resources.html" class="text-white hover:text-gray-200 font-medium transition-colors">Resources</a>
          <a href="support.html" class="text-white hover:text-gray-200 font-medium transition-colors">Support</a>
          <a href="about.html" class="text-white hover:text-gray-200 font-medium transition-colors pr-4">About</a>
        </div>
    
        <div class="flex items-center">
          <button 
            class="md:hidden p-2 rounded-md text-white"
            aria-label="Toggle menu"
            aria-expanded="false" 
            id="mobileMenuButton"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>`;

// Directory containing HTML files
const htmlDir = __dirname;

// Read all HTML files in the directory
fs.readdir(htmlDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for HTML files
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  
  // Process each HTML file
  htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Find and replace the header section
      const headerRegex = /<header[\s\S]*?<\/header>/i;
      const updatedContent = data.replace(headerRegex, updatedHeader);

      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${file}:`, err);
          return;
        }
        console.log(`Updated header spacing in ${file}`);
      });
    });
  });
});
