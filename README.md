<br/>
<p align="center">
  <a href="https://github.com/ShaanCoding/ReadME-Generator">
    <img src="https://raw.githubusercontent.com/capstone-bangkit-2023/mobile-app/main/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Ayo Pintar</h3>

  <p align="center">
    Smart Quiz Platform

# API Service
API Service there 2 functions, such as bridge mobile app with API Model and bridge mobile app with database. To specific it, mobile app will send request to login, register, serve question, serve point, etc. Then API will retrieve data from database.

# API Documentation
```
https://docs.google.com/document/d/111WUYr6W-JranLW7XzRj0Vhxbm0PTrXQd-cgmBWAN9Q/edit?usp=sharing
```
  
# Build With
1. Node JS
2. Express JS
3. Dockerfile
4. Cloud Build (YAML File)

# Deploy With Cloud Run
Clone the repository: 
```
git clone https://github.com/capstone-bangkit-2023/API_Service.git
```
Build image:
```
gcloud builds submit --tag gcr.io/$DEVSHELL_PROJECT_ID/api-service:0.1
```
Deploy on Cloud Run:
```
gcloud run deploy --image gcr.io/$DEVSHELL_PROJECT_ID/api-service:0.1
```
  
# Environment Setting
For Reset Password, Enter your email and app-password in .env with this configuration:
  
PORT = 5000
  <br/>
DATABASE_NAME = {ENTER YOUR DATABASE NAME}
  <br/>
DATABASE_HOST = {ENTER YOUR DATABASE HOST}
  <br/>
DATABASE_USERNAME = {ENTER YOUR DATABASE USERNAME}
  <br/>
DATABASE_PASSWORD = {ENTER YOUR DATABASE PASSWORD}
  <br/><br/>

PRIVATE_KEY = {ENTER YOUR PRIVATE KEY}
  <br/>
LINK_FOTO = {ENTER YOUR LINK PHOTO}
  <br/>
CLIENT_URL = {ENTER YOUR CLIENT URL}
  <br/><br/>
NODEMAILER = {ENTER YOUR EMAIL}
  <br/>
NODEMAILER_PASS = {ENTER YOUR EMAIL APP-PASSWORD}
