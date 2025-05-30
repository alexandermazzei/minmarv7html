const fs = require('fs');
const path = require('path');

// Read the reference file (index.html)
const referenceFile = path.join(__dirname, 'index.html');
fs.readFile(referenceFile, 'utf8', (err, referenceData) => {
  if (err) {
    console.error('Error reading reference file:', err);
    return;
  }

  // Extract the header section including the action buttons
  const headerMatch = referenceData.match(/([\s\S]*?<\/header>\s*<div id="mobileMenu"[\s\S]*?<\/div>\s*<\/div>\s*<div class="bg-white shadow[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/i);
  if (!headerMatch) {
    console.error('Could not find header in reference file');
    return;
  }
  
  const referenceHeader = headerMatch[1].trim();
  
  // Read all HTML files in the directory
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Filter for HTML files, excluding index.html (our reference)
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
    
    // Process each HTML file
    htmlFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      
      // Read the file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Find the main content (from <main> or <body> to end)
        const mainContentMatch = data.match(/(<main[^>]*>|<body[^>]*>)([\s\S]*)/i);
        if (!mainContentMatch) {
          console.log(`Skipping ${file} - could not find main content`);
          return;
        }
        
        const mainContent = mainContentMatch[0];
        
        // Get the DOCTYPE and opening HTML/head section from the target file
        const docTypeMatch = data.match(/^[\s\S]*?(?=<body[^>]*>)/i);
        if (!docTypeMatch) {
          console.log(`Skipping ${file} - could not find DOCTYPE/head section`);
          return;
        }
        
        // Combine the target's DOCTYPE/head with the reference header and main content
        const updatedContent = docTypeMatch[0] + '\n\n' + referenceHeader + '\n\n' + mainContent;
        
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Updated header in ${file}`);
        });
      });
    });
  });
});
