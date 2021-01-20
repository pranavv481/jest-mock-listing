import { List, ListItem, ListIcon, Link, Box,  Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton, Button,Input, useDisclosure } from "@chakra-ui/react"
import React,{useEffect, useState} from 'react'
import {Get} from "../Util/JsonUtil" 
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from "react-query";


const PostList = ({isDrawerOpen, closeDrawer}) => {
    const {isLoading, error, data} = useQuery("postList", ()=>{
        return Get("http://localhost:3002/posts");
    })

    console.log("Hello world")
    
    return (
        <Box w={{
            sm:"0",
            md:"20%",
            
        }} h="100%">
            {isLoading?(
              <div data-testid="loading-text">Loading...</div>
              )
            :
            (
                <List d={{
                    sm:"none",
                    md:"block",
                   
                }} borderRight="1px solid #ccc" h="100%">
                    {data.data.map(data=>(
                <ListItem  data-testid="list-item"  key={data.id}>
                    <Link padding=".8rem" display="flex" as={RouterLink} to={`/posts/${data.id}`}>{data.title}</Link>
                    </ListItem>
            ))}</List>
            )}
           <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={closeDrawer}
        
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Blog List</DrawerHeader>

            <DrawerBody>
              {data?data.data.map(data=>(
                <ListItem listStyleType="none" key={data.id}>
                    <Link padding=".8rem" display="flex" as={RouterLink} to={`/posts/${data.id}`}>{data.title}</Link>
                    </ListItem>
            )):null}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={closeDrawer}>
                Cancel
              </Button>
             
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
           
        </Box>
    )
}

export default PostList
