describe("sign-up", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("successfully loads", () => {
    cy.contains("Login");
  });

  it("shows toast with server error", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: { error: "Invalid credentials" },
    }).as("signInRequest");

    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("wrongpassword");

    cy.contains("Sign in").click();

    cy.wait("@signInRequest");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("successfully signs up user", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "fake-jwt-token" },
    }).as("signInRequest");

    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("1234");

    cy.contains("Sign in").click();

    cy.wait("@signInRequest");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
