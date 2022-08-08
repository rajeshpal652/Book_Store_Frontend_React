import * as React from 'react';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import education from "../../logo/education.png";
import "./Header.scss";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';

const emails = [localStorage.getItem("email")];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Hi, {localStorage.getItem("name")}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <LogoutIcon />
            </Avatar>
          </ListItemAvatar>
          <Link to={"/"}>
          <ListItemText primary="Logout" />
          </Link>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


function Header(props) {
  const navigate = useNavigate();

  const homepage = () => {
    navigate("/");
  };
  const cart = () => {
    navigate("/cart");
  };
  const wish = () => {
    navigate("/wishlist");
  };

  const [search,setSearch] = React.useState({
    search:""
})
const searchInput =(e)=>{
    props.search(e.target.value)

}

const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <div className="homePage">
        <img
          className="image"
          src={education}
          alt="this is book logo"
          onClick={() => homepage()}
        />
        <p className="imagetitle" onClick={() => homepage()}>
          Bookstore
        </p>
        {
          (window.location.pathname === '/dashboard') ? 

          <div className="searchbar">
          <SearchOutlinedIcon htmlColor="grey" />
          <input
            type="search"
            className="search"
            placeholder="Search..." 
            onChange={(e)=>searchInput(e)}
          ></input>
        </div>
          :
          <div className="none-searchbar">
            <SearchOutlinedIcon htmlColor="grey" />
          <input
            type="search"
            className="search"
            placeholder="Search..." 
            onChange={(e)=>searchInput(e)}
          ></input>
          </div>
        }
        

        <div className="wishd" onClick={() => wish()}>
          <div className="wishdetails">
            {/* <div>
              <Badge
                badgeContent={props.wishquantity}
                color="primary"
                sx={({ color: "#ffffff" }, { background: "#A03037" })}
              >
                <FavoriteBorderOutlinedIcon htmlColor="white" />
              </Badge>
            </div> */}
          </div>
          {/* <div className="wish">Wishlist</div> */}
        </div>
        <div className="details-cart" onClick={() => cart()}>
          <div className="">
            <Badge badgeContent={props.quantity} color="primary">
              <ShoppingCartOutlinedIcon htmlColor="white" />
            </Badge>
          </div>
          {/* <div className="cart">Cart</div> */}
        </div>

        <div className="details">
          <div className="icon">
            <PermIdentityTwoToneIcon htmlColor="white" onClick={handleClickOpen} />
          </div>

          <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

          {/* <div className="person">
            {"Hello, " + localStorage.getItem("name")}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
