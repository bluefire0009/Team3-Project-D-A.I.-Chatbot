import pandas as pd
import re

# Read the CSV file
df = pd.read_csv('working_results_10_06_2025.csv')

# Function to extract the Final Outcome from the modelResponse


def extract_final_outcome(text):
    match = re.search(r'\*\*Final Outcome:\*\* (Pass|Fail)', str(text))
    return match.group(1) if match else ''


# Apply the function to extract the Final Outcome and place it in the 'rating' column
df['rating'] = df['modelResponse'].apply(extract_final_outcome)

# Drop the 'compiledInput' and 'expectedResponse' columns
df = df.drop(columns=['compiledInput', 'expectedResponse'])

# Save the modified DataFrame to a new CSV file
df.to_csv('processed_working_results_10_06_2025.csv', index=False)

print("CSV file has been processed and saved as 'processed_working_results_10_06_2025.csv'.")
