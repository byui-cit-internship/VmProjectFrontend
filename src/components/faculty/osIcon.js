import React from "react";
import PropTypes from "prop-types";
import { BsQuestionLg } from "react-icons/bs";
import { getOSIcon } from "react-os-icons";
import osIcon from "./osIcon.module.css";
import vimaIcon from "../../VIMAICON.png";
import AddVm from "./addvm";

const WindowsIcon = getOSIcon({ os: "Windows", className: osIcon.windowsIcon });
const UbuntuIcon = getOSIcon({ os: "Ubuntu", className: osIcon.ubuntuIcon });
const DebianIcon = getOSIcon({ os: "Debian", className: osIcon.debianIcon });
const LinuxIcon = getOSIcon({ os: "Linux", className: osIcon.linuxIcon });
const MacIcon = getOSIcon({ os: "Mac OS", className: osIcon.macIcon });
const FedoraIcon = getOSIcon({ os: "Fedora", className: osIcon.fedoraIcon });
const LinuxMintIcon = getOSIcon({ os: "Linux Mint", className: osIcon.linuxIcon });

const OSIcon = (props) => {
  const osName = props.operatingSystem.toUpperCase();

  if (osName.includes("WINDOWS")) return WindowsIcon;
  if (osName.includes("MAC")) return MacIcon;
  if (osName.includes("UBUNTU")) return UbuntuIcon;
  if (osName.includes("DEBIAN")) return DebianIcon;
  if (osName.includes("FEDORA")) return FedoraIcon;
  if (osName.includes("MINT")) return LinuxMintIcon;
  if (osName.includes("LINUX")) return LinuxIcon;
  // return <BsQuestionLg className={osIcon.questionMark} />;
  return (
    <div className={osIcon.vimaIcon}>
      <img alt="vima logo" src={vimaIcon} />
    </div>
  );
};

OSIcon.propTypes = {
  operatingSystem: PropTypes.string.isRequired
};

export default OSIcon;
