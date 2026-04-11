/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[id="login-email"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[id="login-email"]').type('test@email.com');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[id="login-email"]').type('wrong@email.com');
    cy.get('input[id="login-password"]').type('wrongpassword');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[id="login-email"]').type('punur@gmail.com');
    cy.get('input[id="login-password"]').type('punurs'); // testing cred only yaaa :D
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', () => {
      throw new Error('Unexpected alert on successful login');
    });

    cy.get('button').contains(/^Login$/).should('not.exist');
    cy.get('h4').contains('Welcome to OurTalk').should('be.visible');
  });
});