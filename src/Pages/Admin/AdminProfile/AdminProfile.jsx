import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UserInfoForm from "../../UserInfo/UserInfoForm/UserInfoForm";
import UserProFIle from "../../../Components/Shared/UserProFIle/UserProFIle";
import AdminProInfo from "./AdminProInfo";


const AdminProfile = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
      <div>
        <UserProFIle />
        <div>
          <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Timeline</Tab>
              <Tab>About</Tab>
            </TabList>
            <TabPanel>
              <AdminProInfo/>
            </TabPanel>
            <TabPanel>
              <UserInfoForm></UserInfoForm>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
};

export default AdminProfile;