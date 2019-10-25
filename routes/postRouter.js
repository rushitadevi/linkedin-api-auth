
const express = require('express');
const bodyParser = require('body-parser');
const atob = require("atob");
const multer = require("multer")
var path = require('path')
const fs = require("fs-extra")

const multerCfg = multer({})

const postRouter = express.Router();

postRouter.use(bodyParser.json());

var Posts = require("../models/posts");

postRouter.route('/')
    .get((req, res, next) => {
        Posts.find({}).then(app => {
            res.json(app);
        })
    })
    .post(async (req, res, next) => {
        req.body.username = req.user;
        try {
            var newpost = await Posts.create(req.body);
            res.send(newpost)
        }
        catch (err) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        }
    })

postRouter.route('/:postId')
    .get(async (req, res) => {
        Posts.findById(req.params.postId).then(app => {
            res.json(app);
        })
    })
    .put(async (req, res) => {
        var post = await Posts.findById(req.params.postId);
        delete req.body.username;
        console.log(req.user, post.username)
        if (post.username == req.user.username) {
            Posts.findByIdAndUpdate(
                req.params.postId,
                { $set: req.body },
                { new: true }
            )
                .then(
                    app => {
                        res.json(app);
                    },
                    err => next(err)
                )
                .catch(err => next(err));
        }
        else {
            res.status(401)
            res.send("Unauthorized")
        }
    })
    .post(multerCfg.single("post"), async (req, res) => {
        var post = await Posts.findById(req.params.postId);

        if (post.username == req.user) {
            var filename = req.params.postId + path.extname(req.file.originalname)
            console.log(filename)
            console.log(path.join(__dirname, "../posts", filename))
            await fs.writeFile(path.join(__dirname, "../posts", filename), req.file.buffer)
            var fullUrl = req.protocol + '://' + req.get('host') + "/posts/" + filename;
            var resp = await Posts.findOneAndUpdate(
                req.params.postId,
                { image: fullUrl },
                { new: true }
            )
            res.json(resp);
        }
        else {
            res.status(401)
            res.send("Unauthorized")
        }
    })
    .delete(async (req, res) => {
        var post = await Posts.findById(req.params.postId);
        if (post.username == req.user) {
            Posts.findByIdAndRemove(
                req.params.postId
            )
                .then(
                    app => {
                        res.send("Removed");
                    },
                    err => next(err)
                )
                .catch(err => next(err));
        }
        else {
            res.status(401)
            res.send("Unauthorized")
        }
    })


module.exports = postRouter;