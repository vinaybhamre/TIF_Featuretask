import HomeLayout from "@containers/home/HomeLayout";
import StoreProvider from "@src/redux/StoreProvider";
import type { NextPage } from "next";
import Layout from "../components/Layout";
// import DataProvider from "../containers/home/DataProvider";

const Home: NextPage = () => {
  return (
    <Layout title="Settings">
      <StoreProvider>
        <HomeLayout />
      </StoreProvider>
    </Layout>
  );
};

export default Home;
