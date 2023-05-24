import React from "react";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-10 years old",
    value: "6-10",
  },
  {
    name: "11-15 years old",
    value: "11-15",
  },
  {
    name: "16+ years old",
    value: "16-20",
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-124 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-orange-900 text-xl">Filters</h1>
        <i
          className="ri-close-line text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col mt-4 gap-2">
        <h1 className="text-gray-500">Categories</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters?.category.includes(category.value)}
                  onChange={(e) => {
                    // console.log(category.value);
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                      // console.log(category);
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h1 className="text-gray-500">Ages</h1>

        <div className="flex flex-col gap-2">
          {ages?.map((age) => {
            return (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="age"
                  className="max-width"
                  checked={filters?.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      {
                        console.log("nayan");
                      }
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
