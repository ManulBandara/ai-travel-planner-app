from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask app
app = Flask(__name__)

# Load datasets
df_travel = pd.read_csv('travel_dataset.csv')
df_accommodation = pd.read_csv('accommodation_dataset.csv')

# Clean column names
df_travel.columns = df_travel.columns.str.strip()
df_accommodation.columns = df_accommodation.columns.str.strip()

# Combine relevant features into a single string for travel destinations
df_travel['Combined_Features'] = (
    df_travel['Category'].fillna('') + ' ' +
    df_travel['Activities'].fillna('') + ' ' +
    df_travel['Duration'].fillna('')
)

# Convert travel destination text to feature vectors using TF-IDF
vectorizer = TfidfVectorizer()
feature_vectors_travel = vectorizer.fit_transform(df_travel['Combined_Features'])

# API endpoint for recommendation
@app.route('/recommend', methods=['POST'])
def recommend():
    # Get JSON data from mobile app input
    data = request.get_json()
    num_travelers = data['num_travelers']
    budget = data['budget']
    activities = data['activities']
    duration = data['duration']
    
    # Function to recommend destinations
    def recommend_based_on_preferences(num_travelers, budget, activities, duration, num_recommendations=3):
        filtered_df = df_travel[(df_travel['Budget'] <= budget)]
        
        if filtered_df.empty:
            return {"message": "No destinations match your preferences. Try adjusting your inputs."}

        user_preferences = f"{activities} {duration}"
        user_vector = vectorizer.transform([user_preferences])
        
        filtered_indices = filtered_df.index
        similarity_scores = cosine_similarity(user_vector, feature_vectors_travel[filtered_indices])
        
        sorted_indices = similarity_scores[0].argsort()[::-1][:num_recommendations]
        recommended_destinations = filtered_df.iloc[sorted_indices]
        
        recommended_destinations_unique = recommended_destinations.drop_duplicates(subset=['Destination'])
        
        recommendations = []
        for _, row in recommended_destinations_unique.iterrows():
            recommendations.append({
                "destination": row['Destination'],
                "category": row['Category'],
                "budget": row['Budget'],
                "duration": row['Duration']
            })
        
        return {"recommendations": recommendations}

    # Call the recommendation function
    result = recommend_based_on_preferences(num_travelers, budget, activities, duration)
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
