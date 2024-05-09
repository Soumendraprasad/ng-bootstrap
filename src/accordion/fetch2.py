import re

# Define the input string containing the test case results
output_text = ""
with open("output.txt", 'r') as f:
            lines = f.readlines()
            output_text = ''.join(lines)

# Define a regex pattern to match lines starting with "Executed" and ending before the next occurrence of "Executed" or "Error:"
pattern = r"Executed.*?(?=Error:)"
pattern1 = r"Error:.*?(?=\n)"
# Find all matches of the pattern in the output variable
matches = re.findall(pattern, output_text, re.DOTALL)
matches2 = re.findall(pattern1, output_text, re.DOTALL)

# Initialize an empty string to store the extracted lines
extracted_lines = ""
extracted_lines2=""

# Iterate over the matches and append them to the extracted_lines string
for match in matches:
    extracted_lines += match.strip() + "\n\n"

for match in matches2:
    extracted_lines2 += match.strip() + "\n\n"
# Print the extracted lines
print("Extracted Lines:")
print(extracted_lines)
print(extracted_lines2)
extracted_dict = {}

# Split the lines into a list
lines1 = extracted_lines.strip().split('\n\n')
lines2 = extracted_lines2.strip().split('\n\n')

# Iterate over the lines and populate the dictionary
for i in range(len(lines1)):
    if i < len(lines2):
        extracted_dict[lines1[i]] = lines2[i]

# Print the dictionary
print("Extracted Dictionary:")
print(extracted_dict)