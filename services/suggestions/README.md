## Suggestion Microservice
This microservice returns a random motivational suggestion to the user.
It is built using FastAPI and reads from a local messages.json file.
##Setup Instructions
1. Clone the Repository
Clone this repository to your local machine.

```bash
git clone https://github.com/FuhaiFeng/suggestion.git
cd suggestion
```
2. Create a Virtual Environment and Activate It

```bash
python -m venv venv
.\venv\Scripts\activate
```
3. Install Dependencies

```bash
pip install fastapi uvicorn
```
4. Ensure JSON File Availability
Make sure messages.json is in the same directory as suggestion.py.

Example messages.json:

```bash
[
  "Jog for 10 minutes",
  "Drink a glass of water",
  "Take a deep breath and smile",
  "Stretch for 2 minutes",
  "Write down one thing you're grateful for"
]
```
Running the Server
With your virtual environment activated, run:
```bash
python suggestion.py
```
You will see:
```bash
Uvicorn running on http://127.0.0.1:8000
```
API Usage
GET /suggestion
Returns a single random motivational message.
 Example Response
```bash
 "Take a deep breath and smile"
```
You can test it in your browser:
```bash
 http://127.0.0.1:8000/suggestion
```
##License
This project is for educational use only. No license specified.


