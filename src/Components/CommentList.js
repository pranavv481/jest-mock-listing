import React,{useEffect} from 'react'
import { useQuery } from 'react-query'
import { Get } from '../Util/JsonUtil'
import { List, ListItem, useTheme, useColorMode} from "@chakra-ui/react"
import {queryClient} from "../reactQuery"
const CommentList = ({postId}) => {
    console.log(postId)
  const {isLoading,error,data, refetch} =  useQuery("commentList", ()=>{
        return Get(`http://localhost:3002/comments?postId=${postId}`);
    })

    
    useEffect(()=>{
       refetch()
    },[postId])
    console.log(data)
    if(isLoading){
        return "Loading...."
    }
    if(error){
        return "Something Went Wrong"
    }
    return <List marginBottom=".4rem">{data.data.map(data=>(
        <ListItem border="1px solid #ccc"  padding=".9rem" key={data.id}>
          {data.comment}
            </ListItem>
    ))}</List>
}

export default CommentList
