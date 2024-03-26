// const HOST = "http://localhost:3001" //Mock
const HOST = "http://localhost:3005" // nest 服务端

// get请求
export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`)
  const data = res.json()
  return data
}

// post请求
export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = res.json()
  return data
}
