const fs = require('fs');
const path = require('path');

// The reference header HTML (from index.html)
const referenceHeader = `    <!-- Header -->
    <header class="sticky top-0 w-full bg-gradient-to-r from-[#003B70] to-[#0057A6] z-50 shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-4 sm:px-0">
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
    
        <div class="hidden md:flex items-center space-x-6">
          <a href="windows.html" class="text-white hover:text-gray-200 font-medium transition-colors">Windows</a>
          <a href="doors.html" class="text-white hover:text-gray-200 font-medium transition-colors">Doors</a>
          <a href="energy-savings.html" class="text-white hover:text-gray-200 font-medium transition-colors">Energy Savings</a>
          <a href="resources.html" class="text-white hover:text-gray-200 font-medium transition-colors">Resources</a>
          <a href="support.html" class="text-white hover:text-gray-200 font-medium transition-colors">Support</a>
          <a href="about.html" class="text-white hover:text-gray-200 font-medium transition-colors">About</a>
        </div>
    
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
    </header>`;

// Directory containing HTML files
const htmlDir = __dirname;

// Read all HTML files in the directory
fs.readdir(htmlDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for HTML files, excluding index.html (our reference)
  const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
  
  // Process each HTML file
  htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Replace the header section and the action buttons
      // First, find and remove the existing header and action buttons if they exist
      let updatedContent = data;
      
      // Remove any existing mobile menu
      updatedContent = updatedContent.replace(/<div id="mobileMenu"[\s\S]*?<\/div>\s*<\/div>/i, '');
      
      // Remove any existing header
      updatedContent = updatedContent.replace(/<header[\s\S]*?<\/header>/i, '');
      
      // Remove any existing action buttons div
      updatedContent = updatedContent.replace(/<div class="bg-white shadow[\s\S]*?<\/div>\s*<\/div>/i, '');
      
      // Find the <main> tag or <body> tag to insert our content before it
      const mainTagIndex = updatedContent.search(/<main[^>]*>|<body[^>]*>/i);
      
      if (mainTagIndex !== -1) {
        // Insert our header and action buttons before the main/body tag
        const beforeMain = updatedContent.substring(0, mainTagIndex);
        const afterMain = updatedContent.substring(mainTagIndex);
        updatedContent = beforeMain + referenceHeader + '\n\n' + afterMain;
        
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Updated header and action buttons in ${file}`);
        });
      } else {
        console.log(`Skipping ${file} - could not find <main> or <body> tag`);
      }
    });
  });
});
