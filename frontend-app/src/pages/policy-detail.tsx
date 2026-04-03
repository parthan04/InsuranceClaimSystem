import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";

import api from "../services/api";

import Spinner from "../components/spinner";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PolicyDetail() {
    const { policy_uuid } = useParams();
    const navigate = useNavigate();
    

    type Benefit = {
        id: number;
        benefit_title: string;
    };
    type Tier = {
        id: number;
        tier_name: string;
        coverage_amount: number;
        monthly_amount: number;
        weekly_amount: number;
        display_name: string;
        is_popular: boolean;
        benefits:Benefit[];
    };
    
    type Policy = {
        policy_id: string;
        policy_uuid: string;
        policy_type: string;
        policy_name: string;
        policy_description: string;
        duration_months: number | null,
        tiers: Tier[];
    };

   const [policy,setPolicy] = useState<Policy | null>(null);
   const [loading,setLoading] = useState(true);
   const [error,setError] = useState<string | null>(null);
   const [frequency, setFrequency] = useState<"weekly" | "monthly">("weekly");

   useEffect(() => {
    if(policy_uuid){
        fetchPolicy();
    }
   },[policy_uuid]);

   const fetchPolicy = async () => {
    try{
        const response = await api.get<Policy>(`policies/policy_lists/${policy_uuid}/`);
        setPolicy(response.data);
    } catch (err) {
        setError("Failed to fetch policy");
    } finally {
        setLoading(false);
    }
   };
    
    const handleApply = (tier: Tier) => {

        if(!policy) return;

        const selectedData={
            policy_uuid:policy.policy_uuid,
            policy_name:policy.policy_name,

            tier_id:tier.id,
            tier_name:tier.display_name,

            frequency:frequency,
            amount:frequency === "weekly" ? tier.weekly_amount : tier.monthly_amount,
            coverage_amount:tier.coverage_amount,

            benefits:tier.benefits,
        };

        localStorage.setItem("selectedPolicy",JSON.stringify(selectedData));

        if(policy?.policy_type === "vehicle"){
            navigate(`/vehicle-insurance/${policy.policy_uuid}`);
        }else if(policy?.policy_type === "health"){
            navigate(`/health-insurance/${policy.policy_uuid}`);
        }else if(policy?.policy_type === "life"){
            navigate(`/life-insurance/${policy.policy_uuid}`);
        } else if(policy?.policy_type === "home"){
            navigate(`/home-insurance/${policy.policy_uuid}`);
        }
    }

    return (
            <>
            <Header />
            <div className="policy-detail d-flex flex-column min-vh-100">

                {loading && <Spinner isLoading={loading} />}
                {!loading && !policy &&(
                    <div className="flex-grow-1">
                        <p>No policy found</p>
                    </div>
                )}
                {!loading && error && <p>{error}</p>}

                {policy && (
                    <div className="flex-grow-1">

                    {/* Policy Header */}
                    <div className="policy-header d-flex justify-content-between align-items-center container">
                        <div className="header-left">
                            <div className="d-flex align-items-center mb-4">
                                <Link to="/#policies" className="text-primary"><i className="fa fa-arrow-left text-primary me-2"></i>Back to Policies</Link>
                            </div>
                            <h5>{policy.policy_name} – Coverage & Plan Details</h5>
                            <p>
                                Select the level of coverage that best fits your needs. 
                                <br />Protect yourself with flexible, reliable plans.
                            </p>
                        </div>
                        <div className="header-right">
                            <div className="btn-group">
                                <div
                                  className={`btn ${frequency === "weekly" ? "btn-primary" : "border"}`}
                                  onClick={() => setFrequency("weekly")}
                                >
                                    Weekly
                                </div>
                                <div
                                  className={`btn ${frequency === "monthly" ? "btn-primary" : "border"}`}
                                  onClick={() => setFrequency("monthly")}
                                >
                                    Monthly
                                </div>
                            </div>
                        </div>
                    </div>

                        {/* Cards */}
                        <div className="container">
                            <div className="row g-4 justify-content-center">

                                {policy.tiers.map((tier) => (
                                    <div key={tier.id} className="col-md-4">

                                        <div className={`card policy-card ${tier.is_popular ? 'border border-primary' : ''}`}>

                                            <div className="card-body d-flex flex-column">

                                                <h5>{tier.display_name}</h5>

                                                {tier.is_popular && (
                                                    <div className="badge bg-primary p-2">Popular</div>
                                                )}

                                                <div className="d-flex mt-2 align-items-baseline">
                                                    <h4 className="fs-2">
                                                        ₹{frequency === "weekly" ? tier.weekly_amount : tier.monthly_amount}
                                                    </h4>

                                                    <span className="ms-1">
                                                        /{frequency === "weekly" ? "week" : "month"}
                                                    </span>
                                                </div>

                                                <p className="fs-6 text-muted">Coverage up to <span className="text-dark fw-bold">₹{tier.coverage_amount}</span></p>

                                                <ul className="list-unstyled">
                                                    {tier.benefits.map((b) => (
                                                        <li key={b.id} className="fs-6 mb-2">
                                                            <i className="fa fa-check-circle me-2 text-success"></i>
                                                            {b.benefit_title}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mt-auto btn btn-primary" onClick={() => handleApply(tier)}>
                                                    Select Package
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                )}

                <Footer />
            </div>
            </>
    );
}
