import type { Request, Response } from "express";
import CategoryRepository from "./categoryRepository";

// Méthode pour récupérer toutes les catégories
const browse = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryRepository.getAll(); // Appelle la méthode qui récupère toutes les catégories
    res.json(categories); // Retourne les catégories sous forme de JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Nom de catégorie requis" });
      return;
    }

    const categoryId = await CategoryRepository.create(name);
    res.status(201).json({ id: categoryId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default { browse, add };
