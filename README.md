# Kakao map api 사용 샘플입니다.

'.env.development', '.env.production' 파일에 REACT_APP_KAKAO_API_KEY=apikey 추가 필요합니다.

## - KakaoMap

KakaoMap 사용 시 props에 options 적용

    options={{ lng, lat, level, zoom, bounds }

    bounds=[{ lat, lng }, { lat, lng } ...]

### App.css

    .App {
      width: 800px;
      height: 400px;
    }

### App.js

    import { withJs, withKakaoMap } from "./components";
    import KakaoMap from "./components/kakaomap";

    const Kakao = withJs(
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        process.env.REACT_APP_KAKAO_API_KEY
      }&libraries=services,clusterer,drawing&autoload=false`
    )(withKakaoMap(KakaoMap));

    function App() {
      return (
        <div className="App">
          <Kakao options={{ lng, lat, level: integer, zoom: string, bounds: array }} />
        </div>
      );
    }

    export default App;

or

    import { useKakao } from "./components";

    function App() {
      const Kakao = useKakao(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
          process.env.REACT_APP_KAKAO_API_KEY
        }&libraries=services,clusterer,drawing&autoload=false`
      );
      return (
        <div className="App">
          <Kakao options={{ lng, lat, level: integer, zoom: string }} />
        </div>
      );
    }

    export default App;

## - Marker

기본 Marker 사용 시 props에 options 적용.

    options={{ lat, lng, image }}

delay간격으로 map 또는 cluster에 추가됨.

    delay=millisecond

MarkerImage 사용시 options에 image 추가.

    image={{
      url: require("...path"),
      width: integer,
      height: integer
    }}

Marker

    ...
    <Marker options={{...}} />
    ...

## - MarkerClusterer

MarkerClusterer 사용 시 props에 options 적용.

    const options = {
      gridSize: integer
      averageCenter: boolean,
      minLevel: integer,
      disableClickZoom: boolean
    };

MarkerClusterer

    ...
    <MarkerClusterer options={options}>
      <Marker /> or {Markers}
    </MarkerClusterer>
    ...

## - CustomOverlay

CustomOverlay 사용 시 props에 options 적용.

    ...
    <CustomOverlay
      options={{ lng, lat, content: string }}
    />
    ...

## - Polyline

Polyline 사용 시 props에 options 적용.

delay 간격으로 path가 추가되 그려짐.

    delay=millisecond

bounds 가 true의 경우 path가 자도안에 나타나도록 설정. false의 경우 path의 첫번째 값이 map의 중앙에 오도록 설정.

    bounds=boolean

Polyline

    ...
    <Polyline
      bounds={true}
      delay={10}
      options={{ path, strokeColor: #rgb, strokeWeight: integer }}
    />
    ...

## - InfoWindoWithMarker

InfoWindoWithMarker 사용 시 props에 options 적용.

    options={{ lat, lng, content, image: { url, width, height }}}

Marker 'onMouseOver', 'onMouseOut' event 발생 시 InfoWindo 'open', 'close' 동작.

기본 delay후 map 또는 cluster에 추가됨.

    delay=millisecond

InfoWindoWithMarker

    ...
    <InfoWindoWithMarker
      options={{
        lat,
        lng,
        content: plateNumber,
        image: {
          url: require("./images/map-pin.png"),
          width: 30,
          height: 30
        }
      }}
    />
    ...

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
