import os from "os";
import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  allureCypress(on, config, {
    resultsDir: process.env.ALLURE_DIR+"allure-results",
    videoOnFailOnly: true,
    environmentInfo: {
      "Plataforma": os.platform(),
      "Release da Plataforma": os.release(),
      "Versão":  os.version(),
      "Versão do Node.js": process.version
    }     
  });
  return config;
 }

export default defineConfig({
  e2e: {
    setupNodeEvents,
    defaultCommandTimeout: 40000,
    chromeWebSecurity: false,
    baseUrl: "https://www.google.com/",
    specPattern: "cypress/Scenarios/**/*.{js,jsx,ts,tsx,feature}",
    viewportWidth: 1920,
    viewportHeight: 1080,
    testIsolation: false,
  },
});   