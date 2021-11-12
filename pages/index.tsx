import type { NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import FolderList from '../src/components/FolderList';
import { Button, Input, InputGroup, Modal } from 'rsuite';
import { useContext, useEffect, useState } from 'react';
import FolderModal from '../src/components/FolderModal';
import { Dropbox } from 'dropbox';
import AppStore, { StoreProvider } from '../contexts/store';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | boolean>(false);
  const [model, setModel] = useState(false);
  const [name, setName] = useState(false);
  const router = useRouter()
  const store = useContext(AppStore)

  const handleOpen = ({ title, model, name }: ModalObject) => {
    setModel(false);
    setName(false);
    setTitle(title);
    if (model) setModel(true);
    else if (name) setName(true);
    setOpen(true);
  };

  useEffect(() => {
    if (!store.isAuth && !sessionStorage['isAuth']) {
      router.push('/signin')
    } else if (sessionStorage['isAuth'] === 'true') {
      store.setAuth(true)
    }
  }, [store, router])

  return (

    <div className={styles.container} dir="ltr">
      <Head>
        <title>دراپ باکس سپریس</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {store.isAuth && <main className={styles.main}>
        <FolderModal
          open={open}
          title={title}
          model={model}
          name={name}
          setClose={() => setOpen(!open)}
        />
        <FolderList path={{ path: '' }} handleOpen={handleOpen} />
      </main>}
    </div>
  );
};

interface ModalObject {
  title: string;
  model?: boolean;
  name?: boolean;
}

export default Home;
