
export const navLinks = (username: string) => [
  {
    title: "Home",
    href: "/",
    // icon: <IconSmartHome size={23} />,
  },
  {
    title: "Explore Cars",
    href: "/fleet",
    // icon: <IconDoor size={23} />,
  },
  {
    title: "Insurances & Terms",
    href: "/insurance",
    // icon: <IconMessageCircle size={23} />,
  },
  {
    title: "About Us",
    href: "/about-us",
    // icon: <IconBell size={23} />,
  },
  {
    title: "Profile",
    href: `/${username}`,
    // icon: <IconUser size={23} />,
  },
  {
    title: "Settings",
    href: `/settings`,
    // icon: <IconMenu2 size={23} />,
  },
];