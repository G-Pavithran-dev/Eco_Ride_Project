import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div>
      <div className="bg-primary">
        <div className="max-w-screen-lg px-4 sm:px-6 text-secondary sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-xl text-secondary">Eco Ride</h3>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-secondary font-bold">
              Resources
            </div>
            <a className="my-3 block" href="/#">
              Documentation <span className="text-secondary text-xs p-1"></span>
            </a>
          
            <a className="my-3 block" href="/#">
              Tutorials <span className="text-secondary text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Support <span className="text-secondary text-xs p-1">New</span>
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-secondary font-bold">
              Support
            </div>
            <a className="my-3 block" href="/#">
              Help Center <span className="text-secondary text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Privacy Policy{" "}
              <span className="text-secondary text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              Conditions <span className="text-secondary text-xs p-1"></span>
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-secondary font-bold">
              Contact us
            </div>
            <a className="my-3 block" href="/#">
              Sri Krishna Institutions, Coimbatore, TN, India - 641008
              <span className="text-secondary text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              eco_ride@gmail.com
              <span className="text-secondary text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
       max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1">
              <div>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                  style={{ width: "100%", height: "100%" }}
                />{" "}
                {/* Replaced with FontAwesome Twitter Icon */}
              </div>
            </a>
            <a href="" className="w-6 mx-1">
              <FontAwesomeIcon
                icon={faFacebook}
                className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                style={{ width: "100%", height: "100%" }}
              />{" "}
              {/* Replaced with FontAwesome Facebook Icon */}
            </a>
            <a
              href="https://www.instagram.com/nithishperumal/"
              className="w-6 mx-1"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                style={{ width: "100%", height: "100%" }}
              />{" "}
              {/* Replaced with FontAwesome Instagram Icon */}
            </a>
            <a
              href="https://linkedin.com/in/nithish-perumal/"
              className="w-6 mx-1"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                style={{ width: "100%", height: "100%" }}
              />{" "}
              {/* Replaced with FontAwesome LinkedIn Icon */}
            </a>
            <a href="https://github.com/Nithishuchiha" className="w-6 mx-1">
              <FontAwesomeIcon
                icon={faGithub}
                className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                style={{ width: "100%", height: "100%" }}
              />{" "}
              {/* Replaced with FontAwesome GitHub Icon */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
