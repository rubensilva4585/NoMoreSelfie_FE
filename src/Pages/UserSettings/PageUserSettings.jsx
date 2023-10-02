import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import PageUserSettingsAdminSuppliers from "./Admin/PageUserSettingsAdminSuppliers";
import PageUserSettingsSideBar from "./PageUserSettingsSideBar";
import PageUserSettingsAccountSettings from './Account/PageUserSettingsAccountSettings';


export default function PageUserSettings() {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const page = queryParams.Page;

    let pageContent;
    
    if (!page) {
        pageContent = <div>Página não encontrada</div>;
    } else if (page === 'adminsuppliers') {
        pageContent = <PageUserSettingsAdminSuppliers />;
    }
    else if (page === 'ajustesconta') {
        pageContent = <PageUserSettingsAccountSettings />;
    } else {
        pageContent = <div>Página não encontrada</div>;
    }
  
    return (
      <>
        <div className="container mx-auto px-3 md:px-12 py-16">
            <div className="flex gap-4">

                <PageUserSettingsSideBar selected={page}/>

                <div className="flex-1 p-4">                   
                    {pageContent}
                </div>
            </div>
        </div>
      </>
    );
  }
  
  
  
  
  
  