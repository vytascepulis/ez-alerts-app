import { Link } from "@remix-run/react";

interface Props {
  showFullNav: boolean;
}

const Navigation = ({ showFullNav }: Props) => {
  return (
    <ui-nav-menu>
      <Link to="/app" rel="home">
        Home
      </Link>
      {showFullNav && <Link to="/app/settings">Settings</Link>}
    </ui-nav-menu>
  );
};

export default Navigation;
