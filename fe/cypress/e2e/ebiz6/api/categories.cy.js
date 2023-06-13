describe('API Categories Testing', function () {
  const BASE_URL = 'http://localhost:8080/categories'

  it('Get All Categories (No categories)', () => {
    cy.request('GET', BASE_URL).should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response.body).to.be.a('array')
      expect(response.body).to.have.length(0)
    })
  });

  it('Add Category', () => {
    cy.request('POST', BASE_URL, {
      "name": "Clothing",
      "description": "Stuff you wear",
    }).should((response) => {
      expect(response.status).to.eq(201)
      expect(response).to.have.property('headers')
    })
  });

  it('Get All Categories', () => {
    cy.request('GET', BASE_URL).should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('body')
      expect(response.body).to.be.a('array')
      expect(response.body).to.have.length(1)
    })
  });

  it('Get Category By its ID', () => {
    cy.request('GET', `${BASE_URL}/1`).should((response) => {
      const expectedBody = {
        "name": "Clothing",
        "description": "Stuff you wear",
      }
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name').and.eq(expectedBody.name)
      expect(response.body).to.have.property('description').and.eq(expectedBody.description)
      expect(response).to.have.property('headers')
    })
  });

  it('Create / Update Category', () => {
    const requestBody = {
      "name": "Electronics",
      "description": "For the A&R fanboys",
    }

    const updatedRequestBody = {
      ...requestBody,
      "description": "For the IT fanboys",
    }

    cy.request('PUT', `${BASE_URL}/2`, requestBody)
      .should((response) => {
        expect(response.status).to.eq(202)
        expect(response).to.have.property('headers')
      })

    cy.request('PUT', `${BASE_URL}/2`, updatedRequestBody)
      .should((response) => {
        expect(response.status).to.eq(202)
        expect(response).to.have.property('headers')
      })
  });


  it('Delete Category', () => {
    cy.request('DELETE', `${BASE_URL}/1`)
      .should((response) => {
        expect(response.status).to.eq(202)
      })

    cy.request({method: 'DELETE', url: `${BASE_URL}/1`, failOnStatusCode: false})
      .should((response) => {
        expect(response.status).to.eq(404)
      })
  });
});