import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { Dropbox } from 'dropbox';
import Longin from '../../src/components/login';
import axios from 'axios';
import FolderList from '../../src/components/FolderList';
import { Button, ButtonToolbar, Input, InputGroup, Modal } from 'rsuite';
import { useRouter } from 'next/router';
import FolderModal from '../../src/components/FolderModal';
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
    <div className={styles.container}>
      <FolderModal
        open={open}
        title={title}
        model={model}
        name={name}
        setClose={() => setOpen(!open)}
      />
      <main className={styles.main}>
        <FolderList token={token} handleOpen={handleOpen} />
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
