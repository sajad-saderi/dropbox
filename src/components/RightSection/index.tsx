import { useState } from 'react';
import {
  Tag,
  List,
  Loader,
  InputGroup,
  Input,
  Button,
  IconButton,
} from 'rsuite';
import Link from 'next/link';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import TextImageIcon from '@rsuite/icons/TextImage';
import ChangeListIcon from '@rsuite/icons/ChangeList';
import Search from '@rsuite/icons/Search';
import { useRouter } from 'next/router';
import { directoryTree } from '../helpers/directoryTree';
import MoveUpIcon from '@rsuite/icons/MoveUp';

const RightSection = ({
  enteries,
  UpdatinHandler,
  searchQueryhandller,
  searchResult,
}: any) => {
  const router = useRouter();
  // console.log(directoryTree());
  console.log(router);

  return (
    <section className="rightSection">
      <InputGroup>
        <Input placeholder="جستجو" onChange={searchQueryhandller} />
        <InputGroup.Button>
          <Search />
        </InputGroup.Button>
      </InputGroup>
      <br />
      {router.asPath !== '/' && (
        <IconButton
          size="xs"
          onClick={() => router.back()}
          icon={<MoveUpIcon />}
        >
          بازگشت
        </IconButton>
      )}
      <List className="folderStructureTree">
        {enteries ? (
          enteries.length > 0 ? (
            enteries.map((item: any) => {
              let entry: any = item;
              if ('metadata' in item) {
                entry = item.metadata.metadata;
              }

              return entry['.tag'] === 'folder' ? (
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
                    {item.metadata && (
                      <p className="FolderPath">
                        مسیر:{' '}
                        <Link href={entry.path_lower}>{entry.path_lower}</Link>
                      </p>
                    )}
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
                    {item.metadata && (
                      <p className="FolderPath">
                        مسیر:{' '}
                        <Link href={entry.path_lower}>{entry.path_lower}</Link>
                      </p>
                    )}
                  </div>
                  <Tag
                    onClick={() => {
                      UpdatinHandler({
                        rev: entry.rev,
                        name: entry.name,
                      });
                    }}
                    className="updateBadge"
                    color="orange"
                  >
                    <ChangeListIcon
                      style={{
                        fontSize: '1.3em',
                      }}
                    />
                  </Tag>
                </List.Item>
              );
            })
          ) : (
            <p>پوشه خالی</p>
          )
        ) : (
          <Loader />
        )}
      </List>
    </section>
  );
};

export default RightSection;
