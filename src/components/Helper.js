
const send = (data, method="POST", path, headerRequired=false) => {
  const url = "http://127.0.0.1:5000"
  var headers = {"Content-Type": "application/json"}
  const access_token = localStorage.getItem("auth_token")
  //const auth_token = localStorage.getItem("auth_token")
  if (!["undefined", null].includes(access_token) && headerRequired){
    const token = access_token
    headers = Object.assign({}, headers, { "access-token" : token })
    //headers = Object.assign({}, { access-token: token})
  }
  
  const no_data_methods = ["GET"];

  // const myRequest = methods.includes(method) ? new Request(url + path, { method, body, headers })
  //   : new Request(url + path, { method, headers });

  const myRequest = no_data_methods.includes(method) ? new Request(url + path, {
    method: method, 
    headers: headers
  })
    :
    new Request(url + path, {
      method: method, 
      body: JSON.stringify(data),
      headers: headers
    })

  return fetch(myRequest)
}



const hydrateStateWithLocalStorage = () => {
  // for all items in state
  for (let key in this.state) {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);

      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value });
      } catch (e) {
        // handle empty string
        this.setState({ [key]: value });
      }
    }
  }
}

const saveStateToLocalStorage = (state) => {
  // console.log("in state-----", state)
  // for every item in React state
  for (let key in state) {
    // save to localStorage
    localStorage.setItem(key, state[key]);
  }
}

export default send;
export {saveStateToLocalStorage, hydrateStateWithLocalStorage };