import React, {useEffect, useContext} from 'react';
import axios from "axios";
import { useLoading, LoadingScreen } from '../../contexts/Loading';
import { FilesContext } from '../../contexts/FilesContext';
import { FMContext } from '../../contexts/FMContext';
import FileManagerContainer from '../container/FileManagerContainer';

const TrashBin = () => {
    const {loading, setLoading} = useLoading();
    const {files, setFiles} = useContext(FilesContext);
    const {restore, remove} = useContext(FMContext);

    useEffect(() => {
        let id = new URLSearchParams(location.search).get("id");
        if (id == null) id = "";
        axios({
          method: "get",
          url: ,
          withCredentials: true,
        }).then((resp) => {
          if (resp) {
            setFiles(resp.data);
            setLoading(false);
          }
        });
      }, []);

      const contextMenuItems = [
        {
            text: "Restore",
            id: "c-m-restore",
            onClick: () => {
              setOptionClicked(true);
              restore();
            }
          },
          {
            text: "Delete permanently",
            id: "c-m-delete",
            onClick: () => {
              setOptionClicked(true);
              openPublicFile(viewedUser.username);
              remove();
            }
          }
      ];

      if (loading) return <LoadingScreen />;
    return (
        <div className="container">
      <Header />
      <AppOptions />
      <div className={loading ? "" : "content"}>
        <FileManagerContainer
          id="file-manager-operations"
          menuItems={contextMenuItems}
        >
          <ToolBar user={viewedUser} />
          <FileList
            files={files}
            pathWithKeyId={"/users/" + viewedUser.username + "?id="}
            queries={queries}
            setQueries={setQueries}
          />
        </FileManagerContainer>
      </div>
    </div>
    )
}

export default TrashBin
