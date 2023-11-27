import React from 'react';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const REST_API_KEY = "7f47b0a8ad4442492da6c0343a4cb9d2"; // rest api 가져오기
  const currnetPage = 1; // 현재페이지
  const listCnt = 10; // 몇개씩
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const searchTitle = '미움받을 용기';

  // 함수이름지정 // request URL 가져오기 // async ?
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
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    callApi(currnetPage) //
  }, []) // 한번만 호출해서 쓴다 []이거 안 하면 계속 요청됨

  return (
    <div className="App">
      <h1>베스트셀러</h1>
      {
        loading ?
          (<div className='loading'>로딩...</div>) :  // loading이 true면 
          (

            <Row className="justify-content-start m-5">
              {userData.map((item, i) => (
                <Col key={i} xs={6} md={2}>
                    <div className="card">
                      <img src={item.thumbnail} alt="책 이미지" className="img-fluid" id="thumbnail"/>
                      <div className="cardTitle">
                        <a href={item.url} target="_blank" className='url'>
                         {item.title.length > 10 ? `${item.title.substring(0, 11)}...` : item.title}
                        </a>
                        <p className='translators'>{item.translators}</p>
                      </div>
                    </div>
                </Col>
              ))}
            </Row>



          )
      }
    </div>
  )
}

export default App;
