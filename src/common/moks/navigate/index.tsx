import {
  HomeOutlined,
  AutoGraphOutlined,
  MenuBookOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

export const navMenu = [
  {
    name: "Головна",
    icon: <HomeOutlined />,
    path: "/",
    id: 1,
  },
  {
    name: "Обране",
    icon: <AutoGraphOutlined />,
    path: "/watchlist",
    id: 2,
  },
  {
    name: "Новини",
    icon: <MenuBookOutlined />,
    path: "/news",
    id: 3,
  },
  {
    name: "Опції",
    icon: <SettingsOutlined />,
    path: "/settings",
    id: 4,
  },
];
