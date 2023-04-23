const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello hi auth!")
})
router.get('/register', (req, res) => {
    res.send("Hello hi auth!")
})

module.exports = router