describe('API Basket Testing', function () {
  const BASE_URL = 'http://localhost:8080/basket'
  const BASKET_ID = 1

  before(() => {
    cy.request('POST', 'http://localhost:8080/categories', {
      "name": "Clothing",
      "description": "",
    }).should((response) => {
      expect(response.status).to.eq(201)
      expect(response).to.have.property('headers')
    })

    cy.request('POST', 'http://localhost:8080/products', {
      "name": "T-shirt",
      "description": "It's M Blue",
      "price": 32.14,
      "categoryId": 1
    })

    cy.request('POST', 'http://localhost:8080/products', {
      "name": "Trousers",
      "description": "",
      "price": 123,
      "categoryId": 1
    })
  })


  it('Should add items to the basket', () => {
    cy.request('PUT', `${BASE_URL}/${BASKET_ID}/1`).should((response) => {
      expect(response.status).to.eq(202)
      expect(response).to.have.property('headers')
      expect(response.body).to.have.length(0)
    })

    cy.request('PUT', `${BASE_URL}/${BASKET_ID}/2`).should((response) => {
      expect(response.status).to.eq(202)
      expect(response).to.have.property('headers')
      expect(response.body).to.have.length(0)
    })
  })

  it('Should not add item with invalid id', () => {
    cy.request({method: 'PUT', url: `${BASE_URL}/${BASKET_ID}/sbdkjfuosdfuhsdof`, failOnStatusCode: false}).should((response) => {
      expect(response.status).to.eq(400)
      expect(response).to.have.property('headers')
    })
  })

  it('Should remove item from the basket', () => {
    cy.request('DELETE', `${BASE_URL}/${BASKET_ID}/2`).should((response) => {
      expect(response.status).to.eq(202)
      expect(response).to.have.property('headers')
      expect(response.body).to.have.length(0)
    })
  })

  it('Should not remove item from the basket with invalid id', () => {
    cy.request({method: 'DELETE', url: `${BASE_URL}/${BASKET_ID}/2123123123`, failOnStatusCode: false}).should((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Should GET all products from the basket', () => {
    cy.request('GET', `${BASE_URL}/${BASKET_ID}`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response.body.products).to.be.a('array')
      expect(response.body.products).to.have.length(1)
    })
  })

  it('Should pay for the basket (and clear the basket)', () => {
    cy.request('POST', `${BASE_URL}/${BASKET_ID}/pay`).should((response) => {
      expect(response.status).to.eq(202)
      expect(response).to.have.property('headers')
    })

    cy.request('GET', `${BASE_URL}/${BASKET_ID}`).should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response.body.products).to.be.a('array')
      expect(response.body.products).to.have.length(0)
    })
  })

  it('Should not pay for the basket', () => {
    cy.request({method: 'POST', url: `${BASE_URL}/123123123123/pay`, failOnStatusCode: false}).should((response) => {
      expect(response.status).to.eq(400)
    })
  })
})