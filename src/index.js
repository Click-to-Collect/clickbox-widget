let __token = null

const __host = 'https://location-selector.clickbox.com/' 

const __createModal = () => {
  const el = document.createElement('iframe')
  el.style = `
    background: rgba(27, 27, 27, 0.8);
    position: fixed; 
    display: block; 
    width: 100%; 
    height: 100%; 
    top: 0px; 
    left: 0px; 
    box-sizing: content-box; 
    z-index: 2147483647; 
    opacity: 1;'
  `
  el.setAttribute('frameborder',0)
  el.setAttribute('allowtransparency',true)
  el.title = 'Clickbox Locations'

  return el
}

const __closeModal = (el) => {
  el.remove()
}

class Clickbox {
  constructor(token) {
    this.setToken(token)
  }

  setToken(token) {
    __token = token

    return this
  }

  selectLocation(params = {}) {
    const el = __createModal()
    const query = Object.entries({
      ...params,
      token: __token,
    }).reduce((c,[k,v]) => (c.push(k+'='+(typeof v == "boolean" ? (v ? 1 : 0) : v)),c),[])
      .join('&')

    el.src = `${__host}?${query}`

    return new Promise((resolve,reject) => {
      const listener = ({data: {action,data},source}) => {
        if(source == el.contentWindow) {
          try {
            if(action == 'select' && !params.readonly) {
              resolve(data)
            } else {
              resolve()
            }
          } catch (error) {
            console.error(error)
            reject(error)
          } finally {
            window.removeEventListener("message", listener);
            __closeModal(el)
          }
        }
      }
  
      window.addEventListener("message", listener);

      document.body.appendChild(el)
    })
  }
}

if(window.clickboxAsyncCallback) {
  window.clickboxAsyncCallback(Clickbox)
}

export default Clickbox