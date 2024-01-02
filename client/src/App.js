import React from 'react';
import { Container } from '@material-ui/core';
//import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';


// Switch changes into Routes
// exact component changes into element={</ELEMENT_NAME>}


//import { getPosts } from './actions/posts'
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
    // const [currentId,setCurrentId] = useState(null);
    // const classes=useStyles();
    // const dispatch=useDispatch();

    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[currentId,dispatch]);
     const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxwidth="xl">
                <Navbar />
                <Routes>
                    <Route path='/posts' element = {<Home/>} />
                    <Route path='/'  element ={ <Navigate replace to="/posts" />} />
                    <Route path='/posts/search' element = {<Home/>} />
                    <Route path='/posts/:id' element = { <PostDetails/> } />
                    <Route path='/auth' exact element ={ (!user? <Auth/> : <Navigate replace to = "/posts" />)} />
                </Routes>
                {/* l <Home /> */}

            </Container>
        </BrowserRouter>

    );
}

export default App;