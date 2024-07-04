export async function CreateUserAPI(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(user),
  };
  const url = " http://localhost:3000/user";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("User Data");
  console.log(data);
  return data;
}

export async function CheckUserAPI() {
  const url = " http://localhost:3000/user";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("User data");
  console.log(data);
  return data;
}
export function checkAuthAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:3000/auth/check", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Auth API====================================");
        console.log(data);
        console.log("====================================");
        resolve(data.id);
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function UpdateUserAPI(user) {
  try {
    console.log("====================================");
    console.log("Update");
    console.log("====================================");
    const url = `http://localhost:3000/user`;
    console.log(url);
    console.log(user);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ addresses: user.addresses }),
    };
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON

    console.log("PATCH request successful:", data);
    return data;
    // Handle the response data as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors here
  }
}
export async function SignoutUserAPI() {
  return { data: "success" };
}
