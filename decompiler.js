
decompiler.js
const opcodeDefinitions = {
  'STOP': 'Halts execution',
  'ADD': 'Addition operation',
  'MUL': 'Multiplication operation',
  'SUB': 'Subtraction operation',
  'DIV': 'Integer division operation',
  'SDIV': 'Signed integer division operation',
  'MOD': 'Modulo remainder operation',
  'SMOD': 'Signed modulo operation',
  'ADDMOD': 'Modulo addition operation',
  'MULMOD': 'Modulo multiplication operation',
  'EXP': 'Exponential operation',
  'SIGNEXTEND': 'Extend length of two\'s complement signed integer',
  'LT': 'Less-than comparison',
  'GT': 'Greater-than comparison',
  'SLT': 'Signed less-than comparison',
  'SGT': 'Signed greater-than comparison',
  'EQ': 'Equality comparison',
  'ISZERO': 'Simple not operator',
  'AND': 'Bitwise AND operation',
  'OR': 'Bitwise OR operation',
  'XOR': 'Bitwise XOR operation',
  'NOT': 'Bitwise NOT operation',
  'BYTE': 'Retrieve single byte from word',
  'SHA3': 'Compute Keccak-256 hash',
  'ADDRESS': 'Get address of currently executing account',
  'BALANCE': 'Get balance of the given account',
  'ORIGIN': 'Get execution origination address',
  'CALLER': 'Get caller address',
  'CALLVALUE': 'Get deposited value by the instruction/transaction responsible for this execution',
  'CALLDATALOAD': 'Get input data of current environment',
  'CALLDATASIZE': 'Get size of input data in current environment',
  'CALLDATACOPY': 'Copy input data in current environment to memory',
  'CODESIZE': 'Get size of code running in current environment',
  'CODECOPY': 'Copy code running in current environment to memory',
  'GASPRICE': 'Get price of gas in current environment',
  'EXTCODESIZE': 'Get size of an account\'s code',
  'EXTCODECOPY': 'Copy an account\'s code to memory',
  'BLOCKHASH': 'Get the hash of one of the 256 most recent complete blocks',
  'COINBASE': 'Get the block\'s beneficiary address',
  'TIMESTAMP': 'Get the block\'s timestamp',
  'NUMBER': 'Get the block\'s number',
  'DIFFICULTY': 'Get the block\'s difficulty',
  'GASLIMIT': 'Get the block\'s gas limit',
  'POP': 'Remove item from stack',
  'MLOAD': 'Load word from memory',
  'MSTORE': 'Save word to memory',
  'MSTORE8': 'Save byte to memory',
  'SLOAD': 'Load word from storage',
  'SSTORE': 'Save word to storage',
  'JUMP': 'Alter the program counter',
  'JUMPI': 'Conditionally alter the program counter',
  'PC': 'Get the program counter',
  'MSIZE': 'Get the size of active memory',
  'GAS': 'Get the amount of available gas',
  'JUMPDEST': 'Mark a valid jump destination',
  'PUSH1': 'Place 1 byte item on stack',
  'PUSH2': 'Place 2 byte item on stack',
  'PUSH3': 'Place 3 byte item on stack',
  'PUSH4': 'Place 4 byte item on stack',
  'CREATE': 'Create a new account with associated code',
  'CALL': 'Message-call into an account',
  'CALLCODE': 'Message-call into this account with alternative account\'s code',
  'RETURN': 'Halt execution returning output data',
  'DELEGATECALL': 'Message-call into this account with an alternative account\'s code, but persisting the current values for sender and value',
  'CREATE2': 'Create a new account with associated code at a predictable address',
  'REVERT': 'Halt execution reverting state changes',
  'INVALID': 'Designated invalid instruction',
  'SELFDESTRUCT': 'Halt execution and register account for deletion'
};

