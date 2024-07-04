export async function GetOrdersAPI(id) {
  const response = await fetch(` http://localhost:3000/orders/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("all data");
  console.log(data);
  return data;
}
export async function CreateOrdersAPI(orders) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orders),
  };
  const url = " http://localhost:3000/orders";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("all data");
  console.log(data);
  return data;
}
