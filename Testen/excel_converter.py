import pandas as pd

# Read the processed CSV file
File_name = 'processed_working_results_10_06_2025'
df = pd.read_csv(f'{File_name}.csv')

# Convert the DataFrame to an Excel file
df.to_excel(f'{File_name}.xlsx', index=False, engine='openpyxl')

print("CSV file has been converted and saved as 'processed_working_results_10_06_2025.xlsx'.")
