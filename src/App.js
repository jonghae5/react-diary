import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Diary from "./pages/Diary.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";
const App = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <MyHeader
            headText={"App"}
            leftChild={
              <MyButton
                text={"왼쪽 버튼"}
                onClick={() => {
                  alert("버튼 클릭");
                }}
              />
            }
            rightChild={
              <MyButton
                text={"오른쪽 버튼"}
                onClick={() => {
                  alert("버튼 클릭");
                }}
              />
            }
          />
          <h2>App.js</h2>
          {/* <img src={process.env.PUBLIC_URL + `assets/emotion1.png`} />
          <img src={process.env.PUBLIC_URL + `assets/emotion2.png`} />
          <img src={process.env.PUBLIC_URL + `assets/emotion3.png`} />
          <img src={process.env.PUBLIC_URL + `assets/emotion4.png`} />
          <img src={process.env.PUBLIC_URL + `assets/emotion5.png`} /> */}
          <MyButton
            text={"버튼"}
            onClick={() => {
              alert("버튼 클릭");
            }}
            type={"positive"}
          />
          <MyButton
            text={"버튼"}
            onClick={() => {
              alert("버튼 클릭");
            }}
            type={"negative"}
          />
          <MyButton
            text={"버튼"}
            onClick={() => {
              alert("버튼 클릭");
            }}
            type={"default"}
          />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/diary/' element={<Diary />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/new' element={<New />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;

//npm install react-router-dom@6
// @6 최신버전인 6버전을 설치해달라고 요청
