<!-- ------------------------------
  Karot_2.0 - HomePageThird.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the third block of the home page.
------------------------------ -->

<script>
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "HomePageThird",
  components: {
    RecipeCard,
  },
  props: {
    id_user: Number,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      recipes: [], // Initialize as an empty array
    };
  },
  async beforeMount() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`http://localhost:3000/api/get-most-liked?userId=${this.id_user}`, options);
      const data = await response.json();
      this.recipes = data; // Store fetched recipes directly in the reactive variable
    } catch (error) {
      console.error("Error fetching most liked recipes:", error);
    }
  }
}
</script>

<template>
  <section class="orange" id="most-liked-recipes">
    <h1>Most liked recipes</h1>
    <div id="recipes">
      <!-- List of most liked recipes -->
      <div class="recipe-card" v-for="recipe in recipes" :key="recipe.ID_Recipe">
        <RecipeCard :recipe="recipe" :isLoggedIn="isLoggedIn" :id_user="id_user"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
#most-liked-recipes {
  padding: 3em 10em;
}

/* Style of the title of the block */
h1 {
  font-size: 3.2em !important;
  font-weight: 500;
  margin-bottom: 0.6em;
  color: white;
}

/* Disposition of the cards */
#recipes {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 1.8em;
}

.recipe-card {
  background-color: #2f4858;
  margin: 1em;
  border-radius: 0.4em;
}

/* Responsive design */
@media only screen and (max-width: 1750px) {
  #most-liked-recipes {
    padding: 3em 5em;
  }
}

@media only screen and (max-width: 1550px) {
  #recipes {
    flex-wrap: wrap;
    justify-content: center;
    gap: 3em;
  }
}

@media only screen and (max-width: 550px) {
  #most-liked-recipes {
    padding: 3em 1em;
  }

  #most-liked-recipes h1 {
    font-size: 2.5em !important;
    padding: 0 1em;
  }

  #recipes {
    gap: 1em;
  }
}
</style>
