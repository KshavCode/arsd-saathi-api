# 1. Use the SAME Python version as your local machine
FROM python:3.12-slim

# 2. Install Chrome and dependencies
# (We need wget, gnupg, and curl to download Chrome)
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# 3. Set the working directory
WORKDIR /app

# 4. Copy the Clean requirements file
COPY requirements.txt .

# 5. Install Python libraries
# --no-cache-dir keeps the image small
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy your code (api.py, extract.py)
COPY . .

# 7. Start the server
# Uses $PORT variable provided by Render automatically
CMD uvicorn api:app --host 0.0.0.0 --port $PORT