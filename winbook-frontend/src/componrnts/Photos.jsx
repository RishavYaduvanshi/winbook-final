import React from 'react'
import { ImageList, ImageListItem } from '@mui/material'

const Photos = () => {
  return (
    <ImageList cols={3} rowHeight={100}>
        <ImageListItem>
            <img src='https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format'
            alt=""
            />
        </ImageListItem>
        <ImageListItem>
            <img src='https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=164&h=164&fit=crop&auto=format'
            alt=''/>
        </ImageListItem>
        <ImageListItem>
            <img src='https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=164&h=164&fit=crop&auto=format'
            alt=''/>
        </ImageListItem>
    </ImageList>
  )
}

export default Photos