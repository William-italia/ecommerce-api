import express from 'express';
const router = express.Router();

router.get('', get);
router.get('', get);
router.post('', create);
router.put('', update);
router.delete('', remove);

export default router;
