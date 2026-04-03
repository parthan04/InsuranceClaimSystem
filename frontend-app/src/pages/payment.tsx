import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Payment(){

    const[selectedPolicy, setSelectedPolicy] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = localStorage.getItem("selectedPolicy");
        if(data){
            setSelectedPolicy(JSON.parse(data));
        }
    },[]);

    return(
        <>
        <h1>Payment</h1>
        {!selectedPolicy && (
            <p>No policy selected</p>
        )}
        {selectedPolicy && (
            <div>
                <p>Policy Name: {selectedPolicy.policy_name}</p>
                <p>Tier Name: {selectedPolicy.tier_name}</p>
                <p>Frequency: {selectedPolicy.frequency}</p>
                <p>Amount: {selectedPolicy.amount}</p>
                <p>Coverage Amount: {selectedPolicy.coverage_amount}</p>
                <h5>Benefits:</h5>
                <ul>
                    {selectedPolicy.benefits.map((b: any) => (
                        <li key={b.id}>{b.benefit_title}</li>
                    ))}
                </ul>
                <button className="btn btn-primary">Pay Now</button>
                <button className="btn btn-secondary" onClick={() => {localStorage.removeItem("selectedPolicy"); navigate("/")}}>Cancel</button>
            </div>
        )}
        </>
    )
}