const opcodes = {
  '00': 'STOP',
  '01': 'ADD',
  '02': 'MUL',
  '03': 'SUB',
  '04': 'DIV',
  '05': 'SDIV',
  '06': 'MOD',
  '07': 'SMOD',
  '08': 'ADDMOD',
  '09': 'MULMOD',
  '0a': 'EXP',
  '0b': 'SIGNEXTEND',
  '10': 'LT',
  '11': 'GT',
  '12': 'SLT',
  '13': 'SGT',
  '14': 'EQ',
  '15': 'ISZERO',
  '16': 'AND',
  '17': 'OR',
  '18': 'XOR',
  '19': 'NOT',
  '1a': 'BYTE',
  '20': 'SHA3',
  '30': 'ADDRESS',
  '31': 'BALANCE',
  '32': 'ORIGIN',
  '33': 'CALLER',
  '34': 'CALLVALUE',
  '35': 'CALLDATALOAD',
  '36': 'CALLDATASIZE',
  '37': 'CALLDATACOPY',
  '38': 'CODESIZE',
  '39': 'CODECOPY',
  '3a': 'GASPRICE',
  '3b': 'EXTCODESIZE',
  '3c': 'EXTCODECOPY',
  '40': 'BLOCKHASH',
  '41': 'COINBASE',
  '42': 'TIMESTAMP',
  '43': 'NUMBER',
  '44': 'DIFFICULTY',
  '45': 'GASLIMIT',
  '50': 'POP',
  '51': 'MLOAD',
  '52': 'MSTORE',
  '53': 'MSTORE8',
  '54': 'SLOAD',
  '55': 'SSTORE',
  '56': 'JUMP',
  '57': 'JUMPI',
  '58': 'PC',
  '59': 'MSIZE',
  '5a': 'GAS',
  '5b': 'JUMPDEST',
  '60': 'PUSH1',
  '61': 'PUSH2',
  '62': 'PUSH3',
  '63': 'PUSH4',
  'f0': 'CREATE',
  'f1': 'CALL',
  'f2': 'CALLCODE',
  'f3': 'RETURN',
  'f4': 'DELEGATECALL',
  'f5': 'CREATE2',
  'fd': 'REVERT',
  'fe': 'INVALID',
  'ff': 'SELFDESTRUCT'
};

let walletConnected = false;
let walletAddress = '';

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts[0];
      walletConnected = true;
      document.getElementById('walletInfo').innerHTML = `Wallet connected: ${walletAddress}`;
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Please install MetaMask or another Ethereum wallet');
  }
}

async function getContractBytecode(address) {
  try {
    const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your Infura Project ID if needed
    const web3 = new Web3(provider);
    const bytecode = await web3.eth.getCode(address);
    return bytecode;
  } catch (error) {
    console.error("Error fetching bytecode:", error);
    return null;
  }
}

function analyzeContract(bytecode) {
  const contractInfo = {
    type: 'Unknown',
    features: [],
    security: []
  };
  // Detect contract type
  if (bytecode.includes('60806040')) {
    contractInfo.type = 'Solidity Contract (>0.4.22)';
  }
  // Clean up feature detection
  if (bytecode.includes('60806040')) {
    contractInfo.features.push('Constructor Present');
  }
  if (bytecode.includes('5b')) {
    contractInfo.features.push('Has Jump Destinations');
  }
  if (bytecode.includes('f3')) {
    contractInfo.features.push('Returns Data');
  }
  if (bytecode.includes('fd')) {
    contractInfo.features.push('Can Revert');
  }
  // Clean up security analysis
  if (bytecode.includes('33')) {
    contractInfo.security.push('Uses msg.sender');
  }
  if (bytecode.includes('54')) {
    contractInfo.security.push('Reads from Storage');
  }
  if (bytecode.includes('55')) {
    contractInfo.security.push('Writes to Storage');
  }
  if (bytecode.includes('ff')) {
    contractInfo.security.push('Can Self Destruct');
  }
  return contractInfo;
}

