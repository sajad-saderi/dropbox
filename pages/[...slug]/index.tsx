import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { Dropbox } from 'dropbox';
import Longin from '../../src/components/login';
import axios from 'axios';
import FolderList from '../../src/components/FolderList';
const token =
  'PU3kh0_0Eh4AAAAAAAAAAcx-5U-vejMkiCwvn56MyCXAE4BWHn9EmFXJRm6VUQ-V';

const Home: NextPage = () => {
  useEffect(() => {
    // dropBox.filesCreateFolderV2({ path: '/test folder', autorename: false });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FolderList token={token} />
      </main>
    </div>
  );
};

export default Home;
