const API_KEY = "efe310734dd848469b5de555f325b914";
const recipeListEl = document.getElementById("recipe-list")

function displayRecipes(recipes){
    recipeListEl.innerHTML = "";
    let num = 1
    recipes.forEach((recipe)=>{
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
        recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";
        recipeHeadEl = document.createElement("h2");
        recipeHeadEl.innerHTML = recipe.title;
        recipeParagraphEl = document.createElement("p")
        recipelinkEl = document.createElement("a");
        recipelinkEl.href = recipe.sourceUrl;
        recipelinkEl.innerHTML = "View Recipe"

        let ingre = []
        recipe.extendedIngredients.forEach((ingredient) => {
            ingre.push(ingredient.original)
            
        })

        ingredientText = ingre.join(", ");
        
        recipeParagraphEl.innerHTML = `<strong>Ingredients:</strong> ${ingredientText}`

        // This is is how he did his own.
        // recipeParagraphEl.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredients) => ingredient.original).join(", ")}`



        recipeItemEl.appendChild(recipeImageEl);
        recipeListEl.appendChild(recipeItemEl)
        recipeItemEl.appendChild(recipeHeadEl);
        recipeItemEl.appendChild(recipeParagraphEl);
        recipeItemEl.appendChild(recipelinkEl);


        num++
    })
}

async function getrecipes() {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)

    const data = await response.json()

    console.log(data);

    return data.recipes;
}

async function init() {
    const recipes = await getrecipes();
    displayRecipes(recipes)
}

init()