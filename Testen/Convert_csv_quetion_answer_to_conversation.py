import csv


def format_conversation_to_csv(input_file, output_file):
    # Read the input CSV file
    with open(input_file, 'r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        conversations = []

        # Process each row
        for row in reader:
            question = row['question'].strip()
            answer = row['answer'].strip()

            # Skip empty rows or rows with missing data
            if question and answer:
                # Format the conversation as a single string
                conversation = f"User: {question} Assistant: {answer}"
                conversations.append({'conversation': conversation})

    # Write to output CSV file
    with open(output_file, 'w', encoding='utf-8', newline='') as csv_file:
        fieldnames = ['conversation']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        for conversation in conversations:
            writer.writerow(conversation)


# Example usage
if __name__ == "__main__":
    input_csv = "Test_Results\\Test_results_2025-06-25_2.csv"
    output_csv = "conversation_output.csv"
    format_conversation_to_csv(input_csv, output_csv)
