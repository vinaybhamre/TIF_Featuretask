import HomeLayout from "@containers/home/HomeLayout";
import DataProvider from "@src/containers/home/DataProvider";
// import StoreProvider from "@src/redux/StoreProvider";
import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Settings">
      <DataProvider>
        <HomeLayout />
      </DataProvider>
    </Layout>
  );
};

export default Home;
