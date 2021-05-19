const supertest = require("supertest");
const app = require('../server');
const fs = require('fs');
const {
  DATA_FILE,
  MESSAGE_NOT_PURCHASED,
  MESSAGE_NOT_ENOUGH_MONEY,
} = require('../constants');

describe('Product Purchage Endpoints', () => {
  let sampleProduct = {}
  beforeAll(() => {
    const res = fs.readFileSync(DATA_FILE);
    let data = JSON.parse(res);
    sampleProduct = data.products[0]
  })

  it('should not refund if not purchased', async () => {
    await supertest(app).post(`/api/products/${1}`)
      .send(sampleProduct)
      .expect(200)
      .then((response) => {
        expect(response.body.message).not.toBe(MESSAGE_NOT_PURCHASED);
        expect(response.body.returnedMoney).toBe(0);
      });
  })

  it('should get list of products', async () => {
    await supertest(app).get("/api/products")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.products)).toBeTruthy();
        expect(response.body.products.length).toEqual(3);
      });
  })

  it('should not get product if coin amount is not sent', async () => {
    await supertest(app).get(`/api/products/${1}`)
      .expect(200)
      .then((response) => {
        expect(response.body.product).toBeNull();
        expect(response.body.message).toEqual(MESSAGE_NOT_ENOUGH_MONEY);
      });
  })

  it('should get Pepsi if coin amount is equal to price', async () => {
    await supertest(app).get(`/api/products/${1}?coin= ${25}`)
      .expect(200)
      .then((response) => {
        expect(response.body.product).not.toBe(null);
        expect(response.body.product.name).toBe('Pepsi');
        expect(response.body.product.id).toBe(1);
        expect(response.body.returnedMoney).toBe(0);
      });
  })

  it('should  get Coke if coin amount is equal to price', async () => {
    await supertest(app).get(`/api/products/${2}?coin= ${20}`)
      .expect(200)
      .then((response) => {
        expect(response.body.product).not.toBe(null)
        expect(response.body.product.name).toBe('Coke');
        expect(response.body.product.id).toBe(2);
        expect(response.body.returnedMoney).toBe(0);
      });
  })

  it('should get Dew if coin amount is equal to price', async () => {
    await supertest(app).get(`/api/products/${3}?coin= ${30}`)
      .expect(200)
      .then((response) => {
        expect(response.body.product).not.toBe(null);
        expect(response.body.product.name).toBe('Dew');
        expect(response.body.product.id).toBe(3);
        expect(response.body.returnedMoney).toBe(0);
      });
  })

  it('should get money back if coin amount is more that product price', async () => {
    await supertest(app).get(`/api/products/${3}?coin= ${50}`)
      .expect(200)
      .then((response) => {
        expect(response.body.product).not.toBe(null);
        expect(response.body.product.name).toBe('Dew');
        expect(response.body.product.id).toBe(3);
        expect(response.body.returnedMoney).toBe(20);
      });
  })

  afterEach(() => {
    const res = fs.readFileSync(DATA_FILE);
    let data = JSON.parse(res);
    let products = data.products.map((item, i) => ({ ...item, 'stock': 10 }))
    data.products = products
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  });
})

