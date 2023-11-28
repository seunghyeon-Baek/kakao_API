import axios from 'axios';
import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const API_KEY = "7f47b0a8ad4442492da6c0343a4cb9d2";
  const currnetPage = 1;
  const [userData, setUserData] = useState([])
  const searchTitle = '코딩';

  const callApi = async (currentPage) => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/search/web`,

        {
          params: {
            query: searchTitle,
          },
          headers: {
            Authorization: `KakaoAK ${API_KEY}`
          }
        })
      console.log(response.data);
      setUserData(response.data.documents)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    callApi(currnetPage)
  }, [])


  return (
    <div>
      <h1>카카오 문서 API</h1>
      {
        userData.map(function (item, i) {
          return (
            <li key={i}>{item.title} <br />{item.contents}</li>
          );
        })
      }
    </div>
  );
}

export default App;
