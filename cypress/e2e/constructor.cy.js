/* eslint-disable cypress/no-unnecessary-waiting */

describe("app works correctly with routes", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open constructor page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should contain title", () => {
    cy.get("h2").contains("Булки").should("exist");
  });

  it("should open ingredient in modal windo", () => {
    cy.get("li").contains("Краторная булка").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("p").contains("Краторная булка").should("exist");
  });

  it("should close ingredient modal window", () => {
    cy.get(".modal_close").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should close modal window by overlay click", () => {
    cy.get("li").contains("Краторная булка").click();
    cy.get("#overlay").click(-10, -10, { force: true });
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should drag and drop ingredients to the constructor", () => {
    cy.contains("Краторная булка N-200i").trigger("dragstart");
    cy.get("#constructor").trigger("drop");
    cy.get("#constructor").contains("Краторная булка N-200i");
    cy.contains("Филе Люминесцентного тетраодонтимформа").trigger("dragstart");
    cy.get("#constructor").trigger("drop");
    cy.get("#constructor").contains("Филе Люминесцентного тетраодонтимформа");
  });

  it("should show create order button", () => {
    cy.get("button").contains("Оформить заказ").should("exist");
  });

  it("should create order", () => {
    cy.get("button").contains("Оформить заказ").click();
    cy.log("Login to the application");
    cy.get("form input[type=email]").type("yeivanova@yandex.ru");
    cy.get("form input[type=password]").type("111111");
    cy.contains("Войти").click();
    cy.wait(500).then(() => {
      cy.contains("Оформить заказ").click();
      cy.wait(17000).then(() => {
        cy.get("#orderNumber").should("exist");
        cy.get(".modal_close").click();
      });
    });
  });
});
