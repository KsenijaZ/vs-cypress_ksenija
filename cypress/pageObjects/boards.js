import { constants } from "../fixtures/constants"

class Boards {

	// sidebar 

	get sidebarMenu() {
		return cy.get('aside')
	}

	get myOrgBtn() {
		return this.sidebarMenu.get('ul').find('li a').eq(0)
	}

	// all boards

	get allBoardsSection() {
		return cy.get('.vs-c-organization__section')
	}

	get addNewBoardBtn() {
		return this.allBoardsSection.find('.vs-c-organization-boards__item--add-new')
	}

	// form modal general layout

	get formModal() {
		return cy.get('.vs-c-modal')
	}

	get modalFooter() {
		return this.formModal.find('.dialog-footer')
	}

	get nextBtn() {
		return this.modalFooter.find('button').eq(-1)
	}

	get prevBtn() {
		return this.modalFooter.find('button').eq(-2)
	}

	get pagination() {
		return this.modalFooter.find('.vs-c-dot-pagination')
	}

	pageDot(i) {
		return this.pagination.find('li').eq(i)
	}

	// features modal

	get featuresModal() {
		return cy.get('.vs-c-modal__body')
	}

	get featuresOkBtn() {
		return this.featuresModal.find('.vs-c-btn')
	}

	//confirmation modal

	get confirmModal() {
		return cy.get('.vs-c-confirmation-modal')
	}

	get confirmBtnOk() {
		return this.confirmModal.find('button').eq(-1)
	}

	// modal page 01 - board title

	get organizationSelect() {
		return this.formModal.find('.vs-c-new-board-select')
	}

	get organizationSelectDropdown() {
		return cy.get('.el-select-dropdown').invoke('show')
	}

	get organizationSelectFirstItem() {
		return this.organizationSelectDropdown.find('.el-select-dropdown__item').first()
	}

	get boardTitleInput() {
		return this.formModal.find('input[name="name"]')
	}

	// modal page 02 - board type

	selectBoardTypeRadio(i) {
		return this.formModal.find('input[type="radio"]').eq(i).invoke("show")
	}

	// modal page 03 - board configuration

	selectConfigField(i) {
		return this.formModal.find('input[type="text"]').eq(i)
	}

	get configFieldSelectMenu() {
		return cy.get('.el-select-dropdown__list')
	}

	selectConfigFieldItem(index) {
		return this.configFieldSelectMenu.find('li').eq(1)
	}

	// modal page 04 - board logo

	get logoInputFile() {
		return this.formModal.find('input[type="file"]').invoke('show')
	}

	get uploadModalFooter() {
		return cy.get('.vs-c-modal__footer')
	}

	get uploadButton() {
		return this.uploadModalFooter.find('button').eq(-1)
	}

	// create additional board within same organization, 5 step

	addNewBoardWithTitle(title) {

		this.myOrgBtn.click()
		this.featuresOkBtn.click()
		this.addNewBoardBtn.click()
		this.organizationSelect.click()
		this.organizationSelectFirstItem.click()
		this.boardTitleInput.type(title)

		this.pageDot(0).should('have.class', 'active')
		this.nextBtn.click()

	}

	selectBoardType() {
		this.selectBoardTypeRadio(0).check({force: true})

		this.pageDot(1).should('have.class', 'active')
		this.nextBtn.click()
	}

	selectBoardConfiguration() {

		this.selectConfigField(0).click({force: true})
		this.selectConfigFieldItem(1).click({force: true})

		this.selectConfigField(1).click({force: true})
		this.selectConfigFieldItem(1).click({force: true})

		this.pageDot(2).should('have.class', 'active')
		this.nextBtn.click()

	}

	addBoardLogoFromUrl(logoUrl) {

		this.pageDot(3).should('have.class', 'active')
		this.logoInputFile.selectFile(logoUrl)
		this.uploadButton.click()
		this.nextBtn.click()

	}

	finishBoardCreation() {

		this.pageDot(4).should('have.class', 'active')
		this.nextBtn.click({force: true})
	}

	createNewBoard() {

		// step 01
		this.addNewBoardWithTitle(constants.randomTitle)

		// step 02
		this.selectBoardType()

		// step 03
		this.selectBoardConfiguration()

		// step 04
		this.addBoardLogoFromUrl(constants.imgUrl)

		// step 05
		this.finishBoardCreation()

	}

	// delete board

	get projectMenu() {
		return cy.get('.vs-l-project__menu')
	}

	get boardConfig() {
		return this.projectMenu.find('[data-cy="board-configuration"]')
	}

	get boardsSettingsPage() {
		return cy.get('.vs-c-settings-board')
	}

	get deleteBtn() {
		return this.boardsSettingsPage.find('.vs-c-btn--warning')
	}

	deleteBoard() {
		this.boardConfig.click()
		this.deleteBtn.should('exist')
        this.deleteBtn.click()
		this.confirmBtnOk.click()
	}

}
export const boards = new Boards()