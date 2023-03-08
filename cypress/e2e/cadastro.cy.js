
import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'

describe('cadastro', () => {
    const user = {
        nome: 'Pedro QA',
        email: 'pedrohgoncalves2001@gmail.com',
        senha: 'P1234.'
    }
    context('quando o usuário é novato e preenche os dados corretamente', () => {
        it('então deve conseguir se cadastrar com sucesso', () => {
            cy.visit('/signup')

            signupPage.go()
            signupPage.form(user)

            cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser')

            signupPage.submit()
            cy.wait('@postUser')
            signup.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando o usuário tenta se cadastrar com um email que já existe', () => {
        it('então deve exibir que o email já está cadastrado', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signup.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', () => {
        const user = {
            nome: 'Betano',
            email: 'betano.gmail.com',
            senha: 'P1234.'
        }
        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', () => {
        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(() => {
            signupPage.go()
        })
        passwords.forEach((p) => {
            it('não deve cadastrar com a senha: ' + p, () => {
                const user = {
                    nome: 'bet365', email: 'bet365@gmail.com', senha: p
                }
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })


    })

    context('quando o usuário não preenche nenhum dos campos', ()=>{
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(()=>{
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach((alert)=>{
            it('deve exibir '+ alert.toLowerCase(), ()=>{
                signupPage.alertHaveText(alert)
            })

        })
    })
})
