#!/bin/bash

# Function to create JSON string
generate_json() {
    local dir="$1"
    local indent="$2"
    local output=""
    local first=true
    
    echo -n "{"
    
    # Loop through all items in directory
    for item in "$dir"/*; do
        # Skip if item doesn't exist (handles empty directories)
        [ -e "$item" ] || continue
        
        # Get just the filename
        name=$(basename "$item")
        
        # If it's a directory or PDF file
        if [ -d "$item" ] || [[ $name == *.pdf ]]; then
            # Add comma if not first item
            if [ "$first" = true ]; then
                first=false
            else
                echo -n ","
            fi
            echo -e "\n${indent}    \"$name\": "
            
            # If it's a directory
            if [ -d "$item" ]; then
                # Recursively process directory
                generate_json "$item" "${indent}    "
            # If it's a PDF file
            else
                # Convert the full path to relative path starting with /
                relative_path=${item#.}
                # Print file entry
                echo -n "\"$relative_path\""
            fi
        fi
    done
    
    echo -e "\n${indent}}"
}

# Run the function and save to files.json
generate_json "." "" > files.json

echo "files.json has been generated!"