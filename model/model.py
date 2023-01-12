import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

df = pd.read_csv("./Cleaned_Indian_Food_Dataset.csv", nrows=5000)
vectorizer = TfidfVectorizer()
tfidf_recipe = vectorizer.fit_transform(df["ingredients_parsed"].values.astype("U"))

class Model:

    def recommend(self,strOfIngredients):
        ing_v = vectorizer.transform([strOfIngredients])
        similarity_list = cosine_similarity(ing_v, tfidf_recipe)
        sorted_indexes = np.argsort(similarity_list[0])[::-1]
        return df['TranslatedRecipeName'].iloc[sorted_indexes].values[0:50]        
