# This script changes the format of "sharepoint links" in the handbook.
#
# The script overwrites the .md files in current folder replacing the string
# 
#  `sharePoint:Folder/` 
# 
# with  
# 
#  `sharepoint://Folder/Documents/`
#
# NOTE: the `sharepoint:` prefix is matched ignoring the case, and transformed to lowercase.
#
# This change was made during MR !296 (see discussion therein): 
# - https://gitlab.com/PublicAgileFactory/handbook/-/merge_requests/296
#
# 
# To execute this script, from the handbook root folder run:
#
# $ python scrips/rename_sharepoint_links.py
#

from pathlib import Path
import re


input_pattern = 'sharepoint:(.*?)/(Document./)?'   # INPUT REGEX
output_pattern = 'sharepoint://\g<1>/Documents/'   # OUTPUT REGEX
flags = re.IGNORECASE                              # flags used to match input_pattern


for file_path in Path('.').glob('*.md'):
    content = file_path.read_text()
    new_content = re.sub(input_pattern, output_pattern, content, flags=flags)
    if new_content != content:
        print(f'* Writing modified {file_path}')
        file_path.write_text(new_content)
