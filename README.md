### 1.1 Data Science Workflow

The objective is to understand how geopolitical and economic events impact Brent oil prices over time using change point detection.

**Steps in the Workflow:**

1. **Data Collection**  
   - Brent oil prices (daily): 1987–2022  
   - List of historical geopolitical and economic events

2. **Data Cleaning and Preprocessing**  
   - Handle date formats, missing values  
   - Compute log returns  
   - Parse and format event dates

3. **Exploratory Data Analysis (EDA)**  
   - Plot price and return series  
   - Rolling volatility and statistical tests (ADF)  

4. **Bayesian Change Point Modeling (PyMC3)**  
   - Detect structural changes in oil prices  
   - Associate change points with key events

5. **Impact Quantification**  
   - Compare average prices before/after each change point  
   - Link with real-world context  

6. **Dashboard and Communication**  
   - Build an interactive dashboard using FastAPI + React  
   - Share insights with investors, policymakers, analysts