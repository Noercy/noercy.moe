import classes from  './aboutMe.module.css'

const AboutMe = () => {
    
    return (
    <>     
         <p>A 3rd year software engineering student and wannabe linguist <br />
           
            

          <br /><br />This is on my cv chat, smile :)
          <br /> <br /><br />- Links -
        </p>
        <ul> 
        
          <li><a className={`${classes.aStyle}`} href="https://rateyourmusic.com/~rankofan">✩ Rateyourmusic</a></li>
          <li><a className={`${classes.aStyle}`} href="https://anilist.co/user/rankofan/">✩ Anilist</a></li>
          <li><a className={`${classes.aStyle}`} href="https://www.last.fm/user/Noercy">✩ Last.fm</a></li>
          <li><a className={`${classes.aStyle}`} href="https://osu.ppy.sh/users/8214806">✩ Osu</a></li>
          <li><a className={`${classes.aStyle}`} href="https://open.spotify.com/user/battlesloth">✩ Spotify</a></li>
          <li><a className={`${classes.aStyle}`} href="https://twitter.com/rankostan">✩ Twitter</a></li>
          <li><a className={`${classes.aStyle}`} href="https://steamcommunity.com/id/Noercy/">✩ Steam</a></li>
          <li><a className={`${classes.aStyle}`} href="https://github.com/Noercy">✩ Github</a></li>

        </ul>
    </>
    )
}

export default AboutMe;