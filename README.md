# node-cors-proxy

![GitHub package.json version](https://img.shields.io/github/package-json/v/pepsizerosugar/node-cors-proxy?color=g)
![Version](https://img.shields.io/badge/Update-2022.03.16-yellow)
[![CodeFactor](https://www.codefactor.io/repository/github/pepsizerosugar/node-cors-proxy/badge)](https://www.codefactor.io/repository/github/pepsizerosugar/node-cors-proxy)

* cors proxy for some reason. 😉
* If you have a problem, please leave a issue at github or email.
<br><br>

## 0. Change Log
### version 1.2.1 (2022.03.16)
```
1. Changed variable type var to let.
2. Changed parsing logic that response from origin.
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
