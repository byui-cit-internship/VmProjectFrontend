import React from "react";
import PropTypes from "prop-types";
import { BsQuestionLg } from "react-icons/bs";
import { getOSIcon } from "react-os-icons";
import addvm from "./addvm.module.css";

const WindowsIcon = getOSIcon({ os: "Windows", className: addvm.icon });
const UbuntuIcon = getOSIcon({ os: "Ubuntu", className: addvm.icon });
const DebianIcon = getOSIcon({ os: "Debian", className: addvm.icon });
const LinuxIcon = getOSIcon({ os: "Linux", className: addvm.icon });
const MacIcon = getOSIcon({ os: "Mac OS", className: addvm.icon });
const FedoraIcon = getOSIcon({ os: "Fedora", className: addvm.icon });
const LinuxMintIcon = getOSIcon({ os: "Linux Mint", className: addvm.icon });

const OSIcon = (props) => {
  const osName = props.operatingSystem.toUpperCase();

  if (osName.includes("WINDOWS")) return WindowsIcon;
  if (osName.includes("MAC")) return MacIcon;
  if (osName.includes("UBUNTU")) return UbuntuIcon;
  if (osName.includes("DEBIAN")) return DebianIcon;
  if (osName.includes("FEDORA")) return FedoraIcon;
  if (osName.includes("MINT")) return LinuxMintIcon;
  if (osName.includes("LINUX")) return LinuxIcon;
  return <BsQuestionLg className={addvm.questionMark} />;
};

OSIcon.propTypes = {
  operatingSystem: PropTypes.string.isRequired
};

export default OSIcon;
