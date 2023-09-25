import { memo } from "react";
import "./Header.scss";

const Header = (props) => {
  const {
    headerBackgroundClass = "white-bottom-shadow",
    headerTitle = "React D3 Chart",
  } = props;
  //   const navigate = useNavigate();
  return (
    <div className={`header-container ${headerBackgroundClass}`}>
      <div className="home-company-logo-container">
        <div className="logo-container">
          <img src="/static/images/icons/Header/HomeIcon.svg" alt="Home Icon" />
        </div>
      </div>
      <div className="header-title">{headerTitle}</div>
      <div className="user-info-logout-container"></div>
    </div>
  );
};

export default memo(Header);
