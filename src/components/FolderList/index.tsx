import axios from 'axios';
import { useRouter } from 'next/router';
import { Dropbox } from 'dropbox';
import { useEffect, useState } from 'react';
import FolderTools from '../FolderTools';
import { Breadcrumb, Button } from 'rsuite';
import RightSection from '../RightSection';
import { directoryTree } from '../helpers/directoryTree';
import { BreadCrumb } from '../Breadcrumb';

type Path = { path: string; router?: string };

// const limit = 20;
// let activePage = 1;
const FolderList = ({ token, path, handleOpen }: IFolderList) => {
  const [searchResult, setSearchResult] = useState<any>(false);
  const [listOfEntries, setListOfEntries] = useState<any>([]);
  // const [listOfOriginalEntries, setListOfOriginalEntries] = useState<any>([]);
  // const [paginationLength, setPaginationLength] = useState<number>(0);
  const [breadcrumb, setBreadcrumb] = useState<string[] | null>(null);
  const [currentPath, setCurrentpath] = useState<any>(null);
  // const [isLoader, setIsLoader] = useState<any>(false);
  const [update, serUpate] = useState<any>({ rev: null, name: null });
  const router = useRouter();
  useEffect(() => {
    // getToken();
    let path = { path: router.asPath === '/' ? '' : decodeURI(router.asPath) };
    setBreadcrumb(router.asPath.split('/'));
    setCurrentpath(path);
    gettingDropboxInfo(path);
  }, [router]);

  const gettingDropboxInfo = async (data: Path) => {
    setSearchResult(false);

    // setPaginationLength(0);
    // setIsLoader(true);
    // activePage = 1;
    // setListOfOriginalEntries(null);
    setListOfEntries(null);
    const dropBox = new Dropbox({ accessToken: token });
    try {
      const res = await dropBox.filesListFolder(data);
      let entries: any = res.result.entries;
      // setListOfOriginalEntries(entries);
      setListOfEntries(entries);
      // directoryTree(entries, data.path)
      // setListOfEntries(entries.slice(0, limit - 1));
      // if (entries.length > 20) {
      //   setPaginationLength(entries.length);
      //   listDivider(1);
      // }
    } catch (error) {
    } finally {
      // setIsLoader(false);
    }
  };

  // const listDivider = (e: number) => {
  //   activePage = e;
  //   console.log(
  //     'activePage = ',
  //     activePage,
  //     activePage * limit - limit,
  //     activePage * limit - 1,
  //   );
  //   setListOfEntries(
  //     listOfOriginalEntries.slice(
  //       activePage * limit - limit,
  //       activePage * limit - 1,
  //     ),
  //   );
  // };

  const searchQueryhandller = async (e: any) => {
    setListOfEntries(null);
    if (!e) {
      setSearchResult(false);
      gettingDropboxInfo(currentPath);
    }
    setSearchResult(true);
    const dropBox = new Dropbox({ accessToken: token });
    try {
      const res = await dropBox.filesSearchV2({
        match_field_options: {
          include_highlights: false,
        },
        query: e,
        options: {
          filename_only: true,
          max_results:50,
          path: currentPath.path,
        },
      });
      console.log("dsf",res.result.matches);

      let entries: any = res.result.matches;
      setListOfEntries(entries);

      // directoryTree(entries, data.path)
      // setListOfOriginalEntries(entries);
      // setListOfEntries(entries.slice(0, limit - 1));
      // if (entries.length > 20) {
      //   setPaginationLength(entries.length);
      //   listDivider(1);
      // }
    } catch (error) {
    } finally {
      // setIsLoader(false);
    }
  };

  return (
    <article className="mainContainer">
      <section className="leftSection">
        <BreadCrumb breadcrumb={breadcrumb} />
        <FolderTools
          currentPath={currentPath}
          token={token}
          update={update}
          handleOpen={handleOpen}
        />
      </section>
      <RightSection
        enteries={listOfEntries}
        searchResult={searchResult}
        UpdatinHandler={serUpate}
        searchQueryhandller={searchQueryhandller}
      />
      {/* {paginationLength > 0 && (
        <Pagination
          total={paginationLength}
          limit={limit}
          activePage={activePage}
          onChangePage={listDivider}
        />
      )} */}
    </article>
  );
};

interface IFolderList {
  token: string;
  handleOpen: any;
  path?: { path: string };
}

export default FolderList;
