export async function fetchProduct(page) {
  const response = await fetch(
    ` http://localhost:3000/products?_page=${page}&_limit=20`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("all data");
  console.log(data);
  return data;
}
var querystring = "";
export async function fetchProductByFilter(query, page) {
  console.log(query);
  for (let k in query) {
    querystring += `${k}=${query[k]}&`;
  }
  console.log(querystring);
  console.log(
    ` http://localhost:3000/products?${querystring}_page=${page}&_limit=20`
  );
  const response = await fetch(
    ` http://localhost:3000/products?${querystring}_page=${page}&_limit=20`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("filter");
  console.log(data);
  return data;
}

export async function fetchProductBySort(query, page) {
  for (let k in query) {
    querystring += `_${k}=${query[k]}&`;
  }
  console.log("sort");
  console.log(querystring);
  console.log(page);
  console.log(
    ` http://localhost:3000/products?${querystring}_page=${page}&_limit=10`
  );
  const response = await fetch(
    ` http://localhost:3000/products?${querystring}_page=${page}&_limit=20`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("filter");
  console.log(data);
  return data;
}
export async function fetchProductid(id) {
  const response = await fetch(` http://localhost:3000/products/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("all data");
  console.log(data);
  return data;
}
