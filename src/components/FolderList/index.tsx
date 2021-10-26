import axios from 'axios';
import { useRouter } from 'next/router';
import { Dropbox } from 'dropbox';
import { useEffect, useState } from 'react';
import FolderTools from '../FolderTools';

type Path = { path: string; router?: string };

const FolderList = ({ token, path }: IFolderList) => {
  const [listOfEntries, setListOfEntries] = useState<any>([]);
  const [currentPath, setCurrentpath] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    // getToken();
    let path = { path: router.asPath === '/' ? '' : decodeURI(router.asPath) };
    setCurrentpath(path);
    console.log('asPath', path);
    gettingDropboxInfo(path);
  }, [router]);

  const gettingDropboxInfo = async (data: Path) => {
    setListOfEntries(null);
    const dropBox = new Dropbox({ accessToken: token });
    try {
      const res = await dropBox.filesListFolder(data);
      // console.log('dropBoxInfo', res.result.entries);
      setListOfEntries(res.result.entries);
    } catch (error) {}
  };
  return (
    <>
      <p onClick={() => router.back()}>بازگشت</p>
      <FolderTools currentPath={currentPath} token={token} />
      {/* {console.log(listOfEntries)} */}
      <ul>
        {listOfEntries ? (
          listOfEntries.map((entry: any) =>
            entry['.tag'] === 'folder' ? (
              <li
                key={entry.id}
                onClick={() => router.push(`${entry.path_lower}`)}
              >
                {entry.name}
              </li>
            ) : (
              <p>{entry.name}</p>
            ),
          )
        ) : (
          <li>فولدری وجود ندارد</li>
        )}
      </ul>
    </>
  );
};

interface IFolderList {
  token: string;
  path?: { path: string };
}

export default FolderList;
