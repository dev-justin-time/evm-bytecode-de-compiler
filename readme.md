# Steps to Set Up the Project:
Install Node.js and npm: Ensure you have Node.js and npm installed on your machine. You can download them from nodejs.org.

Create the Project Directory: Create a directory for your project and navigate into it:

mkdir evm-bytecode-decompiler
cd evm-bytecode-decompiler

Create the package.json File: Use the npm init command to create the package.json file. You can either fill in the details manually or use the default settings:

npm init -y

Edit package.json: Replace the default content in package.json with the content provided above.

Install Dependencies: Install the dependencies listed in package.json:

npm install

Add HTML, CSS, and JavaScript Files: Place your index.html, styles.css, mermaid.js, decompiler.js, and pentest.js files in the project directory.

Run the Project Locally: Use the http-server script to serve your project locally:

npm start

This will start a local server, and you can access your decompiler by navigating to http://localhost:8080 in your web browser.

Full Project Structure:
evm-bytecode-decompiler/
├── index.html
├── styles.css
├── mermaid.css
├── mermaid.js
├── decompiler.js
├── pentest.js
├── package.json
└── package-lock.json
