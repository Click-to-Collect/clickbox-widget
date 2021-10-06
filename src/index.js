class Clickbox {
  #__token = null
  // #__host = 'https://clickbox-locations.vercel.app/'
  #__host = 'http://localhost:8081/'

  constructor(token) {
    this.setToken(token)
  }

  setToken(token) {
    this.#__token = token

    return this
  }

  selectLocation(params,callback) {
    const el = this.#__createModal(params)
    const query = Object.entries({
      token: this.#__token,
      ...params
    }).reduce((c,[k,v]) => (c.push(k+'='+(typeof v == "boolean" ? (v ? 1 : 0) : v)),c),[])
      .join('&')

    el.src = `${this.#__host}?${query}`

    const listener = ({data: {action,data},origin,source}) => {
      if(source == el.contentWindow) {
        try {
          if(action == 'select' && !params.readonly) {
            callback(data)
          }
        } catch (error) {
          console.error(error)
        } finally {
          window.removeEventListener("message", listener);
          this.#__closeModal(el)
        }
      }
    }

    window.addEventListener("message", listener);

    document.body.appendChild(el)
  }

  #__createModal() {
    const el = document.createElement('iframe')
    el.style = `
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

  #__closeModal(el) {
    el.remove()
  }
}

if(window.clickboxAsyncCallback) {
  window.clickboxAsyncCallback(Clickbox)
}

export default Clickbox