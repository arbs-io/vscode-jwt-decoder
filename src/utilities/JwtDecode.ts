export class JwtDecode {
  public joseHeader: object
  public claimset: object

  constructor(private token: string) {
    if (typeof token !== 'string') {
      throw new Error('Invalid token specified')
    }
    try {
      this.joseHeader = JSON.parse(this.base64_url_decode(token.split('.')[0])) // JoseHeader
      this.claimset = JSON.parse(this.base64_url_decode(token.split('.')[1])) // Claimset
    } catch (e) {
      throw new Error(`Invalid token specified: ${(e as Error).message}`)
    }
  }

  private b64DecodeUnicode(str: string) {
    return decodeURIComponent(
      atob(str).replace(/(.)/g, function (m, p) {
        let code = p.charCodeAt(0).toString(16).toUpperCase()
        if (code.length < 2) {
          code = '0' + code
        }
        return '%' + code
      })
    )
  }

  private base64_url_decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/')
    switch (output.length % 4) {
      case 0:
        break
      case 2:
        output += '=='
        break
      case 3:
        output += '='
        break
      default:
        throw 'Illegal base64url string!'
    }

    try {
      return this.b64DecodeUnicode(output)
    } catch (err) {
      return atob(output)
    }
  }
}
