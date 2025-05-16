describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("user_token", "fake-token");
        win.localStorage.setItem("user_id", "1");
      },
    });

    cy.fixture("mockUserList").then((mockUserList) => {
      cy.intercept("GET", "/api/users?page=1", {
        statusCode: 200,
        body: mockUserList,
      }).as("getUsers");
    });
  });

  it("should show user table", () => {
    cy.wait("@getUsers");

    cy.contains("Michael Lawson").should("be.visible");
    cy.contains("lindsay.ferguson@reqres.in").should("be.visible");
  });

  it("should create a new user", () => {
    cy.wait("@getUsers");

    cy.get('[data-testid="create-user"]').click();
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="first_name-input"]').type("jane");
    cy.get('[data-testid="last_name-input"]').type("doe");

    cy.get('[data-testid="user-trigger"]').click();

    cy.contains("jane doe").should("be.visible");
  });

  it("should update user", () => {
    cy.wait("@getUsers");

    cy.get('[data-testid="edit-user-0"]').click();
    cy.get('[data-testid="first_name-input"]').clear().type("jane");
    cy.get('[data-testid="last_name-input"]').clear().type("doe");
    cy.get('[data-testid="user-trigger"]').click();
    cy.contains("jane doe").should("be.visible");
  });

  it("should remove user", () => {
    cy.wait("@getUsers");
    
    cy.contains("Michael Lawson");
    cy.get('[data-testid="remove-user-0"]').click();
    cy.contains("Yes").click();
    cy.contains("Michael Lawson").should("not.exist");
  });
});
