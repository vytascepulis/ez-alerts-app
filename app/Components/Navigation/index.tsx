import { Link } from "@remix-run/react";

interface Props {
  isRegistered: boolean;
}

const Navigation = ({ isRegistered }: Props) => {
  return (
    <ui-nav-menu>
      <Link to="/app" rel="home">
        Home
      </Link>
      {isRegistered && <Link to="/app/settings">Settings</Link>}
    </ui-nav-menu>
  );
};

export default Navigation;
