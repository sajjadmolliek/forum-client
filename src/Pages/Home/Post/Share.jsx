/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FaShare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const Share = ({ id }) => {


  const [state, setState] = React.useState({ bottom: false });
  const toggleDrawer = (anchor, open) => () => {setState({ state, [anchor]: open });};

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <FaShare className="text-2xl text-white" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box className="mx-5" role="presentation">
              <div className="flex justify-center items-center ">
                <List className="flex ">
                  <ListItem className="space-x-4 md:space-x-14 flex-wrap items-center justify-center" disablePadding>
                    <div>
                      <FacebookShareButton
                        url={`http://localcxzhost:5007/post/${id}`}
                        className="Demo__some-network__share-button justify-center flex flex-col items-center"
                      >
                        <FacebookIcon size={32} round />
                        <ListItemText primary={"Facebook"} />
                      </FacebookShareButton>
                    </div>
                    <div>
                      <FacebookMessengerShareButton
                        url={`http://localhczxczxost:5007/post/${id}`}
                        className="Demo__some-network__share-button justify-center flex flex-col items-center"
                      >
                        <FacebookMessengerIcon size={32} round />
                        <ListItemText primary={"Messenger"} />
                      </FacebookMessengerShareButton>
                    </div>
                    <div>
                      <WhatsappShareButton
                        url={`http://localhost:5007/post/${id}`}
                        className="Demo__some-network__share-button justify-center flex flex-col items-center"
                      >
                        <WhatsappIcon size={32} round />
                        <ListItemText primary={"WhatsApp"} />
                      </WhatsappShareButton>
                    </div>
                    <div>
                      <LinkedinShareButton
                        url={`http://localhost:5007/post/${id}`}
                        className="Demo__some-network__share-button justify-center flex flex-col items-center"
                      >
                        <LinkedinIcon size={32} round />
                        <ListItemText primary={"Linkedin"} />
                      </LinkedinShareButton>
                    </div>
                    <div className="Demo__some-network justify-center flex flex-col items-center">
                      <TelegramShareButton
                        url={`http://localhost:5007/post/${id}`}
                        title={"title"}
                        className="Demo__some-network__share-button"
                      >
                        <TelegramIcon size={32} round />
                        <ListItemText primary={"Telegram"} />
                      </TelegramShareButton>
                    </div>
                  </ListItem>
                </List>
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Share;