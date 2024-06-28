/**
 * - Login specification
 *   - Ensures the login page is displayed correctly
 *   - Verifies that an alert is shown when the email field is empty
 *   - Verifies that an alert is shown when the email is not valid
 *   - Verifies that an alert is shown when the password field is empty
 *   - Verifies that an alert is shown when both email and password are incorrect
 *   - Verifies that the homepage is displayed when both email and password are correct
 */
describe('Login specification', () => {
  // Ensure there is no duplication of cy.visit code by using beforeEach
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the login page correctly', () => {
    // Verify the elements that should appear on the login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/) // Ensure the button name matches the string
      .should('be.visible');
  });

  it('should display an alert when the email is empty', () => {
    // Click the login button without filling in the email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Verify the window.alert to display the message from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display an alert when the email is not valid', () => {
    // Fill in an invalid email
    cy.get('input[placeholder="Email"]').type('testemail');

    // Click the login button with an invalid email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Verify the window.alert to display the message from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display an alert when the password is empty', () => {
    // Fill in the email
    cy.get('input[placeholder="Email"]').type('testemail@example.com');

    // Click the login button without filling in the password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Verify the window.alert to display the message from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display an alert when both email and password are wrong', () => {
    // Fill in the email
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');

    // Fill in an incorrect password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // Click the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // Verify the window.alert to display the message from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display the homepage when both email and password are correct', () => {
    // Fill in the email
    cy.get('input[placeholder="Email"]').type('yaah@gmail.com');

    // Fill in the password
    cy.get('input[placeholder="Password"]').type('123456');

    // Click the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('.homepage__action')
      .contains('Add New Thread')
      .should('be.visible');
  });
});
