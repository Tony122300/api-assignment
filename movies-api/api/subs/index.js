import express from 'express';
import Sub from './subModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all subs
router.get('/', async (req, res) => {
    const subs = await Sub.find();
    res.status(200).json(subs);
});

  // Register A sub
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass email and password.'});
      return next();
    }
    if (req.query.action === 'register') {
      await Sub.create(req.body);
      res.status(201).json({code: 201, msg: 'Successful created new sub.'});
    } 
  }));

     // Update a sub
     router.put('/:id', async (req, res) => {
        if (req.body._id) delete req.body._id;
        const result = await Sub.updateOne({
            _id: req.params.id,
        }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code:200, msg: 'Sub Updated Sucessfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update Sub' });
        }
    });

    // Delete a sub
router.delete('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Sub.deleteOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:404, msg: 'Sub Deleted Sucessfully' });
    } else {
        res.status(404).json({ code: 200, msg: 'Unable to Delete Sub' });
    }
  });
    
export default router;