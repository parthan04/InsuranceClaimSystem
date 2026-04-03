import { Link } from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";

export default function VehicleApplication(){
    const {policy_uuid} = useParams();
    const navigate = useNavigate();

    const handleApply = () => {
        navigate(`/payment/${policy_uuid}`);
    };
    return (
        <>
        <div className="d-flex align-items-center mb-4">
            <Link to="/#policies" className="text-primary"><i className="fa fa-arrow-left text-primary me-2"></i>Back to Policies</Link>
        </div>
        <h1>Vehicle Insurance</h1>
        <button className="mt-auto btn btn-primary" onClick={handleApply}>
            Submit
        </button>
        </>
    )
}