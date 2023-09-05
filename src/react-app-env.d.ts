/// <reference types="react-scripts" />
import type { SeedResponse } from './types/mock';

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare global {
  interface Window {
    Seed: SeedResponse;
  }
}
