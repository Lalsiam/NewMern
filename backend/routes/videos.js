const express = require("express");

const { addVideo, addView, getByTag, getVideo, random, search, sub, trend } = require ( "../controllers/video");
const  verifyToken  = require ( "../verifyToken");

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

 module.exports = router;
