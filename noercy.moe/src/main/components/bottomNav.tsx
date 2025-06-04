
enum ContentType {
    HOME = 'home',
    PROJECTS = 'projects',
    COLLECTION = 'collection',
    CHANGELOG = 'changelog',
    ABOUT = 'about',
  }

interface BottomNavProps {
    onNavClick: (content: ContentType) => void;
    className?: string; 
}

const BottomNav: React.FC<BottomNavProps> = ({ className, onNavClick })  => {

    return (
    <>     
        <nav className={className}>
            <div onClick={() => onNavClick(ContentType.HOME)}>/Home</div> 
            <div onClick={() => onNavClick(ContentType.PROJECTS)}>/Projects</div>
            <div onClick={() => onNavClick(ContentType.COLLECTION)}>/Collection</div>
            <div onClick={() => onNavClick(ContentType.CHANGELOG)}>/Change_Log</div>
            <div onClick={() => onNavClick(ContentType.ABOUT)}>/About_Me</div>
        </nav>
    </>
    )
}

export default BottomNav;