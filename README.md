# node-cors-proxy

![GitHub package.json version](https://img.shields.io/github/package-json/v/pepsizerosugar/node-cors-proxy?color=g)
![Version](https://img.shields.io/badge/Update-2021.12.20-yellow)
[![CodeFactor](https://www.codefactor.io/repository/github/pepsizerosugar/node-cors-proxy/badge)](https://www.codefactor.io/repository/github/pepsizerosugar/node-cors-proxy)

* cors proxy for some reason. 😉
* If you have a problem, please leave a issue at github or email.
<br><br>

## 0. Change Log
### version 1.1.0 (2021.12.21)
```
1. Fixed when response is not json body
  1-1. add image response to download
  1-2. add response to not json body
2. Sperated request module
  2-1. request, initalize
3. To deal with MIME content-type
  3-1. save audio, image, video
  3-2. other MIME types gonna be text/plain reponse
```
<br>

## 1. Getting Started
### 1-1. Installation
```
1. Download or clone the repo.
```
### 1-2. How to use
```
1. npm start
  1-1. default server adress is https://localhost:6789
  1-2. You can change the server IP and PORT
    1-2-1. IP & PORT can assaign with environment variables (IP, PORT)
2. Request your request!
  2-1. ex) your target API: https://openapi.naver.com/v1/nid/me
           then request like this: https:localhost:6789/https://openapi.naver.com/v1/nid/me
```
### 1-3. Extra
```
1. You can request with Parameters, Header and Body.
2. And then, server is request to your target with your entities.
```
<br>

## 2. Example request log
![request](https://user-images.githubusercontent.com/84403670/146704461-f116e0b9-2b93-4b39-80ae-4e2ee2e95bb3.PNG)
