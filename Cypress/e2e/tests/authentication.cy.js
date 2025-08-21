const {registerPageSelectors} = require('../../fixtures/locators/registerPageSelectors');
const {loginPageSelectors} = require('../../fixtures/locators/loginPageSelectors');
const baseUrl = 'http://localhost:3000';
const randomNumber = Math.floor(Math.random() * 1000);

function navigateToRegister() {
    cy.visit(baseUrl + '/auth/register');
}

describe('Register New User', () => {
    it('successfully register a new user', () => {
        navigateToRegister();
        
        cy.get(registerPageSelectors.username).type('testuser' + randomNumber);
        cy.get(registerPageSelectors.password).type('testingpassword123');
        cy.get(registerPageSelectors.register_submit).click();
        cy.url().should('eq', baseUrl + '/auth/login');
    })

    it('Attempt unsuccessful registration with short password', () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        cy.visit(baseUrl + '/auth/register');
        cy.get(registerPageSelectors.username).type('testuser' + randomNumber);
        cy.get(registerPageSelectors.password).type('test');
        cy.get(registerPageSelectors.register_submit).click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Password must be at least 8 characters long');
    })
    })

    it('Attempt unsuccessful registeration with no number in password', () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        cy.visit(baseUrl + '/auth/register');
        cy.get(registerPageSelectors.username).type('testuser' + randomNumber);
        cy.get(registerPageSelectors.password).type('testingpassword');
        cy.get(registerPageSelectors.register_submit).click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Password must contain at least one number');
    });
    });

    it('Attempt unsuccessful registration with existing user', () => {
        cy.visit(baseUrl + '/auth/register');
        cy.get(registerPageSelectors.username).type('will');
        cy.get(registerPageSelectors.password).type('testingpassword123');
        cy.get(registerPageSelectors.register_submit).click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('User already exists');
        });
    });
});

describe('Login functionality', () => {
    it('Successfully login with valid credentials', () => {
        cy.visit(baseUrl + '/auth/login');
        cy.get(loginPageSelectors.username).type('testuser');
        cy.get(loginPageSelectors.password).type('testpassword123!');
        cy.get(loginPageSelectors.login_submit).click();
        cy.url().should('eq', baseUrl + '/game/newUserSelectionPage');
    })
    it('Unsuccessful login with invalid credentials', () => {
        cy.visit(baseUrl + '/auth/login');
        cy.get(loginPageSelectors.username).type('testuser');
        cy.get(loginPageSelectors.password).type('badpass');
        cy.get(loginPageSelectors.login_submit).click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Password Incorrect');
    });
    })
    it('Unsuccessful login with user who does not exist', () => {
        cy.visit(baseUrl + '/auth/login');
        cy.get(loginPageSelectors.username).type('baduser');
        cy.get(loginPageSelectors.password).type('testpassword123!');
        cy.get(loginPageSelectors.login_submit).click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('User not found');
    });
    });
});