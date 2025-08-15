import React, { useState, useEffect, useRef } from 'react';
import type { Device, DeviceDetails } from '../types';

interface DeviceDetailModalProps {
  device: Device;
  deviceDetails: DeviceDetails | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
  </div>
);

interface CodeBlockProps {
  language: string;
  code: string;
  simulatedOutput: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, simulatedOutput }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRun = () => {
    if (isExecuting) return;

    // Clear previous timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsExecuting(true);
    setHasExecuted(true);
    setOutput('');

    const prompt = `user@device:~$ `;
    const command = `run-simulation`;
    const commandToType = prompt + command;
    let commandIndex = 0;

    const typeCommand = () => {
      if (commandIndex < commandToType.length) {
        setOutput(prev => prev + commandToType.charAt(commandIndex));
        commandIndex++;
        // Slower, more deliberate typing for the command
        const delay = 60 + Math.random() * 60;
        timerRef.current = window.setTimeout(typeCommand, delay);
      } else {
        // "Pressing enter" - add newline and a short pause before output
        setOutput(prev => prev + '\n');
        timerRef.current = window.setTimeout(typeOutput, 500);
      }
    };

    const outputToType = simulatedOutput;
    let outputIndex = 0;

    const typeOutput = () => {
      if (outputIndex < outputToType.length) {
        setOutput(prev => prev + outputToType.charAt(outputIndex));
        outputIndex++;
        // Faster typing for the program's output
        const delay = 15 + Math.random() * 20;
        timerRef.current = window.setTimeout(typeOutput, delay);
      } else {
        // Finish by adding a newline and the next prompt
        setOutput(prev => prev + '\n' + prompt);
        setIsExecuting(false);
      }
    };

    typeCommand();
  };

  return (
    <div className="bg-gray-900 rounded-lg mt-4 relative">
      <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm text-gray-400 font-sans">{language}</span>
        <div className="flex items-center gap-2">
           <button
            onClick={handleRun}
            disabled={isExecuting}
            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md text-xs transition-colors duration-200 flex items-center gap-1.5 disabled:bg-green-800 disabled:cursor-not-allowed"
            aria-label={hasExecuted ? 'Run simulation again' : 'Simulate code execution'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>{hasExecuted ? 'Run Again' : 'Simulate'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-xs transition-colors duration-200"
            aria-label="Copy code"
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto">
        <code className="font-mono">{code}</code>
      </pre>
      {hasExecuted && (
        <div className="bg-black rounded-b-lg border-t border-gray-700">
            {/* Terminal Window Header */}
            <div className="flex items-center px-4 py-2 bg-gray-900 rounded-t-none">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-400 ml-4 font-sans tracking-wider uppercase">Terminal</p>
            </div>
            {/* Terminal Content */}
            <div className="p-4 pt-2 text-sm text-green-400 font-mono whitespace-pre-wrap overflow-x-auto min-h-[5rem]">
                <span>{output}</span>
                {/* Blinking Cursor */}
                <span className="animate-pulse bg-green-400 w-2 h-4 inline-block align-bottom"></span>
            </div>
        </div>
      )}
    </div>
  );
};


const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({ device, deviceDetails, isLoading, error, onClose }) => {
  const { name, Icon } = device;
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700 transform transition-all duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            <Icon className="h-10 w-10 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">{name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-3xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {!isLoading && !error && deviceDetails && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {deviceDetails.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Common Use Cases</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {deviceDetails.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
              <div>
                 <h3 className="text-lg font-semibold text-cyan-400">Code Example</h3>
                 <CodeBlock 
                    language={deviceDetails.codeExample.language} 
                    code={deviceDetails.codeExample.code}
                    simulatedOutput={deviceDetails.codeExample.simulatedOutput}
                 />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeviceDetailModal;