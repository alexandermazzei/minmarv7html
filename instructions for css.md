Instructions to Compile CSS
Install Node.js and npm if you haven't already.
Install Tailwind CSS:
npm install -D tailwindcss
npx tailwindcss init
Use code with caution.
Bash
(This creates a basic tailwind.config.js. Replace its content with the one provided above.)
Compile your CSS:
Run this command in your project's root directory:
npx tailwindcss -i ./input.css -o ./output.css --watch
Use code with caution.
Bash
This will generate an output.css file. You will link this output.css in your HTML files. The --watch flag will automatically recompile when you change input.css or your HTML files (due to the content path in tailwind.config.js).