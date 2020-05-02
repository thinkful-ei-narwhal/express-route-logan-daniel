const express = require('express');
const { v4 : uuid} = require('uuid');
const logger = require('./logger');
const { bookmarks }= require('./store');

const bookmarksRouter = express.Router();


bookmarksRouter
  .route('/')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post((req, res, next) => { // add parser
    const id = uuid();
    const {title, url, description, rating } = req.body;

    if (!title) {
      logger.error('Title is required');
      return res.status(400).json({error: 'Title is required'});
    }

    if (!url || !url.startsWith('http')){
      logger.error('A proper URL is required');
      return res.status(400).json({error: 'A proper URL is required'});
    }

    if (!description) {
      logger.error('description is required');
      return res.status(400).json({error: 'description is required'});
    }
   
    if (!rating || !Number.isInteger(Number(rating))){
      logger.error('A rating as an integer is required');
      return res.status(400).json({error: 'A rating as an integer is required'});
    }
    
    const newBookmark = {id, title, url, description, rating};

    bookmarks.push(newBookmark);
    res.status(201).json(newBookmark);
  });

bookmarksRouter
  .route('/:id')
  .get((req, res, next) => {
    const id = req.params.id;
    if(id.length < 16){
      return next(new Error());
    }
    let flag = true;
    bookmarks.forEach(bookmark => {
      if(bookmark.id === id){
        flag = false;
      }
    });
    if (flag){
      logger.error('ID not found');
      return res.status(400);
    } 
    const item = bookmarks.filter(bookmark => bookmark.id === id);
    res.json(item);
    
  })
  .delete((req, res, next) => {
    const item = bookmarks.filter(bookmark => bookmark.id === req.params.id);
    bookmarks.splice(item, 1);
    res.status(204).end();
  });

module.exports = bookmarksRouter;