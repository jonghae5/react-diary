import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Diary from "./pages/Diary.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기1",
    date: 1643641210001,
  },
  {
    id: 2,
    emotion: 3,
    content: "오늘의 일기2",
    date: 1643641210002,
  },
  {
    id: 3,
    emotion: 5,
    content: "오늘의 일기3",
    date: 1643641210003,
  },
  {
    id: 4,
    emotion: 2,
    content: "오늘의 일기4",
    date: 1643641210004,
  },
  {
    id: 5,
    emotion: 4,
    content: "오늘의 일기5",
    date: 1643641210005,
  },
];

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
  return newState;
};
const App = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(6);

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
