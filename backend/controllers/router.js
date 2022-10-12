const router = require('express').Router();
const Model = require('../models/model');

router.get('/', (request, response) => {
  Model.find({}).then((models) => {
    response.json(models);
  });
});

router.get('/:id', (request, response, next) => {
  Model.findById(request.params.id)
    .then((model) => {
      if (model) {
        response.json(model);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.post('/', (request, response, next) => {
  const body = request.body;

  const model = new Model({});

  model
    .save()
    .then((savedModel) => {
      response.json(savedModel);
    })
    .catch((error) => next(error));
});

router.delete('/:id', (request, response, next) => {
  Model.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

router.put('/:id', (request, response, next) => {
  const body = request.body;

  const model = {};

  Model.findByIdAndUpdate(request.params.id, model, { new: true })
    .then((updatedModel) => {
      response.json(updatedModel);
    })
    .catch((error) => next(error));
});

module.exports = router;
