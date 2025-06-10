import pandas as pd

# Read the processed CSV file
df = pd.read_csv('processed_working_results_10_06_2025.csv')

# Convert the DataFrame to an Excel file
df.to_excel('processed_working_results_10_06_2025.xlsx', index=False, engine='openpyxl')

print("CSV file has been converted and saved as 'processed_working_results_10_06_2025.xlsx'.")
