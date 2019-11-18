/* eslint-disable no-undef */
const PageObject = {
  $fuckts: '[data-cy-fuckt]',
  $createFucktInput: '[data-cy-create-fuckt]',
  $saveMapBtn: '[data-cy-save-map]',
  $saveMapNameInput: '[data-cy-save-map-name-input]',
  $sidebarMenuItem: '[data-cy-sidebar-menu-item]',
  $sidebarMenuItemNewMap: '[data-cy-sidebar-menu-item-new-map]',
  $sidebarMenuItemRemoveMap: '[data-cy-sidebar-menu-item-remove-map]',
  $fucktTextarea: '[data-cy-fuckt-textarea]',
  addFuckt(text) {
    cy.get(this.$createFucktInput)
      .type('new fuckt')
      .type('{enter}');
  },
  saveMap(text) {
    cy.get(this.$saveMapBtn).click({ force: true });

    cy.get(this.$saveMapNameInput).type('new map');

    cy.get('.ant-modal-footer .ant-btn-primary').click({ force: true });
  },
  goToNew() {
    cy.get(this.$sidebarMenuItemNewMap).click({ force: true });
  },
  removeMap() {
    cy.get(this.$sidebarMenuItemRemoveMap).click({ force: true });

    cy.get('.ant-btn-danger').click({ force: true });
  },
};

export default PageObject;
