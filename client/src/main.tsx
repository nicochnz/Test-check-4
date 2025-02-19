import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import CarouselRecipes from "./components/CarouselRecipes/CarouselRecipes";
import FavoritesPage from "./components/FavoriteComponent";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/Home";
import RecipePage from "./components/Recipe/RecipeComponent";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import Login from "./pages/AuthPage";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
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
      {
        path: "/recipe/:id",
        element: (
          <>
            <Header />
            <RecipePage />
          </>
        ),
      },
      {
        path: "/favorites",
        element: (
          <>
            <Header /> <FavoritesPage />
          </>
        ),
      },
      {
        path: "/recipeform",
        element: token ? (
          <>
            <Header /> <RecipeForm />
          </>
        ) : (
          <Navigate to="/login" replace />
        ),
      },
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
