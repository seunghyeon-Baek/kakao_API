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
      <h1>다음 책 검색 Api</h1>
      {
         loading ?
         (<div className='loading'>로딩...</div>) :  // loading이 true면 
         (

           <Row className='justify-content-center'>
             <Col xs={6} md={2} >
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
             </Col>
           </Row>



         )
     }
   </div>
 )
}

export default App;
