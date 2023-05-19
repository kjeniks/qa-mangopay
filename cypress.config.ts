import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  videoUploadOnPasses: false,
  video: true,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  blockHosts: [
    'static.hotjar.com',
    'google-analytics.com/',
    'sjs.bizographics.com/',
    'googleadservices.com/',
    'connect.facebook.net/',
    'stats.pusher.com',
    'js.intercomcdn.com',
    'stats.pusher.com',
  ],
  e2e: {
    baseUrl: 'https://maps.google.com',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
