class LoginPage {

	get formModal() {
		return cy.get('.vs-c-modal__body')
	}

	get modalTitle() {
		return this.formModal.find('h1')
	}

	get emailInput() {
		return this.formModal.find('[type="email"]')
	}

	get passwordInput() {
		return this.formModal.find('[type="password"]')
	}

	get signUpBtn() {
		return this.formModal.find('[data-cy="login-sign-up-link"]')
	}

	get forgotPass() {
		return this.formModal.find('[data-cy="login-forgot-password-link"]')
	}

	get submitBtn() {
		return this.formModal.find('[type="submit"]')
	}

	login(email, password) {
		this.emailInput.type(email)
		this.passwordInput.type(password)
		this.submitBtn.click()
	}

}

export const loginPage = new LoginPage()