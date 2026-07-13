import "../styles/dashboard.css";

function DashboardCard({ title, value, color }) {

    return (

        <div className={`card ${color}`}>

            <h3>{title}</h3>

            <h2>₹ {value || 0}</h2>

        </div>

    );

}

export default DashboardCard;