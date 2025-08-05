import DashboardComponent from "../components/dashboard/dashboard"
import { useAuth } from "../hooks/auth-context ";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <DashboardComponent user={user} />
        </div>
    )
}

export default Dashboard