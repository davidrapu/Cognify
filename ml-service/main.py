import joblib
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "cognify_model.pkl"))
app = FastAPI()

# "reaction_score","game_score","accuracy","stroop_error_rate","stroop_accuracy","go_nogo_accuracy","go_nogo_error_rate","memory_score","attention_score","problem_solving_score"
class GameData(BaseModel):
    reaction_score: float
    game_score: float
    accuracy: float
    stroop_error_rate: float
    stroop_accuracy: float
    go_nogo_accuracy: float
    go_nogo_error_rate: float
    memory_score: float
    attention_score: float
    problem_solving_score: float
    quiz_score: float
@app.post("/predict")
def predict_cognitive_score(data: GameData):
    try:
        features = np.array([[data.reaction_score, data.game_score, data.accuracy, data.stroop_error_rate, data.stroop_accuracy, data.go_nogo_accuracy, data.go_nogo_error_rate, data.memory_score, data.attention_score, data.problem_solving_score, data.quiz_score]])

        predicted_score = int(model.predict(features)[0])

        label_map = {0: 'Low', 1: 'Moderate', 2: 'High'}

        return {"predicted_cognitive_level": label_map.get(predicted_score, 'Unknown'), "predicted_score_value": predicted_score}
    
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))