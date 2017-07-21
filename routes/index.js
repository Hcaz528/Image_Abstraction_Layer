const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
// const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', linkController.getHomepage);
router.get('/new/*' , linkController.getNew);
router.get('/[1-9]+', linkController.getShortURL);
router.get('*', linkController.getHomepage);

// router.get('/stores', catchErrors(storeController.getStores));

// router.post('/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore)
// );

/*
  API
*/

// router.get('/api/v1/search', catchErrors(storeController.searchStores)); // Version 1
// router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));
// router.post('/api/v1/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
