import { Clock } from './clock'

interface NavProps {
    className?: string; 
}


const Nav: React.FC<NavProps> = ({ className }) => {
    const now = new Date()
    return (
    <>     
        <nav className={className} >
            <div>[ noercy://moe ]</div>
            <Clock time={now.getTime()} />
        </nav>
    </>
    )
}

export default Nav;

