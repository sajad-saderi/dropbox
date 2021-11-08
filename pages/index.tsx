import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import FolderList from '../src/components/FolderList';
import { Button, Input, InputGroup, Modal } from 'rsuite';
import { useEffect, useState } from 'react';
import FolderModal from '../src/components/FolderModal';

const token =
  'PU3kh0_0Eh4AAAAAAAAAAcx-5U-vejMkiCwvn56MyCXAE4BWHn9EmFXJRm6VUQ-V';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | boolean>(false);
  const [model, setModel] = useState(false);
  const [name, setName] = useState(false);

  const handleOpen = ({ title, model, name }: ModalObject) => {
    setModel(false);
    setName(false);
    setTitle(title);
    if (model) setModel(true);
    else if (name) setName(true);
    setOpen(true);
  };

  return (
    <div className={styles.container} dir="ltr">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FolderModal
        open={open}
        title={title}
        model={model}
        name={model}
        setClose={() => setOpen(!open)}
      />
      <main className={styles.main}>
        <FolderList token={token} path={{ path: '' }} handleOpen={handleOpen} />
      </main>
    </div>
  );
};

interface ModalObject {
  title: string;
  model?: boolean;
  name?: boolean;
}

export default Home;
