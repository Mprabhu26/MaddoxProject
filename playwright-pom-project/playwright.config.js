import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: 'html',

  use: {
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: true, 
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    cwd: path.join(__dirname, '../qa-homework-mirror'), // Correct relative path
    url: 'http://localhost:3000', // Change if needed
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
