const express = require("express");
const router = express.Router();


const Boeken = require("../models/boek")

router.get("/", async (req, res) => {
    try {
        const boeken = await Boeken.find();
    res.json(boeken);
    } catch (error) {
        res.json({message: error});
    }
    
});

router.get("/auteurs", (req, res) => {
    res.send("Hier zijn wat auteurs:");
});

router.get("/:boekId", async(req, res) => {
    try {
        const boeken = await Boeken.findById({_id: req.params.boekId});
        res.json(boeken);
    } catch (error) {
        res.json({message: error});
    }
})

router.post("/", async (req, res) => {
    const boek = new Boeken(req.body);
    try {
        const savedBoek = await boek.save();
        res.json(savedBoek);
    } catch (error) {
        res.json({message: error});
    }
})
router.delete("/:boekId", async (req, res) => {
    try {
        const removedBoek = await Boeken.remove({_id: req.params.boekId});
        res.json(removedBoek);

    } catch (error) {
        res.json({message: error});
    }
})
router.patch("/:boekId", async(req, res) =>{
    try {
        const boek = await Boeken.findByIdAndUpdate({_id: req.params.boekId}, req.body, {new: true}, null);
        res.json(boek);
    } catch (error) {
        res.json({message: error});
    }
})

router.put("/:boekId", async(req, res) => {
    try {
        var boekToEdit = await Boeken.findById({_id: req.params.boekId});
        boekToEdit.titel = req.params.titel;
        boekToEdit.descriptie = req.params.descriptie;
        boekToEdit.auteur = req.params.auteur;
        boekToEdit = await boekToEdit.update();
        res.json(boekToEdit);
        
    } catch (error) {
        res.json({message: error});
    }
})

module.exports = router;