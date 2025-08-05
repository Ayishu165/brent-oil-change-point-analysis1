from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import arviz as az

app = Flask(__name__)
CORS(app)

# Load data
brent_df = pd.read_csv('./data/BrentOilPrices_Cleaned.csv')
event_df = pd.read_csv('./data/OilPriceEvents_cleaned.csv')
trace = az.from_netcdf('./model/brent_oil_change_point_trace.nc')

# Preprocess date
brent_df['Date'] = pd.to_datetime(brent_df['Date'])
event_df['StartDate'] = pd.to_datetime(event_df['StartDate'])

@app.route("/api/prices", methods=["GET"])
def get_prices():
    start = request.args.get('start')
    end = request.args.get('end')

    df = brent_df.copy()
    if start and end:
        df = df[(df['Date'] >= start) & (df['Date'] <= end)]

    return jsonify(df.to_dict(orient="records"))

@app.route("/api/events", methods=["GET"])
def get_events():
    return jsonify(event_df.to_dict(orient="records"))

@app.route("/api/model_trace", methods=["GET"])
def get_model_summary():
    summary = az.summary(trace).reset_index().to_dict(orient="records")
    return jsonify(summary)
@app.route("/")
def home():
    return "<h2>✅ Flask API is running! Visit /api/prices or /api/events</h2>"
if __name__ == "__main__":
    app.run(debug=True)
