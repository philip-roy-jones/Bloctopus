import { Router } from 'express';
const router = Router();

router.post('/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Test route' });
});

export default router;
