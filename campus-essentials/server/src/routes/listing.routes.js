import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Listing from '../models/Listing.js';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
const upload = multer({ storage: multer.memoryStorage() });
const r = Router();

r.get('/', async (req, res) => {
  const { q, category, min, max } = req.query;
  const filter = { campus: 'IIT Kanpur' };
  if (category) filter.category = category;
  if (min || max) filter.price = { ...(min && { $gte: +min }), ...(max && { $lte: +max }) };
  const mongoQuery = q ? { $text: { $search: q }, ...filter } : filter;
  const items = await Listing.find(mongoQuery).sort({ createdAt: -1 }).limit(50).populate('seller','name hostel');
  res.json(items);
});

r.get('/mine', requireAuth, async (req, res) => {
  const items = await Listing.find({ seller: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
});

r.get('/:id', async (req, res) => {
  const item = await Listing.findById(req.params.id).populate('seller','name hostel phone');
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

r.post('/', requireAuth, upload.array('images', 5), async (req, res) => {
  let urls = [];
  const hasCloudinary = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;
  if (hasCloudinary && (req.files||[]).length) {
    const uploads = await Promise.all((req.files||[]).map(f =>
      cloudinary.uploader.upload(`data:${f.mimetype};base64,${f.buffer.toString('base64')}`, { folder:'campus-essentials' })
    ));
    urls = uploads.map(u => u.secure_url);
  }

  const listing = await Listing.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    condition: req.body.condition,
    images: urls,
    seller: req.user.id
  });
  res.status(201).json(listing);
});

r.patch('/:id/mark-sold', requireAuth, async (req, res) => {
  const l = await Listing.findById(req.params.id);
  if (!l || String(l.seller) !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
  l.isSold = true; await l.save();
  res.json({ ok: true });
});

export default r;
