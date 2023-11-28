import React from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const REST_API_KEY = "7f47b0a8ad4442492da6c0343a4cb9d2"; // rest api 가져오기
  const currnetPage = 1; // 현재페이지
  const listCnt = 10; // 몇개씩
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const searchTitle = '미움받을 용기';

  // 함수이름지정 // request URL 가져오기 // async : 비동기
  const callApi = async (currnetPage) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book?target=title`, {
        params: {
          query: searchTitle,
          // sort : 'latest '// 최근발간순서대로
        },
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`
        }
      })
      console.log(response.data);
      setUserData(response.data.documents)
    } catch (error) {
      console.error("error title : " + error);
    } finally { // 예외가 발생했든 발생하지 않았든 항상 실행
      setLoading(false)
    }

  }

  useEffect(() => {
    callApi(currnetPage) //
  }, []) // 한번만 호출해서 쓴다 []이거 안 하면 계속 요청됨
  // 컴포넌트가 처음 렌더링될 때 한 번만 callApi 함수를 호출하고, 변경 사항이 없으므로 useEffect가 다시 실행 x
  return (
    <div className="App">
      <h1>다음 책 검색 Api</h1>
      {
        loading ?
          (<div className='loading'>로딩...</div>) :  // loading이 true면 
          (
            <ul>
              {
                userData.map((item, i) => {
                  return (
                    <li key={i}>
                      <div className="card">
                        <div className="cardTitle"><a href={item.url} target="_blank">
                          {item.title}
                        </a>
                          {/* <div className="cardText" dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                          <img src={item.thumbnail} alt="" />
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          )
      }
    </div>
  )
}

export default App;
