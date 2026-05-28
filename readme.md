# EVM Bytecode Decompiler

A web-based tool for decompiling Ethereum Virtual Machine (EVM) bytecode into human-readable assembly-like instructions, featuring interactive workflow visualization and security analysis capabilities.


## Steps to Set Up the Project:
Install Node.js and npm: Ensure you have Node.js and npm installed on your machine. You can download them from nodejs.org.

//Create the Project Directory: Create a directory for your project and navigate into it:
mkdir evm-bytecode-decompiler
cd evm-bytecode-decompiler

// Then
npm init -y

// Install Dependencies: Install the dependencies listed in package.json:
npm install

// Run the Project Locally: Use the http-server script to serve your project locally:
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


## Features

- **Bytecode Decompilation**: Converts hex EVM bytecode into readable opcode instructions with definitions
- **Interactive Workflow Visualization**: Mermaid flowchart showing contract execution flow with stage-by-stage highlighting
- **Security Analysis**: Built-in pentest simulations for common vulnerabilities:
  - Reentrancy attacks
  - Integer overflow/underflow
  - Front-running susceptibility
  - Access control issues
  - Transaction ordering dependencies (MEV)
- **Wallet Integration**: Connect Ethereum wallets via MetaMask/Web3 providers
- **Contract Analysis**: Identifies contract type, features, and security properties
- **External Tool Integration**: Send bytecode to external converters (EVM to RISC-V, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
.
├── index.html          # Main application interface
├── mermaid.js          # Mermaid initialization and stage control logic
├── mermaid.css         # Styling for Mermaid diagrams and UI components
├── pentest.js          # Security simulation functions
├── .vscode/            # VS Code settings
└── README.md           # This file
```

## How to Use

1. **Open the Application**: Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge recommended)

2. **Decompile Bytecode**:
   - Paste EVM bytecode (hex format, with or without `0x` prefix) into the "Input Bytecode" textarea
   - Click the "Decompile" button to see the decompiled output
   - View analysis in the "Bytecode Analysis" and "Contract Information" panels

3. **Visualize Contract Flow**:
   - The Mermaid flowchart in the workflow panel shows the typical contract execution flow
   - Use the stage buttons (►) to highlight different execution phases:
     1. Call Received
     2. Read / Validate
     3. State Change
     4. External Call
     5. Return / Emit

4. **Run Security Tests**:
   - Use the pentest suite buttons to analyze the bytecode for common vulnerabilities:
     - Simulate Reentrancy
     - Simulate Integer Overflow
     - Simulate Front-running
     - Simulate Access Control Bypass
     - Simulate Tx-Ordering (Nonce/MEV)

5. **Connect Wallet** (Optional):
   - Click "Connect Wallet" to link your Ethereum wallet (requires MetaMask or similar)
   - Enter a contract address and click "Get Bytecode" to automatically fetch bytecode from the blockchain

6. **Use External Converter**:
   - Click the "EVM→RISC-V Converter" button to open the external conversion tool
   - Your current bytecode will be sent to the converter for processing

## Example Bytecode

The application loads with an example bytecode demonstrating a simple contract. Try decompiling it to see how the tool works.

## Technical Details

- **Dependencies**: 
  - Web3.js (loaded via CDN) for Ethereum blockchain interaction
  - Mermaid.js (loaded via ES module) for flowchart visualization
  - No build process or Node.js dependencies required - pure client-side web app

- **Browser Support**: 
  - Modern browsers with ES6 module support
  - Tested in Chrome, Firefox, Safari, and Edge

- **Security Note**: 
  - All processing happens client-side - no bytecode is sent to external servers unless you explicitly use the external converter or blockchain lookup features
  - Infura URL in the code requires your own project ID for blockchain lookups

## Recent Fixes

- **Mermaid Initialization**: Fixed conflicting Mermaid initializations that were causing rendering errors
- **Git Repository Safety**: Added repository to Git's safe.directory list to resolve ownership warnings
- **Stage Highlighting**: Corrected Mermaid node highlighting logic for proper workflow visualization

## Customization

- Modify `mermaid.css` to change the visual appearance of the flowchart and UI
- Update the opcode definitions in `index.html` if needed (though they follow Ethereum Yellow Paper standards)
- Adjust the Mermaid flowchart in `index.html` (lines 115-126) to represent different contract patterns

## Development

This is a static web application - no special development setup is required. Simply edit the files and refresh your browser to see changes.

For VS Code users, the `.vscode` directory contains recommended settings.

## License

MIT License - feel free to use, modify, and distribute this tool as needed.

## Acknowledgments

- Based on Ethereum Yellow Paper opcode definitions
- Uses Mermaid.js for diagram rendering
- Web3.js for Ethereum blockchain interaction
