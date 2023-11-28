
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const keyNum = "9a88e2c5-0423-4b86-a7c0-0974d74d4359"; // api 주소에서 가져옴
  const listCnt = 10; // 몇개씩
  const [currentPage, setCurrentPage] = useState(1)
  const [userData, setUserData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  // 함수이름지정 // request URL 가져오기 // async ?
  const callApi = async (currentPage) => {
    try {
      const response = await axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currentPage}`)

      console.log(response.data);
      setUserData(response.data.response.body.items.item)
      setTotalPages(response.data.response.body.totalCount / listCnt)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    callApi(currentPage)
  }, [currentPage])


  const pageViewNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPage - 1) / listCnt) * listCnt + 1;
    const endPage = startPage + listCnt - 1;

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span  className={`page-item ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => { handlePageChange(i) }} ><a className="page-link" href="#" >{i}</a></span>
      )
    }
    return pageNumbers;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div>
      <h1>문화관광부 Api</h1>
      {
        userData.map(function (item, i) {
          return (
            <li key={i}>{item.title}</li>
          );
        })
      }

      <div>
        <ul class="pagination">
          <li class="page-item" style={{cursor:'pointer'}} onClick={()=>{handlePageChange(currentPage - 1)}}>
            <a class="page-link">Previous</a>
          </li>
          {pageViewNumbers()}
          <li class="page-item " onClick={()=>{handlePageChange(currentPage + 1)}}>
            <a class="page-link" href="#" >NEXT</a>
          </li>
        </ul>
      </div>
    </div>

  );
}

export default App;
