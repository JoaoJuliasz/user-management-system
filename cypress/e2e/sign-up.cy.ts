describe("sign-up", () => {
  beforeEach(() => {
    cy.visit("/"); 
  });

  it("successfully loads", () => {
    cy.contains("Sign Up");
  });

  it("shows toast when passwords do not match", () => {
    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("pistol");
    cy.get('[data-testid="new-password-input"]').type("pistol2");

    cy.contains("Sign up").click();

    cy.contains("Passwords are different").should("be.visible");
  });

  it("successfully signs up user", () => {
    cy.intercept("POST", "/api/register", {
      statusCode: 200,
      body: { token: "fake-jwt-token", id: 1 },
    }).as("signUpRequest");

    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("pistol");
    cy.get('[data-testid="new-password-input"]').type("pistol");

    cy.contains("Sign up").click();

    cy.wait("@signUpRequest");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
