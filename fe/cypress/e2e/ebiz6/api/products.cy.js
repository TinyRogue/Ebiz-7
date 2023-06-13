describe('API Products Testing', () => {
  it('Get All Products (No products)', () => {
    cy.request('GET', 'http://localhost:8080/products').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers')
      })
  });

  it('Add Product', () => {
    cy.request('POST', 'http://localhost:8080/products', {
      "name": "T-shirt",
      "description": "It's M Blue",
      "price": 32.14,
      "categoryId": 1
    }).should((response) => {
        expect(response.status).to.eq(201)
        expect(response).to.have.property('headers')
      })
  });

  it('Get All Products', () => {
    cy.request('GET', 'http://localhost:8080/products').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('body')
      expect(response.body).to.be.a('array')
      expect(response.body).to.have.length(1)
    })
  });

  it('Get Product By its ID', () => {
    cy.request('GET', 'http://localhost:8080/products/1').should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name').and.eq('T-shirt')
        expect(response.body).to.have.property('description').and.eq("It's M Blue")
        expect(response.body).to.have.property('price').and.approximately(32.14, 0.001)
        expect(response.body).to.have.property('categoryId').and.eq(1)
        expect(response).to.have.property('headers')
      })
  });

  it('Create / Update Product', () => {
    const requestBody = {
      "name": "Trousers",
      "description": "These are jeans",
      "price": 33.00,
      "categoryId": 1
    }

    const updatedRequestBody = {
      "description": "These are corduroy",
      "price": 20.05,
    }

    cy.request('PUT', 'http://localhost:8080/products/2', requestBody)
      .should((response) => {
        expect(response.status).to.eq(202)
        expect(response).to.have.property('headers')
      })

    cy.request('PUT', 'http://localhost:8080/products/2', updatedRequestBody)
      .should((response) => {
        expect(response.status).to.eq(202)
        expect(response).to.have.property('headers')
      })
  });


  it('Delete Product', () => {
    cy.request('DELETE', 'http://localhost:8080/products/1')
      .should((response) => {
        expect(response.status).to.eq(202)
      })

    cy.request({method: 'DELETE', url: 'http://localhost:8080/products/1', failOnStatusCode: false})
      .should((response) => {
        expect(response.status).to.eq(404)
      })
  });
});