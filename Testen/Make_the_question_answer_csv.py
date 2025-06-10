import requests
import csv
from datetime import datetime
import os
import re


def send_to_endpoint(string, endpoint_url, api_key):
    try:
        # Prepare JSON payload with empty chat_history and the input string as question
        payload = {
            "chat_history": [],
            "question": string
        }
        # Set headers with Authorization using f-string
        headers = {
            "Authorization": f"Bearer {api_key}"
        }
        response = requests.post(endpoint_url, json=payload, headers=headers, timeout=25)
        response.raise_for_status()
        # Print raw response for debugging
        print(f"{string}': {response.text}")
        try:
            # Try to parse JSON and get 'answer' key
            answer = response.json().get("answer", response.text)
            # Clean the answer: replace newlines and multiple spaces with a single space
            cleaned_answer = re.sub(r'\s+', ' ', answer.strip())
            return cleaned_answer
        except ValueError:
            # If response is not JSON, return cleaned raw text
            cleaned_answer = re.sub(r'\s+', ' ', response.text.strip())
            return cleaned_answer
    except requests.RequestException as e:
        # Print error for debugging
        error_msg = f"Error for '{string}': {str(e)}"
        print(error_msg)
        return error_msg


def get_unique_output_file(base_output_file):
    # Split base filename into name and extension
    base_name = base_output_file.rsplit('.csv', 1)[0]
    extension = '.csv'
    counter = 1
    output_file = base_output_file

    # Check if file exists and append number if necessary
    while os.path.exists(output_file):
        output_file = f"{base_name}_{counter}{extension}"
        counter += 1

    return output_file


def process_file(input_file, output_file, endpoint_url, api_key):
    # Read the input text file
    with open(input_file, 'r', encoding='utf-8') as f:
        # Split the content by comma and strip whitespace
        strings = [s.strip() for s in f.read().split(',')]

    # Prepare CSV output
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, quoting=csv.QUOTE_MINIMAL)
        # Write headers
        writer.writerow(['question', 'answer'])

        # Process each string
        for string in strings:
            if string:  # Skip empty strings
                response = send_to_endpoint(string, endpoint_url, api_key)
                writer.writerow([string, response])


if __name__ == "__main__":
    input_file = "Test_vragen.txt"  # Replace with your input file path
    current_date = datetime.now().strftime("%Y-%m-%d")
    output_dir = "Test_Results"  # Output directory
    os.makedirs(output_dir, exist_ok=True)  # Create directory if it doesn't exist
    # Base output file with current date
    base_output_file = os.path.join(output_dir, f"Test_results_{current_date}.csv")
    output_file = get_unique_output_file(base_output_file)  # Get unique filename
    endpoint_url = "https://socaile-kaartbot-met-data.westeurope.inference.ml.azure.com/score"  # Endpoint URL
    api_key = ""  # Replace with your actual API key
    process_file(input_file, output_file, endpoint_url, api_key)
