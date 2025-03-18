from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel
from typing import List

# Load ML Model & Data
with open("travel_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("travel_feature_vectors.pkl", "rb") as f:
    feature_vectors_travel = pickle.load(f)

df_travel = pd.read_csv("processed_travel_data.csv")

# Budget mapping
budget_map = {'Normal': 100, 'Moderate': 500, 'Expensive': 1000}

# FastAPI instance
app = FastAPI()

# Enable CORS for React Native to connect with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class RecommendationRequest(BaseModel):
    activities: List[str]
    travelers_type: str
    travel_date: str
    budget_category: str

@app.post("/recommend/")
def recommend_destinations(request: RecommendationRequest):
    budget = budget_map.get(request.budget_category, 500)

    # Filter destinations based on budget
    filtered_df = df_travel[df_travel['Budget'] <= budget]
    if filtered_df.empty:
        return {"message": "No destinations match your preferences"}

    # Create a string of user preferences and transform it into a vector
    user_preferences = f"{' '.join(request.activities)} {request.travelers_type} {request.travel_date}"
    user_vector = vectorizer.transform([user_preferences])

    # Find destinations with similarity scores
    filtered_indices = filtered_df.index
    similarity_scores = cosine_similarity(user_vector, feature_vectors_travel[filtered_indices])

    # Sort by similarity and pick top 3 recommendations
    sorted_indices = similarity_scores[0].argsort()[::-1][:3]
    recommended_destinations = filtered_df.iloc[sorted_indices]

    # Return destinations with accommodations
    return recommended_destinations[['Destination', 'Category', 'Budget', 'Duration', 'Accommodations']].to_dict(orient="records")

