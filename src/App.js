import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import PostList from './Pages/PostList';
import PostEdit from './Pages/PostEdit';
import PostDetail from './Pages/PostDetail';
import { Box, useDisclosure, IconButton,useColorMode, ColorModeScript } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons'
import {MdDehaze} from "react-icons/md";

function App() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box h="100%">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/posts" />
        </Route>
        <Route path="/posts/new"><PostEdit /></Route>
        <Box h="100%">
          <Box padding=".4rem" minHeight="40px" borderBottom="1px solid #ccc">
          <IconButton display={{
            sm:"block",
            md:"none"
          }}  colorScheme="teal" onClick={onToggle} icon={ <MdDehaze/>} />
          <IconButton icon={<MoonIcon/>} onClick={toggleColorMode}/>
          {/* <IconButton SunIcon> */}
           </Box>


          <Box maxW={{
            lg:"60%",
            md:"80%",
            sm:"100%"
          }}
          padding={{
            sm:"2rem",
            md:"0"
          }}
          marginX="auto" display="flex"  h="100%">
            <Route path="/posts"><PostList isDrawerOpen={isOpen} closeDrawer={onClose} /></Route>
            <Route path="/posts/:postId" ><PostDetail /></Route>
          </Box>

        </Box>



      </Switch>
    </Box>
  );
}

export default App;
