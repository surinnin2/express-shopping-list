process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../app')
let items = require('../fakeDb')

let testItem1 = { name: 'testItem1', price: 1.0 }

beforeEach(function() {
    items.push(testItem1)
})

afterEach(function() {
    items.length = 0
})

// GET returns an array with test item in it 
describe('GET /items', function() {
    test('Gets a list of items', async function() {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)

        expect(res.body).toEqual([testItem1])
    })
})

// POST returns json message of 'added' with item
describe('POST /items', function() {
    test('Creates a new item', async function() {
        const res = await request(app).post('/items').send({
            name: 'testItem2',
            price: 2.0
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({
            'added': {name: 'testItem2', price: 2.0} 
        })
    })
})


// GET with /:name returns single item of corresponding name
// If name not found, returns 404
describe('Get /items/:name', function() {
    test('Gets a single item given name', async function() {
        const res = await request(app).get(`/items/${testItem1.name}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(testItem1)
    })

    test('Responds with 404 if item not found', async function() {
        const res = await request(app).get('/items/na')
        expect(res.statusCode).toBe(404)
    })
})

// PATCH with /:name returns confirmation of changed item of corresponding name
// If name not found, returns 404
describe('PATCH /items/:name', function() {
    test('Updates a single item given name', async function() {
        const res = await request(app).patch(`/items/${testItem1.name}`).send({
            name: 'changed',
            price: 1.1
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            'updated': {name: 'changed', price: 1.1}
        })
    })

    test('Responds with 404 if name not found', async function() {
        const res = await request(app).patch('/items/na')
        expect(res.statusCode).toBe(404)
    })
})

describe('Delete /items/:name', function() {
    test('Deletes a single item given name', async function() {
        const res = await request(app).delete(`/items/${testItem1.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            message: 'Deleted'
        })
    })

    test('Responds with 404 if name not found', async function() {
        const res = await request(app).delete('/items/na')
        expect(res.statusCode).toBe(404)
    })
})