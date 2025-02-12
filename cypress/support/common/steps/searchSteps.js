import { When } from '@badeball/cypress-cucumber-preprocessor';

When('eu pesquisar por {string}', (s) => {
  cy.get('textarea[title="Pesquisar"]').type(s);
})
