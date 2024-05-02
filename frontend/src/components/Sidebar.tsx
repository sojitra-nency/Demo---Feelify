"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Box,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemIcon,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const sidebarItemsAuth = [
    { name: "Home", href: "/", icon: HomeOutlinedIcon },
    { name: "About", href: "/about", icon: PeopleOutlineOutlinedIcon },
    { name: "Contact", href: "/contact", icon: PhoneAndroidOutlinedIcon },
    { name: "Emotions", href: "/emotion", icon: VideoCameraFrontOutlinedIcon },
    { name: "Videos", href: "/videos", icon: OndemandVideoOutlinedIcon },
    { name: "Books", href: "/books", icon: AutoStoriesOutlinedIcon },
    { name: "Password Reset", href: "/reset", icon: LockResetOutlinedIcon },
    { name: "Logout", href: "/logout", icon: ExitToAppOutlinedIcon },
];

const sidebarItemsNonAuth = [
    { name: "Register", href: "/", icon: HowToRegOutlinedIcon },
    { name: "Login", href: "/", icon: LockOpenOutlinedIcon },
    { name: "Home", href: "/", icon: HomeOutlinedIcon },
    { name: "Videos", href: "/videos", icon: OndemandVideoOutlinedIcon },
    { name: "Books", href: "/books", icon: AutoStoriesOutlinedIcon },
];

export default function Sidebar() {
    const [toggleCollapse, setToggleCollapse] = useState<Boolean>(false);
    const setToggleCollapseHandler = () => {
        setToggleCollapse((prev) => !prev);
    };
    
    return (
        <div className="sidebar_wrapper">
            <IconButton
                className="btn"
                onClick={setToggleCollapseHandler}
                sx={{ position: "absolute", right: 0, top: "4.5rem" }}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>
            <aside className="sidebar" data-collapse={toggleCollapse}>
                <Box
                    className="sidebar_top"
                    sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1, mb: 1 }}
                >
                    <Box
                        component="img"
                        className="sidebar_logo"
                        src="/logo.png"
                        alt="logo"
                        sx={{
                            width: "3.4rem",
                            height: "3.5rem",
                            objectFit: "cover",
                            borderRadius: "1rem",
                        }}
                    />
                    <Typography
                        className="sidebar_logo-name"
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "1.4rem" }}
                    >
                        {" "}
                        FEELIFY{" "}
                    </Typography>
                </Box>
                <List className="sidebar_list">
                    {sidebarItemsAuth.map(({ name, href, icon: Icon }) => (
                        <ListItem className="sidebar_item" key={name}>
                            <Link href={href} className="sidebar_link">
                                <Box
                                    sx={{ display: "flex", alignItems: "center", width: "100%" }}
                                >
                                    <ListItemIcon className="sidebar_icon">
                                        <Icon />
                                    </ListItemIcon>
                                    <Typography className="sidebar_name" variant="subtitle2">
                                        {name}
                                    </Typography>
                                </Box>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </aside>
        </div>
    );
}
