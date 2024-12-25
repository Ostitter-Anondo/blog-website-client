import { DataType, SortingMode } from "ka-table/enums";
import { Table } from "ka-table";
import "./Featured/CustomTheme.scss";
import Navbar from "./components/Navbar";
import { useLoaderData } from "react-router";
import Footer from "./components/Footer";

const Featured = () => {
  const someBlogs = useLoaderData().data;
  console.log(someBlogs);
  const dataArray = someBlogs.map((data) => ({
    column1: `${data.title}`,
    column2: `${data.email}`,
    column3: `${data.category}`,
    column4: `${data.size}`,
    id: data._id,
  }));
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12 min-h-screen">
        <div className="w-11/12 mx-auto text-center my-12">
          <h1 className="font-extrabold text-primary text-3xl">Check out our top picks on what to read</h1>
        </div>
        <div className="custom-theme w-11/12 mx-auto overflow-scroll">
          <Table
            columns={[
              { key: "column1", title: "Title", dataType: DataType.String, style: {width: 500} },
              { key: "column2", title: "Author", dataType: DataType.String, style: {width: 200} },
              { key: "column3", title: "Category", dataType: DataType.String, style: {width: 100} },
              { key: "column4", title: "Word Count", dataType: DataType.String, style: {width: 100} },
            ]}
            data={dataArray}
            rowKeyField={"id"}
            sortingMode={SortingMode.Single}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Featured;
