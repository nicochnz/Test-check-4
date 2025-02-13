import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import CarouselRecipes from "./components/CarouselRecipes/CarouselRecipes";
import FavoritesPage from "./components/FavoriteComponent";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/Home";
import RecipePage from "./components/Recipe/RecipeComponent";
import RecipeForm from "./components/RecipeForm/RecipeForm";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Header />
            <CarouselRecipes />
            <HomePage />
          </>
        ),
      },
      { path: "/recipe/:id", element: <RecipePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/recipeform", element: <RecipeForm /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
