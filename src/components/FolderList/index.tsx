import axios from 'axios';
import { useRouter } from 'next/router';
import { Dropbox } from 'dropbox';
import { useEffect, useState } from 'react';
import FolderTools from '../FolderTools';
import { Tag, List, Pagination, Loader, Breadcrumb, Button } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import TextImageIcon from '@rsuite/icons/TextImage';
type Path = { path: string; router?: string };

const limit = 20;
let activePage = 1;
const FolderList = ({ token, path }: IFolderList) => {
  const [addFolder, setAddFolder] = useState<any>(false);
  const [listOfEntries, setListOfEntries] = useState<any>([]);
  const [listOfOriginalEntries, setListOfOriginalEntries] = useState<any>([]);
  const [paginationLength, setPaginationLength] = useState<number>(0);
  const [breadcrumb, setBreadcrumb] = useState<any>(null);
  const [currentPath, setCurrentpath] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<any>(false);
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
    setPaginationLength(0);
    setIsLoader(true);
    activePage = 1;
    setListOfOriginalEntries(null);
    setListOfEntries(null);
    const dropBox = new Dropbox({ accessToken: token });
    try {
      const res = await dropBox.filesListFolder(data);
      let entries: any = res.result.entries;
      setListOfOriginalEntries(entries);
      setListOfEntries(entries.slice(0, limit - 1));
      if (entries.length > 20) {
        setPaginationLength(entries.length);
        listDivider(1);
      }
    } catch (error) {
    } finally {
      setIsLoader(false);
    }
  };

  const listDivider = (e: number) => {
    activePage = e;
    console.log(
      'activePage = ',
      activePage,
      activePage * limit - limit,
      activePage * limit - 1,
    );
    setListOfEntries(
      listOfOriginalEntries.slice(
        activePage * limit - limit,
        activePage * limit - 1,
      ),
    );
  };
  console.log(breadcrumb);

  return (
    <>
      {breadcrumb && (
        <Breadcrumb>
          {breadcrumb.length > 0 &&
            breadcrumb.map((item: string, index: number) => (
              <Breadcrumb.Item
                href={
                  index === 0
                    ? '/'
                    : `${breadcrumb.slice(0, index + 1).join('/')}`
                }
                key={item}
                active={index === breadcrumb.length - 1 ? true : false}
              >
                {index === 0 ? 'خانه' : `${item}`}
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
      )}
      {addFolder ? (
        <>
          <FolderTools
            currentPath={currentPath}
            token={token}
            update={update}
          />
          <Button size="xs" onClick={() => setAddFolder(!addFolder)}>
            پنهان کردن تنظیمات
          </Button>
        </>
      ) : (
        <Button size="xs" onClick={setAddFolder}>تنظیمات</Button>
      )}
      <br />
      <br />
      <br />
      <List>
        {listOfEntries ? (
          listOfEntries.length > 0 ? (
            listOfEntries.map((entry: any) =>
              entry['.tag'] === 'folder' ? (
                <List.Item
                  key={entry.id}
                  onClick={() => router.push(`${entry.path_lower}`)}
                >
                  <div>
                    <FolderFillIcon
                      style={{
                        color: '#f5a623',
                        marginRight: 10,
                        fontSize: '1em',
                      }}
                    />
                    {entry.name}
                  </div>
                </List.Item>
              ) : (
                <List.Item key={entry.rev}>
                  <div>
                    <TextImageIcon
                      style={{
                        color: '#f5a623',
                        marginRight: 10,
                        fontSize: '1em',
                      }}
                    />
                    {entry.name}
                  </div>
                  <Tag
                    onClick={() => {
                      serUpate({
                        rev: entry.rev,
                        name: entry.name,
                      });
                    }}
                    color="orange"
                  >
                    به روز رسانی
                  </Tag>
                </List.Item>
              ),
            )
          ) : (
            <p>پوشه خالی</p>
          )
        ) : (
          <Loader />
        )}
      </List>
      {paginationLength > 0 && (
        <Pagination
          total={paginationLength}
          limit={limit}
          activePage={activePage}
          onChangePage={listDivider}
        />
      )}
    </>
  );
};

interface IFolderList {
  token: string;
  path?: { path: string };
}

export default FolderList;
