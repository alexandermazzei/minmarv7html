const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = __dirname;

// The CSS link to add
const cssLink = '    <link rel="stylesheet" href="src/css/fixes.css"> <!-- Fixes for CSS linting issues -->';

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

      // Check if the CSS link already exists
      if (data.includes('src/css/fixes.css')) {
        console.log(`Skipping ${file} - already has fixes.css`);
        return;
      }

      // Add the CSS link after the output.css link
      const updatedContent = data.replace(
        /<link[^>]*?href=["']output\.css["'][^>]*>/, 
        match => `${match}\n${cssLink}`
      );

      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${file}:`, err);
          return;
        }
        console.log(`Updated ${file}`);
      });
    });
  });
});
