import { el } from './elements'
import toast from '../../components/toast'
class SignupPage {

    constructor(){
        this.toast = toast
    }

    go() {
        cy.visit('/signup')
    }


    form(user) {
// localizadores:
// ^ = começa com
// $ = termina com
// * = contém a palavra no meio
        cy.get(el.nome).type(user.nome)
        cy.get(el.email).type(user.email)
        cy.get(el.senha).type(user.senha)
    }

    submit() {
        cy.contains(el.botaoCadastrar).click()
    }

    alertHaveText(expectedText){
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }

}

export default new SignupPage()