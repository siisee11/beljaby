<div align="center">
  
  [![Current Version](https://img.shields.io/badge/version-0.2.0-green.svg)](https://github.com/siisee11/beljaby/)
[![Language Badge](http://img.shields.io/badge/language-Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/ko/)
[![Framework Badge](http://img.shields.io/badge/framework-react-61DAFB?style=flat&logo=react&logoColor=white)](https://nodejs.org/ko/)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
  ![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
  [![Maintenance](https://img.shields.io/maintenance/yes/2021)](https://github.com/siisee11/beljaby/)
  
  [![Netlify Status](https://api.netlify.com/api/v1/badges/219b25fe-68a3-4187-b939-9197ef98e0df/deploy-status)](https://app.netlify.com/sites/beljaby/deploys)
  
  <img alt="MyPic logo" src="beljaby.png" width="200px" />

  <h1> BELJABY </h1>

  <p>
    <b>LOL 내전 벨런싱 시스템</b>
  </p>

  <a href="https://itunes.apple.com/us/app/">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="https://play.google.com/store/apps">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>

</div>

# BELJABY 
커스텀 게임 Elo 관리 및 자동 팀 분배. [Link](https://beljaby.click)

## Roadmap
  - [x] ~~커스텀 Elo 계산~~
  - [x] ~~Elo 기반 팀 분배~~
  - [x] ~~자동 팀 메이킹~~
  - [x] ~~토토~~
  - [ ] X맨 및 미션
  - [ ] 앱 개발

## 개발 환경 준비
Node.js 12.10.0 이상의 버전을 설치해야한다. 웹의 경우, 리엑트로 구현되었으므로 React Cli 툴을 설치해야한다.
앱은 React Native로 구현되고있고 Android simulator와 RN 환경 구성이 필요하다.


### 웹 실행 방법
git clone을 통해 레파지토리를 내려받는다. 웹 폴더 (beljaby/)로 이동해 모듈들을 설치하고 실행한다.

```bash
$ git clone https://github.com/siisee11/beljaby
$ cd beljaby
$ npm i
$ npm start
```
* 웹 프론트엔드 구동을 위해서 Firebase와 Riot API key가 필요하다.
[Riot Developer](https://developer.riotgames.com/)와 [Firebase](https://firebase.google.com/)에서 API를 발급받아 사용할 수 있다.
아니면 저에게 카톡주세요.
발급 받은 API Key는 beljaby/ 폴더 밑에 .env파일을 만들어 아래와 같은 형식으로 작성한다.
```
REACT_APP_RIOT_API_KEY=<riot api key>
REACT_APP_FIREBASE_API_KEY=<firebase api key>
```

* Ubuntu 18.04 기준으로, user_watch_max 제한으로 인해 error가 발생할 수 있는데, 이를 해결하기 위해 updateUserWatches.sh을 실행시키면 된다.
```bash
$ chmode +x updateUserWatches.sh
$ ./updateUserWatches.sh
```

### 웹 Deploy 방법
netlify를 통해 이 레파지토리의 master branch를 호스팅하고 있다. (beljaby/build/ 폴더)
master branch에 push하면 자동으로 build가 진행된다.
deploy시에 warning은 error로 간주되므로 warning도 모두 제거하고 master branch에 push한다.

### 백엔드 구동 방법
백엔드는 몽고DB를 사용하며, heroku를 이용해 서버를 가동하고 있다.
백엔드를 업데이트 및 동작시키는 법은 아래와 같다.
```
$ cd beljaby/backend/
$ git add --all
$ git commit -m "Some message"
$ git push heroku master
```
콘솔 로그를 보고 싶으면 아래 커맨드를 이용한다.
```
$ heroku logs -t
```

* 백엔드 역시 API key를 입력해줘야되는데 웹과 같은 방식으로 .env파일을 만들어서 관리한다. (backend/.env)
```
MONGO_URL=<mongo db url>
RIOT_API=<riot api key>
```
