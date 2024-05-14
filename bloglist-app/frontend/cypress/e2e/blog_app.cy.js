describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    cy.createUser({
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    });
  });

  it('Login form is shown', () => {
    cy.get('form');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('salainen');
      cy.get('#login').click();
      cy.contains('Superuser has logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login').click();
      cy.should('not.contain', 'Superuser has logged in');
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'salainen' });
    });

    it('A blog can be created', () => {
      cy.contains('create blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('www.testurl.com');
      cy.get('#create').click();

      cy.contains('test title');
    });

    describe('When there is a blog in the database', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'www.testurl.com',
        });
      });

      it('A blog can be liked', () => {
        cy.contains('view').click();
        cy.get('#likes').click();
        cy.contains('likes 1');
      });

      it('A blog can be deleted', () => {
        cy.contains('view').click();
        cy.get('#remove').click();

        cy.contains('.blog').should('not.exist');
      });

      it('remove button is only visible for blogs that user created', () => {
        cy.createUser({
          username: 'dboy',
          name: 'Danny',
          password: '12345',
        });

        cy.login({ username: 'dboy', password: '12345' });

        cy.contains('view').click();
        cy.get('#remove').should('not.be.visible');
      });
    });

    describe('when there are multiple blogs in the database', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test title 1',
          author: 'test author 1',
          url: 'www.testurl1.com',
        });

        cy.createBlog({
          title: 'test title 2',
          author: 'test author 2',
          url: 'www.testurl2.com',
        });

        cy.createBlog({
          title: 'test title 3',
          author: 'test author 3',
          url: 'www.testurl3.com',
        });
      });

      it('blogs are ordered by most liked', () => {
        cy.get('.blog').eq(0).contains('view').click();
        cy.get('.blog').eq(1).contains('view').click();
        cy.get('.blog').eq(2).contains('view').click();

        cy.get('.blog').eq(1).contains('button', 'like').click();
        cy.get('.blog')
          .eq(2)
          .contains('button', 'like')
          .click()
          .wait(500)
          .click();

        cy.get('.blog').eq(0).should('contain', 'test title 2');
        cy.get('.blog').eq(2).should('contain', 'test title 1');
      });
    });
  });
});
