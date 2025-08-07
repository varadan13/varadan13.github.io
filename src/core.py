from dotenv import load_dotenv
import os
from llama_parse import LlamaParse

load_dotenv()  

LLAMA_API_KEY = os.environ['LLAMA_API_KEY']

parser = LlamaParse(
   api_key = LLAMA_API_KEY,
   result_type = "markdown",  
   )

file_name = "./example.pdf"
extra_info = {"file_name": file_name}

with open(f"./{file_name}", "rb") as f:
   documents = parser.load_data(f, extra_info=extra_info)

with open("output.md", "w", encoding="utf-8") as f:
   for doc in documents:
       f.write(doc.text)