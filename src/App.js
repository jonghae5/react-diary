import "./App.css";
import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Diary from "./pages/Diary.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }

    default: {
      return state;
    }
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};
const App = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id, 10) - parseInt(a.id, 10)
      );
      dataId.current = diaryList[0] ? parseInt(diaryList[0].id, 10) + 1 : 0;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
          <BrowserRouter>
            <div className='App'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/diary/' element={<Diary />} />
                <Route path='/diary/:id' element={<Diary />} />
                <Route path='/edit/:id' element={<Edit />} />
                <Route path='/new' element={<New />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
};

export default App;

//npm install react-router-dom@6
// @6 최신버전인 6버전을 설치해달라고 요청
