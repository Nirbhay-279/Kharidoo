// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) =>{
    const res=await fetch('')
    const data=await res.json()
    resolve(data)
  }

  );
}
