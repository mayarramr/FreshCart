import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { error } from 'toastr'

export default function CategoryDetails() {


    let params = useParams()
    function getSubCategory(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
          .catch(error => {
            console.log(error);
          });
      }
      

        let {data , isError} = useQuery('getSubCategory' , () => getSubCategory(params.id))
        console.log(data?.data);
    return <> <div className="row">
    {data?.data.data((category)=> <div key={category._id} className="categoryitem col-md-4 p-5 mt-5">
   
  <Link to={`/category/${category._id}`}>
  <div className={`position-relative text-center ${Style.imageeee}`}>
        <img src={category.image} className="w-75 rounded-3" alt="" />
        <div className={`${Style.overlay} position-absolute top-0 end-0 start-0 bottom-0 rounded-3 w-75 mx-auto d-flex align-items-center justify-content-center fs-1 fw-bolder`}> 
        <div className={`${Style.white}`}>VIEW</div>
        </div>
   </div>
  </Link>
        <div><h4 className="text-main fw-bolder pt-3 text-center pt-2">{category.name.split(" ").slice(0,2).join(" ")}</h4></div>
    </div> )}
</div>
    </>
}

