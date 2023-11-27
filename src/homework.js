import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';

function App() {
const REST_API_KEY = "7f47b0a8ad4442492da6c0343a4cb9d2";
const currnetPage = 1;
const listCnt = 10;
const [userData, setUserData] = useState([])
const [loading, setLoading] = useState(true)
const searchTitle = '미움받을 용기'; // 검색할 내용

const callApi = async(currnetPage)=>{
  try {
    setLoading(true)
    const response = await axios.get(`https://dapi.kakao.com/v2/search/image`,{
      params : {
        query : searchTitle,
      },
      headers : {
        Authorization: `KakaoAK ${REST_API_KEY}`
      }
    })
    console.log(response.data);
  } catch (error) {
    console.error("error title : " + error);
  } finally{
    setLoading(false)
  }
}
useEffect(() => {
  callApi(currnetPage) 
}, [])

  return(
    <div className='App'>
      <h1>이미지 검색 api</h1>
      {
        loading ? 
        (<div className='loading'>로딩중..</div>) :
        (
          <ul>
            {
              userData.map((item, i)=>{
                return(
                  <li key={i}>
                    <img src={item.thumbnail} alt="" />
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
