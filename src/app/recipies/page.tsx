'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
}

const fetchRecipes = async (search: string): Promise<Meal[]> => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const data = await res.json();
  return data.meals || [];
};

export default function RecipePage() {
  const [search, setSearch] = useState('');
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals', search],
    queryFn: () => fetchRecipes(search),
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <input
        className="w-full max-w-md border p-2 rounded mb-6"
        placeholder="Search recipes by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Meal</th>
              <th className="border p-2">Main Ingredients</th>
              <th className="border p-2">Instructions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.idMeal}>
                <td className="border p-2 font-medium">{meal.strMeal}</td>
                <td className="border p-2">
                  {meal.strIngredient1}, {meal.strIngredient2}, {meal.strIngredient3}
                </td>
                <td className="border p-2 max-w-[600px] truncate">{meal.strInstructions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
