const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage } = require('canvas');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// ? express setup
const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ?Directory to store generated images
const IMAGES_DIR = path.join(__dirname, 'og-images');

// ?Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR);
}

app.post('/generate-og-image', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imageFile = req.file;

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // ?Set background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, 1200, 630);

  // Draw title
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText(title, 50, 100, 1100);

  // ? Draw content snippet
  ctx.font = '24px Arial';
  ctx.fillText(content.substring(0, 100) + '...', 50, 160, 1100);

  // ? Draw image if provided
  if (imageFile) {
    const image = await loadImage(`data:image/png;base64,${imageFile.buffer.toString('base64')}`);
    ctx.drawImage(image, 50, 200, 1100, 380);
  }

  // ? Add branding
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#4b5563';
  ctx.fillText('#reactdeveloper', 1050, 610);

  // ? Generate unique filename
  const filename = `${Date.now()}.png`;
  const outputPath = path.join(IMAGES_DIR, filename);

  // ? Save the image to disk
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  // ? Respond with the image URL
  res.json({ ogImageUrl: `http://localhost:3001/og-images/${filename}` });
});

// ? Serve static files from the og-images directory
app.use('/og-images', express.static(IMAGES_DIR));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
