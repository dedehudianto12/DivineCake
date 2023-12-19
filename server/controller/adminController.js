"use strict"

const {Admin} = require("../models")
const token = require("../helper/token")

class AdminController{
    static create(req, res, next){
        const body = {
            nickname: req.body.nickname,
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
        }
        Admin.create(body)
            .then(admin=>{
                const admin_token = token.generate_token(admin)
                res.status(201).json({
                    access_token: admin_token
                })
            })
            .catch(next)
        
    }

    static upload(req, res, next){
        try {
            if (!req.file) {
              return res.status(400).json({ message: 'No file uploaded.' });
            }
        
            const file = bucket.file(req.file.originalname);
        
            const stream = file.createWriteStream({
              metadata: {
                contentType: req.file.mimetype,
              },
            });
        
            stream.on('error', (err) => {
              next(err);
            });
        
            stream.on('finish', async () => {
              // Set the file to be publicly readable
              await file.makePublic();
        
              // Get the public URL of the uploaded file
              const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        
              // Save the imageUrl in your database
        
              res.json({ message: 'File uploaded successfully.', imageUrl });
            });
        
            stream.end(req.file.buffer);
          } catch (err) {
            next(err);
          }
    }
}

module.exports = AdminController