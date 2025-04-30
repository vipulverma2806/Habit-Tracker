import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [hname, setHname] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [all, setAll] = useState([]);
  const [filterCat, setFilterCat] = useState("");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4545/get")
      .then((response) => {
        setAll(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let filtered = all.filter((habit) => {
    if (filterCat) {
      if (filterCat && habit.category === filterCat) return true;
    } else return true;
  });

  const addORupdate = () => {
    console.log(hname, category, tags);

    axios
      .post("http://localhost:4545/add", {
        hname: hname,
        category: category,
        tags: tags,
      })
      .then((response) => {
        console.log(response);
        setAll([
          {
            hname: hname,
            category: category,
            tags: tags,
          },
          ...all,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-blue-400 to-red-400 flex ">
        <div className="w-1/3 flex flex-col p-5 gap-4">
          <h1 className="text-4xl font-bold text-center text-amber-100 ">
            HABIT TRACKER
          </h1>
          <input
            type="text"
            placeholder="Habit Name"
            className="bg-gray-500 rounded px-2 py-3 placeholder-white"
            onChange={(e) => setHname(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Category"
            className="bg-gray-500 rounded px-2 py-3 placeholder-white"
            onChange={(e) => setCategory(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="tags (comma-seperated)"
            className="bg-gray-500 rounded px-2 py-3 placeholder-white"
            onChange={(e) => setTags(e.target.value)}
          ></input>
          <button
            className="bg-gradient-to-br from-green-400 to-yellow-200 rounded-2xl p-2 active:bg-red-600"
            onClick={addORupdate}
          >
            Add
          </button>
          <div className="flex flex-row gap-4">
            <select
              name="category"
              id=""
              className="w-1/2 bg-gray-500 rounded px-2 py-3"
              onChange={(e) => setFilterCat(e.target.value)}
            >
              {console.log(filterCat)}
              <option>Filter by Category</option>
              {[...new Set(all.map((habit) => habit.category))].map(
                (category) => {
                  return (
                    <option value={category} className="">
                      {category}
                    </option>
                  );
                }
              )}
            </select>
            <select
              name="tags"
              id=""
              className="w-1/2 bg-gray-500 rounded px-2 py-3"
              onChange={(e) => setFilterTag(e.target.value)}
            >
              {console.log(filterTag)}
              <option>Filter by Tags</option>
              {[...new Set(all.map((habit) => habit.category))].map(
                (category) => {
                  return (
                    <option value={category} className="">
                      {category}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-4 p-5">
          {filtered.map((habit) => {
            return (
              <div className="flex flex-col bg-gray-600 rounded-2xl p-4 text-center text-white">
                <div>{habit.hname}</div>
                <div className="flex flex-row justify-between">
                  <div>abc</div>
                  <div>
                    <button className="mx-2 text-yellow-400">Edit</button>
                    <button className="mx-2 text-red-500">Delete</button>
                  </div>
                </div>
                <div className="text-center">Category: {habit.category}</div>
                <div className="text-center">Tags: {habit.tags}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
