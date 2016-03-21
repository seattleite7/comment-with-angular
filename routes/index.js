var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/comments', function(req, res, next) {
     Comment.find(function(err, comments){ 
        if(err){ return next(err); } 
        res.json(comments); 
     });
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
      if (err) { return next(err);}

      res.json(comment);
   });

});

router.param('comment', function(req, res, next, id) {
   console.log("in param");
   var query = Comment.findById(id);
   query.exec(function(err, comment) {
       if (err) return next(err);
       if (!comment) { return next(new Error("can't find comment")); }
       req.comment = comment;
       console.log("found a comment");
       console.log(req.comment);
       return next();
      
   });
});

router.get('/comments/:comment', function (req,res) {
  res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res) {
   console.log(req.comment);
   req.comment.upvotes += 1;
   req.comment.save();
   res.json(req.comment);

});

router.put('/comments/:comment/downvote', function(req, res) {
   console.log(req.comment);
   req.comment.upvotes -= 1;
   req.comment.save();
   res.json(req.comment);

});


module.exports = router;
