import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import UserInfoForm from "../UserInfoForm/UserInfoForm";
import UserProFIle from "../../../Components/Shared/UserProFIle/UserProFIle";
import TimeLine from "../UserInfoForm/TimeLine";


const UserProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);


  return (
    <div>
    {/* done */}
      <UserProFIle /> 
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Timeline</Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanel>
          {/* to ck */}
            <TimeLine/>
          </TabPanel>
          <TabPanel>
          {/* done */}
            <UserInfoForm ></UserInfoForm>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
