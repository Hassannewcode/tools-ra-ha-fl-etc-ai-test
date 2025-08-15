
import type React from 'react';

export interface Device {
  id: string;
  name: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface CodeExample {
  language: string;
  code: string;
}

export interface DeviceDetails {
  description: string;
  useCases: string[];
  codeExample: CodeExample;
}
