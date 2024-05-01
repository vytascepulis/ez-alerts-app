import { Link } from "@remix-run/react";

const Navigation = () => {
  return (
    <ui-nav-menu>
      <Link to="/app" rel="home">
        Home
      </Link>
    </ui-nav-menu>
  );
};

export default Navigation;
