const storage = require('../image/index');

const uploadImageMiddleware = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      const file = req.file;
      const bucketName = 'divinecake';
      const fileName = file.originalname;
  
      const gcsFile = storage.bucket(bucketName).file(fileName);
  
      const stream = gcsFile.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      stream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
      });
  
      stream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        req.imageUrl = imageUrl; // Store the image URL in the request object
        next(); // Pass control to the next middleware or route handler
      });
  
      stream.end(file.buffer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  module.exports = uploadImageMiddleware