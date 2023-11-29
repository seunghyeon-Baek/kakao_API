import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const REST_API_KEY = "313aa436f38f2ff1221ba8c5a9f643d7";
  const size = 10;
  // const currentPage = 1;
  const [currentPage, setCurrentPage] = useState(1)
  const [useData,setUseData] = useState([])
  const [totalpages, setTotalpages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTitle, setSearchTitle] = useState('')
  // const searchTitle = '이효리';

  const callApi = async (currentPage) => {
    try {
      setLoading(true)

      const response = await axios.get(`https://dapi.kakao.com/v2/search/web`, {
        params:{
          query: searchTitle,
          page: currentPage
        },
        headers:{
          Authorization: `KakaoAK ${REST_API_KEY}`
        }
      })
      console.log(response.data);
      setUseData(response.data.documents)
      setTotalpages(response.data.meta.total_count / size)
    } catch (error) {
      console.error("error title : " +error);
    } finally {
      setLoading(false)
    }
  
  }
  
  // useEffect(()=>{
  //   callApi(currentPage)
  // },[currentPage])

  useEffect(()=>{
    callApi(searchTitle)
  },[])

  const searchBtn = () => {
    callApi(searchTitle)
  }

  const handlerKeyPress = (e)=>{
    if(e.key == "Enter") {
      callApi(searchTitle)
    }
  }

  const pageViewNumbers = ()=>{
    const pageNums = [];
    const startPage = Math.floor((currentPage - 1) / size) * size + 1 ;
    const endPage = startPage + size - 1;

    for(let i = startPage; i<=endPage; i++) {
      pageNums.push(
        <span className={`page-item ${currentPage === i ? 'active' : ''}`} key={i} onClick={()=>{handlePageChange(i)}}>
          <a className="page-link" href="#">{i}</a>
        </span>
      )
    }

    return pageNums;
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalpages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="App">
        <h1>다음 web 검색</h1>
        <div className="container mb-3">
          <div className="row">
            <div className="col d-flex gap-1">
              <input type="text" className='form-control' 
              onChange={(e)=>{setSearchTitle(e.target.value)}}
              onKeyPress={handlerKeyPress}/>
              <button className='btn btn-primary' style={{width:'100px'}} onClick={searchBtn}>검색</button>
            </div>
          </div>
        </div>
        <ul>
          {
            useData.map(function(item,i) {
              return (
                <li key={i} className='mb-3'>
                  <div className="title" dangerouslySetInnerHTML={{__html:item.title}}></div>
                  <div className="content" dangerouslySetInnerHTML={{__html:item.contents}}></div>
                  <hr />
                </li>
              )
            })
          }
        </ul>

        <div>
          <ul className="pagination">
            <li className="page-item" onClick={()=>{handlePageChange(currentPage-1)}}>
              <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            {pageViewNumbers()}
            <li className="page-item" onClick={()=>{handlePageChange(currentPage+1)}}>
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </div>
    </div>
  );
}

export default App;