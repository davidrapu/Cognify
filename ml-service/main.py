import joblib
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "cognify_model.pkl"))
app = FastAPI()

class GameData(BaseModel):
    avg_reaction_time: float
    reaction_time_std: float
    memory_score: float
    accuracy: float
    stroop_error_rate: float
    go_nogo_accuracy: float

@app.post("/predict")
def predict_cognitive_score(data: GameData):
    try:
        features = np.array([[data.avg_reaction_time, data.reaction_time_std, data.memory_score,
                              data.accuracy, data.stroop_error_rate, data.go_nogo_accuracy]])
        predicted_score = model.predict(features)[0]
        label_map = {0: 'Low', 1: 'Moderate', 2: 'High'}
        return {"predicted_cognitive_score": label_map.get(predicted_score, 'Unknown'), "predicted_score_value": predicted_score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))