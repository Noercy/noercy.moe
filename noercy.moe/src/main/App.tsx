import './App.css'
import styles from './main-style.module.css'
import Nav from './Nav'
import BottomNav from './bottomNav'
import Home from './content/home'
import AnimatedTitle from './content/animatedTitle'


import AboutMe from './content/aboutMe'

import { useState, useEffect } from 'react';
import Projects from './content/projects'
import ChangeLog from './content/changeLog'
import Collection from './content/collection'
import CollectionScreen from './content/collectionScreen'



enum ContentType {
  HOME = 'home',
  PROJECTS = 'projects',
  COLLECTION = 'collection',
  CHANGELOG = 'changelog',
  ABOUT = 'about',
}

function App() {
  const [currentContent, setCurrentContent] = useState<ContentType>(ContentType.HOME);
  const [title, setTitle] = useState<string>('Home');
  const [nextTitle, setNextTitle] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNewComponent, setShowNewComponent] = useState(false);


  const animationClick = () => {
    console.log('button is pressed')
    setIsAnimating(true);
    setTimeout(() => {
      setShowNewComponent(true);
    }, 500);
  }


  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Duration of the fade-in animation for NewComponent
    }
  }, [isAnimating]);
  

  const renderContent = () => {
    switch (currentContent) {
        case ContentType.HOME:
            return <Home />;
        case ContentType.PROJECTS:
            return <Projects/>
        // turn this one into a new page 
        case ContentType.COLLECTION:
            return <Collection />;
        case ContentType.CHANGELOG:
          return <ChangeLog />
        case ContentType.ABOUT:
            return <AboutMe />;
        default:
            return <Home />;
    }
};

// change title name animation
const navClick = (content: ContentType) => {
  if (content !== currentContent) {
    setCurrentContent(content);
    switch (content) {
      case ContentType.HOME:
        setNextTitle('Home');
        break;
      case ContentType.PROJECTS:
          setNextTitle('Projects');
          break;
      case ContentType.COLLECTION:
        setNextTitle('Collection');
        break;
      case ContentType.CHANGELOG:
        setNextTitle('Change_Log')
        break;
      case ContentType.ABOUT:
        setNextTitle('About_Me')
        break;
    }
  }
  
};

  return (
    
     
      <div className={styles.Box}>
        {!showNewComponent ? (
          <>
          <div className={`${styles.sideNav} ${isAnimating ? styles.hidden : ''}`}>
        <Nav />
        <BottomNav onNavClick={navClick}  />
        </div>


        <div className={`${styles.mainContent} ${isAnimating ? styles.hidden : ''}`}>
          <h1><span className={styles.blinkClass}>{'>'}</span> <AnimatedTitle text={title} nextTitle={nextTitle} setTitle={setTitle} /></h1>
          <div className={styles.mainContentSize}>
            {renderContent()}
          </div>
          
         {/*<ChatApp />*/} 
        
          
        </div>
        
     
      
      
     
    </>
        ) : (
          <CollectionScreen />
        )}
        </div>
   
  )
}

export default App
