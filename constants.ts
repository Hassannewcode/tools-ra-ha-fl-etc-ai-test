
import type { Device } from './types';
import {
  RaspberryPiIcon,
  RaspberryPiZeroIcon,
  Esp32Icon,
  Esp8266Icon,
  DigisparkIcon,
  FlipperZeroIcon,
  NethunterIcon,
  HackRfIcon,
  Esp32CamIcon,
  ZigbeeIcon
} from './components/icons';

export const DEVICES: Device[] = [
  {
    id: 'rpi',
    name: 'Raspberry Pi',
    description: 'A versatile single-board computer for countless projects.',
    Icon: RaspberryPiIcon,
  },
  {
    id: 'rpizero',
    name: 'Raspberry Pi Zero',
    description: 'A tiny, ultra-low-cost version of the Raspberry Pi.',
    Icon: RaspberryPiZeroIcon,
  },
  {
    id: 'flipperzero',
    name: 'Flipper Zero',
    description: 'A multi-tool device for pentesters and hardware geeks.',
    Icon: FlipperZeroIcon,
  },
  {
    id: 'esp32',
    name: 'ESP32',
    description: 'A powerful microcontroller with integrated Wi-Fi and Bluetooth.',
    Icon: Esp32Icon,
  },
  {
    id: 'esp8266',
    name: 'ESP8266',
    description: 'A low-cost Wi-Fi microchip with full TCP/IP stack.',
    Icon: Esp8266Icon,
  },
  {
    id: 'digispark',
    name: 'Digispark',
    description: 'A tiny, Arduino-compatible USB development board.',
    Icon: DigisparkIcon,
  },
  {
    id: 'nethunter',
    name: 'Nethunter',
    description: 'A mobile penetration testing platform for Android.',
    Icon: NethunterIcon,
  },
  {
    id: 'hackrf',
    name: 'HackRF One',
    description: 'A Software Defined Radio peripheral for RF experimentation.',
    Icon: HackRfIcon,
  },
  {
    id: 'esp32cam',
    name: 'ESP32 Cam',
    description: 'A small module based on ESP32 with an integrated camera.',
    Icon: Esp32CamIcon,
  },
  {
    id: 'zigbee',
    name: 'Zigbee Sniffer',
    description: 'A USB dongle for analyzing and interacting with Zigbee networks.',
    Icon: ZigbeeIcon,
  },
];
