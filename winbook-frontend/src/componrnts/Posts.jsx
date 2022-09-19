import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { alert } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { useNavigate } from 'react-router-dom';

const Posts = (props) => {
  const [profilephoto,setprofilephoto] = useState();
  const history = useNavigate();

  useEffect(() => {
    fetch('https://winbookbackend.d3m0n1k.engineer/user/f/'+props.ob.userName+'/',{
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) => {
      if(response.status >= 200 && response.status < 300){
        response.json().then((data) => {
          setprofilephoto(data.dp);
        })
      }
    })
  
}, [props.ob]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [like, setlike] = useState( props.ob.liked_cnt);
  const [status, setstatus] = useState(props.ob.likedStatus);


  const deletePost = () => {
    setAnchorEl(false);
    fetch('https://winbookbackend.d3m0n1k.engineer/post/'+props.ob.pk+'/', {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload(false);
        alert({message:'Post deleted',type:'warning'});
      }
    })
  }

  const likePost = () => {
    fetch('https://winbookbackend.d3m0n1k.engineer/post/' + props.ob.pk + '/like/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) => {
      //console.log(response);
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
         // console.log(data);
          setlike(data.likes_count);
          setstatus(data.hasOwnProperty('liked_status') ? data.liked_status : true);
        })
      }
    })
  }

  const viewprofile = () => {
    //console.log(props.ob.user);
    history('/'+props.ob.userName+'/');
  }

  

  

  return (
    <Card sx={{ margin: 0.5 }}>
      <CardHeader
      avatar={
        <img src={profilephoto} alt="profile pic" style={{ width: 40, height: 40, borderRadius: 20 }} onClick={viewprofile}/>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon onClick={handleClick} />
        </IconButton>
      }
      title={<Typography onClick={viewprofile}>{props.ob.userName}</Typography>
      }
      subheader={props.ob.updated_at.split("T")[0]}
    />
      <CardMedia
        component="img"
        height="20%"
        image={props.ob.url}
        alt={props.ob.userName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.ob.caption}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary" marginTop={1} marginBottom={0}>
          Liked By <strong>{like}</strong> People in total
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {status === true ? <><Favorite sx={{ color: "red" }} onClick={likePost} /></> : <><FavoriteBorder onClick={likePost} /></>}
          {/* <Checkbox icon={<FavoriteBorder />}  checkedIcon={<Favorite sx={{color:"red"}}/>} onClick={likePost}/> */}
          <h6>{like}</h6>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>




{/*Menu Item of post*/}
      <Menu
        id="-enu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'left',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {props.ob.userName === localStorage.getItem('user') ? <div>
          <MenuItem >Edit Post</MenuItem>
          <Divider />
          <MenuItem onClick={deletePost}>Delete Post</MenuItem>
          <Divider />
        </div> : <div></div>}
        <MenuItem >Quick Share</MenuItem>
        <Divider />
        <MenuItem >Send via chats</MenuItem>
        <Divider />
        <MenuItem >Copy Link</MenuItem>
      </Menu>
{/*Menu Item of post*/}


    </Card>
  );
}

export default Posts