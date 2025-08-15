
import React, { useState } from 'react';
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

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg mt-4 relative">
      <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm text-gray-400 font-sans">{language}</span>
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-xs transition-colors duration-200"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto">
        <code className="font-mono">{code}</code>
      </pre>
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
                 <CodeBlock language={deviceDetails.codeExample.language} code={deviceDetails.codeExample.code} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
