const Together = require("together-ai");
const uploadBase64ToImage = require("../utils");
const imageModel = require("../models/imageModel");

const generateImage = async (req, res) => {
  try {
    const apiKey = process.env.TOGETHER_API_KEY;
    const together = new Together({ apiKey });
    const { prompt } = req.body;
    // write a logic to generate the image through flux and together API

    //write the logic to generate image;
    let response = await together.images.create({
      prompt,
      model: "black-forest-labs/FLUX.1-dev",
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      response_format: "b64_json",
    });

    const base64Image = response?.data[0]?.b64_json;

    const imageUrl = await uploadBase64ToImage(base64Image);

    // create image document
    const newImage = new imageModel({ prompt, imageUrl });
    await newImage.save();
    return res.status(200).json({
      success: true,
      data: newImage,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalImages = await imageModel.countDocuments();

    const images = await imageModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const data = {
      images,
      totalPages: Math.ceil(totalImages / limit),
      currentPage: page,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  generateImage,
  getImages,
};
