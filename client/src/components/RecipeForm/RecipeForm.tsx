import { useRecipeFormLogic } from "../../services/RecipeFormLogic";
import "./RecipeForm.css";

export default function RecipeForm() {
  const {
    handleChange,
    handleImageChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    handleSubmit,
    formData,
    categories,
  } = useRecipeFormLogic();

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Create recipe :</h2>

      <label className="label-recipe-form">
        Title :
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image :
        <input
          lang="en"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>

      <label className="label-recipe-form">
        Description :
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label className="label-recipe-form">
        Category :
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <article className="ingredients-section">
        <label htmlFor="ingredients">Ingrédients :</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="ingredient-item">
            <input
              id={`ingredient-name-${index}`}
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              required
            />
            <input
              id={`ingredient-quantity-${index}`}
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              required
            />
            <button
              className="delete-button-recipe-form"
              type="button"
              onClick={() => removeIngredient(index)}
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="add-button-recipe-form"
        >
          Add ingredient
        </button>
      </article>

      <label>
        Instructions :
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="submit-button-recipe-form">
        Add recipe
      </button>
    </form>
  );
}
