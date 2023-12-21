import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.moodly',
  appName: 'moodly',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};


export default config;
