# %%
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Getting the data
df = pd.read_csv('data.csv')

# Verifying the data does side one type of label
low_count = len(df[df['risk_level'] == 'Low'])
moderate_count = len(df[df['risk_level'] == 'Moderate'])
high_count = len(df[df['risk_level'] == 'High'])



# Splitting the data into labels and features
X = df[['reaction_score', 'game_score', 'accuracy', 'stroop_error_rate',
        'stroop_accuracy', 'go_nogo_accuracy', 'go_nogo_error_rate',
        'memory_score', 'attention_score', 'problem_solving_score', 'quiz_score']].values
y = df['risk_level']


# Setting the labels to 0 - 2 (integers)
label_map = {'Low': 0, 'Moderate': 1, 'High': 2}
y = y.map(label_map)


# Splitting the data into the 80% training and 20% testing format
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42 )

# Creating the model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)


# Exporting the model
joblib.dump(model, 'cognify_model.pkl')
print('Model saved')