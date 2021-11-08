import { useState } from 'react';
import { Tag, List, Loader, InputGroup, Input } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import TextImageIcon from '@rsuite/icons/TextImage';
import Search from '@rsuite/icons/Search';
import { useRouter } from 'next/router';
import { directoryTree } from '../helpers/directoryTree';

const RightSection = ({
  enteries,
  UpdatinHandler,
  searchQueryhandller,
  searchResult,
}: any) => {
  const router = useRouter();
  // console.log(directoryTree());

  return (
    <section className="rightSection">
      <InputGroup>
        <Input placeholder="جستجو" onChange={searchQueryhandller} />
        <InputGroup.Button>
          <Search />
        </InputGroup.Button>
      </InputGroup>
      <List className="folderStructureTree">
        {enteries ? (
          enteries.length > 0 ? (
            enteries.map((entry: any) =>
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
                      UpdatinHandler({
                        rev: entry.rev,
                        name: entry.name,
                      });
                    }}
                    className="updateBadge"
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
    </section>
  );
};

export default RightSection;
