import React, {useEffect,useState} from 'react';
import {
  AppBar,
  Tab,
  Tabs,
  Button,
  Chip,
  Card,
   CardContent,
   CardActions,
    CssBaseline,
    Container,
    Typography} from '@material-ui/core';


import{makeStyles, withStyles,} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles=makeStyles(
  {
    card:{
      marginBottom:20,
 
    },
    CardContent:{
      paddingBottom:5,
    },
    cardActions:{
      padding:16,
    },
    
  }
);
const Category=withStyles({
  root:{
    marginTop:10,marginBottom:10
  }
})(Chip)


function App() {
 const [jokes, setJokes]=useState([]);
 const[jokesToShow, setJokesToShow]=useState([]);

 const [likedJokes, setLikedJokes] = useState([]);
 const[currentTab, setCurrentTab] =useState(0);

const classes=useStyles();

 useEffect(() => {
   fetch('https://api.icndb.com/jokes')
   .then((res)=>res.json())
   .then((res) =>{
     console.log(res);
     setJokes(res.value);
     setJokesToShow(res.value);
   })
   .catch((err)=>console.log(err));
   
 }, []);

 const likeJoke=(id) => {
   if(likedJokes.find((j) => j.id === id)) return;
   const likedJoke = jokes.find((j) => j.id === id);
   setLikedJokes([likedJoke, ...likedJokes]);
 
 };


 const unlikeJoke=(id) => {
   const newLikedJokes = likedJokes.filter((j) => j.id  !== id);
   setLikedJokes(newLikedJokes);
  
};

const changeTab=(event, value) =>{
  setCurrentTab(value)
}

 return(
   <div className='App'>
     <CssBaseline/>
     <Container>
       <Typography variant='h1' align='center'>
        Chuck Norris Cracks
       </Typography>
       <AppBar style={{marginBottom: 20}} position='sticky'>
       <Tabs value={currentTab} onChange={changeTab} centered>
         <Tab label ='Home' id='home-tab' aria-controls='home-panel' />
         <Tab label ='Likes' id='like-tab' aria-controls='like-panel' />
       </Tabs>
       </AppBar>
       <div role="tabpanel" hidden={currentTab !==0}>
       {jokesToShow.map((joke) =>(
         <Card key={joke.id} className={classes.card}>
           <CardContent className={classes.cardContent}>
             {joke.categories.length > 0 ?(
               joke.categories.map((cat) =>(
                <Category 
                label={cat} 
                key ={cat}
                 variant='outlined'
                 
                  />
              ))
              ) : (
                <Category
                 label='Science' 
                 variant='outlined' 
                
                 />
              
             )}
            
             <Typography>
               {joke.joke}
             </Typography>
             
           </CardContent>
           <CardActions className={classes.cardActions}>
             <Button variant='contained' color='secondary' onClick={() =>likeJoke(joke.id)}>
               Like
             </Button>
             <Button variant='contained' color='default' onClick={() =>unlikeJoke(joke.id)}>
               Unlike
             </Button>
           </CardActions>
         </Card>
       ))}
       </div>
       <div role="tabpanel" hidden={currentTab !==1}>
         
         {likedJokes.map((joke) =>(
         <Card key={joke.id} className={classes.card}>
           <CardContent className={classes.cardContent}>
             {joke.categories.length > 0 ?(
               joke.categories.map((cat) =>(
                <Category 
                label={cat} 
                key ={cat}
                 variant='outlined'
                 
                  />
              ))
              ) : (
                <Category
                 label='regular' 
                 variant='outlined' 
                
                 />
              
             )}
            
             <Typography>
               {joke.joke}
             </Typography>
             
           </CardContent>
           <CardActions className={classes.cardActions}>
             <Button variant='contained' color='primary' onClick={() =>likeJoke(joke.id)}>
               Like
             </Button>
             <Button variant='contained' color='default' onClick={() =>unlikeJoke(joke.id)}>
               Unlike
             </Button>
           </CardActions>
         </Card>
       ))}
       
       </div>
     </Container>
   </div>
 );
       }
 

export default App;
