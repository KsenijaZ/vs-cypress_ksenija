import { constants } from "../fixtures/constants";

class Boards {
  // sidebar
  get sidebarMenu() {
    return cy.get("aside");
  }

  get myOrgBtn() {
    return this.sidebarMenu.get("ul").find("li a").eq(0);
  }

  // all boards
  get allBoardsSection() {
    return cy.get(".vs-c-organization__section");
  }

  get addNewBoardBtn() {
    return this.allBoardsSection.find(
      ".vs-c-organization-boards__item--add-new"
    );
  }

  // form modal
  get formModal() {
    return cy.get(".vs-c-modal");
  }

  get modalFooter() {
    return this.formModal.find(".dialog-footer");
  }

  get nextBtn() {
    return this.modalFooter.find("button").eq(-1);
  }

  get prevBtn() {
    return this.modalFooter.find("button").eq(-2);
  }

  get pagination() {
    return this.modalFooter.find(".vs-c-dot-pagination");
  }

  pageDot(i) {
    return this.pagination.find("li").eq(i);
  }

  // single board page
  get projectMenu() {
    return cy.get(".vs-l-project__menu");
  }

  get boardConfig() {
    return this.projectMenu.find('[data-cy="board-configuration"]');
  }

  get boardsSettingsPage() {
    return cy.get(".vs-c-settings-board");
  }

  get deleteBtn() {
    return this.boardsSettingsPage.find(".vs-c-btn--warning");
  }

  // features modal
  get featuresModal() {
    return cy.get(".vs-c-modal__body");
  }

  get featuresOkBtn() {
    return this.featuresModal.find(".vs-c-btn");
  }

  //confirmation modal
  get confirmModal() {
    return cy.get(".vs-c-confirmation-modal");
  }

  get confirmBtnOk() {
    return this.confirmModal.find("button").eq(-1);
  }

  // create board
  get boardTitleInput() {
    return this.formModal.find('input[name="name"]');
  }

  // upload logo
  get logoInputFile() {
    return this.formModal.find('input[type="file"]');
  }

  get uploadModalFooter() {
    return cy.get(".vs-c-modal__footer");
  }

  get uploadButton() {
    return this.uploadModalFooter.find("button").eq(-1);
  }

  // board type
  selectBoardTypeRadio(i) {
    return this.formModal.find(".el-form-item").eq(i).find(".vs-c-radio-check");
  }

  // select menu
  get menuSelect() {
    return this.formModal.find(".vs-c-new-board-select");
  }

  get menuSelectDropdown() {
    return cy.get(".el-select-dropdown");
  }

  get menuSelectFirstItem() {
    return this.menuSelectDropdown.find(".el-select-dropdown__item").first();
  }

  // import configuration
  get orgSelect() {
    return this.formModal
      .find(".el-form-item")
      .eq(0)
      .find(".vs-c-new-board-select");
  }

  get orgSelectDropdown() {
    return cy.get(".el-select-dropdown__list").eq(0);
  }

  get teamSelect() {
    return this.formModal
      .find(".el-form-item")
      .eq(1)
      .find(".vs-c-new-board-select");
  }

  get teamSelectDropdown() {
    return cy.get(".el-select-dropdown__list").eq(1);
  }

  addNewBoardWithTitle(title) {
    this.myOrgBtn.click();
    this.featuresOkBtn.click();
    this.addNewBoardBtn.click();
    this.menuSelect.click();
    this.menuSelectDropdown.should("be.visible");
    this.menuSelectFirstItem.click();
    this.boardTitleInput.type(title);
    this.pageDot(0).should("have.class", "active");
    this.pageDot(1).should("not.have.class", "active");
    this.pageDot(2).should("not.have.class", "active");
    this.pageDot(3).should("not.have.class", "active");
    this.pageDot(4).should("not.have.class", "active");
    this.nextBtn.click();
  }

  selectBoardType() {
    this.selectBoardTypeRadio(0).click();
    this.pageDot(1).should("have.class", "active");
    this.pageDot(2).should("not.have.class", "active");
    this.pageDot(3).should("not.have.class", "active");
    this.pageDot(4).should("not.have.class", "active");
    this.nextBtn.click();
  }

  selectBoardConfiguration() {
    this.orgSelect.click();
    this.menuSelectDropdown.should("be.visible");
    this.menuSelectFirstItem.click({ force: true });
    this.teamSelect.click();
    this.menuSelectDropdown.should("be.visible");
    this.menuSelectFirstItem.click({ force: true });
    this.pageDot(2).should("have.class", "active");
    this.nextBtn.click();
  }

  addBoardLogoFromUrl(logoUrl) {
    this.pageDot(3).should("have.class", "active");
    this.logoInputFile.invoke("show").selectFile(logoUrl);
    this.uploadButton.click();
    this.nextBtn.click();
  }

  finishBoardCreation() {
    this.pageDot(4).should("have.class", "active");
    this.nextBtn.click();
  }

  createNewBoard() {
    this.addNewBoardWithTitle(constants.randomTitle);
    this.selectBoardType();
    this.selectBoardConfiguration();
    this.addBoardLogoFromUrl(constants.imgUrl);
    this.finishBoardCreation();
  }

  deleteBoard() {
    this.boardConfig.click();
    this.deleteBtn.should("exist");
    this.deleteBtn.click();
    this.confirmBtnOk.click();
  }
}
export const boards = new Boards();