/* ---------- Decompiler ---------- */
async function decompile() {
  const bytecodeInput = document.getElementById('bytecode').value.trim();
  const contractAddress = document.getElementById('contractAddress').value.trim();
  const output = document.getElementById('output');
  const analysis = document.getElementById('analysis');
  const contractInfoDiv = document.getElementById('contractInfo');

  try {
    if (!bytecodeInput.match(/^(0x)?[0-9a-fA-F]+$/)) {
      throw new Error('Invalid bytecode format. Please enter valid hexadecimal.');
    }
    let bytecode = bytecodeInput.replace('0x', '');
    let decompiled = [];
    let i = 0;
    while (i < bytecode.length) {
      const opcode = bytecode.slice(i, i + 2).toLowerCase();
      if (!opcode) break;
      if (opcodes[opcode]) {
        if (opcode >= '60' && opcode <= '7f') {
          const pushSize = parseInt(opcode, 16) - 0x5f;
          const dataStart = i + 2;
          const dataEnd = dataStart + (pushSize * 2);
          const pushData = bytecode.slice(dataStart, dataEnd);
          const instruction = `${opcodes[opcode]} 0x${pushData}`;
          const definition = opcodeDefinitions[opcodes[opcode]] || 'No definition available';
          decompiled.push(`${instruction}\n    // ${definition}`);
          i = dataEnd;
        } else {
          const instruction = opcodes[opcode];
          const definition = opcodeDefinitions[instruction] || 'No definition available';
          decompiled.push(`${instruction}\n    // ${definition}`);
          i += 2;
        }
      } else {
        decompiled.push(`UNKNOWN (${opcode})\n    // Undefined operation`);
        i += 2;
      }
    }
    output.value = decompiled.join('\n');
    const opcodeCount = {};
    decompiled.forEach(line => {
      const opcode = line.split('\n')[0].split(' ')[0];
      opcodeCount[opcode] = (opcodeCount[opcode] || 0) + 1;
    });
    const contractInfo = analyzeContract(bytecode);
    analysis.innerHTML = `
      <h3 style="margin-top:0;color:var(--accent)">Bytecode Analysis</h3>
      <p>Total Length: ${bytecode.length / 2} bytes</p>
      <p>Instruction Count: ${decompiled.length}</p>
      <p>Most Common Operations:</p>
      <ul>
        ${Object.entries(opcodeCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([op, count]) => `<li>${op}: ${count} times</li>`)
          .join('')}
      </ul>`;
    contractInfoDiv.innerHTML = `
      <h3 style="margin-top:0;color:var(--accent)">Contract Information</h3>
      <p>Contract Type: ${contractInfo.type}</p>
      <h4>Features Detected:</h4>
      <ul>
        ${contractInfo.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <h4>Security Analysis:</h4>
      <ul>
        ${contractInfo.security.map(s => `<li>${s}</li>`).join('')}
      </ul>`;
    if (walletConnected) {
      logConnection(walletAddress, contractAddress);
    }
  } catch (err) {
    const errEl = document.getElementById('error');
    if (errEl) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    }
    output.value = '';
    const analysisEl = document.getElementById('analysis');
    if (analysisEl) analysisEl.innerHTML = '';
    const contractInfoDiv = document.getElementById('contractInfo');
    if (contractInfoDiv) contractInfoDiv.innerHTML = '';
  }
}

function clearFields() {
  document.getElementById('bytecode').value = '';
  document.getElementById('contractAddress').value = '';
  document.getElementById('output').value = '';
  const err = document.getElementById('error');
  if (err) { err.textContent = ''; err.style.display = 'none'; }
  document.getElementById('analysis').innerHTML = '';
  document.getElementById('contractInfo').innerHTML = '';
  document.getElementById('walletInfo').innerHTML = '';
  document.getElementById('pentestResults').innerHTML = 'No tests run yet.';
}

function logConnection(walletAddress, contractAddress) {
  const logData = `${walletAddress},${contractAddress},${new Date().toISOString()}\n`;
  const logFile = new Blob([logData], { type: 'text/csv' });
  const logLink = document.createElement('a');
  logLink.href = URL.createObjectURL(logFile);
  logLink.download = 'connections.csv';
  logLink.click();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('decompileBtn').addEventListener('click', decompile);
  document.getElementById('clearBtn').addEventListener('click', clearFields);
  document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
  document.getElementById('getContractBytecode').addEventListener('click', async () => {
    const contractAddressInput = document.getElementById('contractAddress');
    const address = contractAddressInput.value.trim();
    if (!address) {
      alert("Please enter a contract address.");
      return;
    }
    const bytecode = await getContractBytecode(address);
    if (bytecode) {
      document.getElementById('bytecode').value = bytecode;
    } else {
      alert("Could not retrieve bytecode for the provided address.");
    }
  });
});


