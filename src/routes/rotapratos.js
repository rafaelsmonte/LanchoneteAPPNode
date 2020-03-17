const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).send(
      {
        Nome: 'XSalada',
        Preço: 10
      }
    )
});
router.get('/:id', (req,res,next)=>{
      const id = req.params.id;
      res.status(200).send({
        'i': id,
        'a': "www"
      })
});
module.exports = router;
