
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const keyNum = "9a88e2c5-0423-4b86-a7c0-0974d74d4359"; // api 주소에서 가져옴
  const currnetPage = 3; // 현재페이지
  const listCnt = 10; // 몇개씩
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  // 함수이름지정 // request URL 가져오기 // async ?
  const callApi = async (currnetPage) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currnetPage}`)
      setUserData(response.data.response.body.items.item)
    } catch (error) {
      console.error("error title : " + error);
    } finally {
      setLoading(false)
    }

    // axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&num
    // .then((response)=>{
    //   console.log(response.data.response.body.items.item)
    //   setUserData(response.data.response.body.items.item)
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
  }

  useEffect(() => {
    callApi(currnetPage) //
  }, []) // 한번만 호출해서 쓴다 []이거 안 하면 계속 요청됨

  return (
    <div className="App">
      <h1>문화체육관광부 추천여행 Api</h1>
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
                        <div className="cardTitle"><a href={item.url} target="_blank">{item.title}
                        </a>
                        <div className="cardText" dangerouslySetInnerHTML={{ __html: item.description }} />
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
