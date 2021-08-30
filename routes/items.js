const express = require('express')
const router = new express.Router()
const items = require('../fakeDb.js')
const CustomError = require("../customError")

router.get('', function(req, res, next) {
    try {
        return res.json(items)
    } catch(err){
        return next(err)
    }
})
    
router.post('', function(req, res, next) {
    try {
        const newItem = { 
        name: req.body.name,
        price: req.body.price
        }
        items.push(newItem)
        res.status(201).json({ 'added': newItem })
    } catch (err) {
        return next(err)
    }
})

router.get('/:name', function(req, res, next) {
    try {
        const item = items.find(item => item.name == req.params.name)
        if (item === undefined) {
            throw new CustomError('Item not found', 404)
        }
        return res.json(item)
    } catch (err) {
        return next(err)
    }
})

router.patch('/:name', function(req, res, next) {
    try {
        const item = items.find(item => item.name === req.params.name)
        if (item === undefined) {
            throw new CustomError('Item not found', 404)
        }
        item.name = req.body.name
        item.price = req.body.price
        res.json({'updated': item})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:name', function(req, res, next) {
    try {
        const item = items.findIndex(item => item.name === req.params.name)
        if (item === -1) {
            throw new CustomError('Item not found', 404)
        }
        items.splice(item, 1)
        res.json({message: 'Deleted'})
    } catch (err) {
        return next(err)
    }
})


module.exports = router;