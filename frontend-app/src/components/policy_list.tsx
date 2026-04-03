import { useQuery } from "@tanstack/react-query";


import api from "../services/api"
import Spinner from "./spinner"


import { Link } from "react-router-dom";

    type Policy = {
      policy_id: string;
      policy_uuid: string;
      policy_type: string;
      policy_name: string;
      policy_description: string;
      duration_months: number | null;
    };

    type ApiResponse = {
      count?: number;
      next?: string | null;
      previous?: string | null;
      results?: Policy[];
    };

export default function PolicyList() {
    const login = localStorage.getItem("access");

    const fetchPolicies = async () => {
      const response = await api.get<ApiResponse>("policies/policy_lists/");
      const data = response.data.results ?? response.data;
      return Array.isArray(data) ? data : [];
    };

    const {
      data: policies = [],
      isLoading,
      error
    } = useQuery({
      queryKey:["policies"],
      queryFn: fetchPolicies,
      retry:(failureCount, error:any)=>{
        if(error?.response?.status === 401){
          return false;
        }
        return failureCount < 3;
      },
      retryDelay:2000,
      refetchOnReconnect:true,
      refetchInterval:5000,
      refetchOnWindowFocus:true,
      staleTime:60000,      
    });

    if(isLoading) return <p className="">
      <div className="d-flex align-items-center justify-content-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
          <Spinner isLoading={isLoading} />
        </div>
      </div>
    </p>;
    if(error) return <p>  
      <div className="d-flex align-items-center justify-content-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
          <h5>Error: {error.message}, Please Try Again Later</h5>
        </div>
      </div>
      </p>;

    return (
        <>
        {!login && (
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
                 <h1 className="display-6 mb-5">
                   We Provide Professional Insurance Services
                 </h1>
               </div>
               <div className="row g-4 justify-content-center">

                {policies.length === 0 && <p>No policies available</p>}

                 {policies.map((policy) => (
                    <div
                      key={policy.policy_id}
                      className="col-lg-4 col-md-6"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="service-item rounded h-100 p-5">
                        <div className="d-flex align-items-center ms-n5 mb-4">
                          <div className="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                            <img
                              className="img-fluid"
                              src="/template/images/icon/icon-02-light.png"
                              alt=""
                            />
                          </div>
                          <h4 className="mb-0">{policy.policy_name}</h4>
                        </div>
                        <p className="mb-4">
                          {policy.policy_description}
                        </p>
                        <Link className="btn btn-light px-3" to="/login">
                          Read More
                        </Link>
                      </div>
                    </div>
                 ))}
              </div>
            </div>
          </div>    
        )}

        {login && (
          <div className="container-xxl py-5">
            <div className="container">
              <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
                 <h1 className="display-6 mb-5">
                   We Provide Professional Insurance Services
                 </h1>
               </div>
               <div className="row g-4 justify-content-center">

                {policies.length === 0 && <p>No policies available</p>}

                 {policies.map((policy) => (
                    <div
                      key={policy.policy_id}
                      className="col-lg-4 col-md-6"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="service-item rounded h-100 p-5">
                        <div className="d-flex align-items-center ms-n5 mb-4">
                          <div className="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                            <img
                              className="img-fluid"
                              src="/template/images/icon/icon-02-light.png"
                              alt=""
                            />
                          </div>
                          <h4 className="mb-0">{policy.policy_name}</h4>
                        </div>
                        <p className="mb-4">
                          {policy.policy_description}
                        </p>
                        <Link className="px-3" to={`/policy-detail/${policy.policy_uuid}`}>
                          View Packages <i className="fa fa-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                 ))}
              </div>
            </div>
          </div> 
        )}
              
        </>
    );
}