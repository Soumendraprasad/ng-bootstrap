import subprocess
import re,os
import subprocess
import re

def run_command(cmd):
    extracted_dict = {}
    try:
        output = ""  # Initialize an empty string to store the output
        # Open a subprocess to run the command
        process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Read the output and error streams line by line
        for line in process.stdout:
            output += line  # Append the line to the output variable
            print(line, end='')  # Print the line to the console
            
        # Define patterns for extraction
        patterns = [
            (r"Executed.*?(?=Error:)", r"Error:.*?(?=\n)"),
        ]
        
        # Iterate over patterns and matches
        for pattern_pair in patterns:
            pattern, error_pattern = pattern_pair
            matches = re.findall(pattern, output, re.DOTALL)
            error_matches = re.findall(error_pattern, output, re.DOTALL)
            
            # Populate the dictionary
            for i in range(min(len(matches), len(error_matches))):
                extracted_dict[matches[i].strip()] = error_matches[i].strip()
            
                    # Wait for the process to finish
        process.wait()
        
    except subprocess.CalledProcessError as e:
        # If the command returns a non-zero exit status, print the error
        print(e)
    extracted_dict= "\n".join([f"For test case '{test}' the error is: '{error}'" for test, error in extracted_dict.items()])
    return extracted_dict


# Example command to run in the terminal
command = "ng test --include=C:\\Users\\Sky\\Desktop\\orleans\\ng-bootstrap\\src\\accordion\\gocodeo_tests\\test_accordion.directive_HappyPath.spec.ts -c coverage"

# Run the command and capture the output
output_text = run_command(command)
with open("output.txt","w") as f:
    f.write(output_text)
# Now, the variable 'output_text' contains all the printed text as a single string
print(output_text)
